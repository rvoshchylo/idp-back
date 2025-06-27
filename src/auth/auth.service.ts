import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    console.log('AuthService initialized with UserModel:', !!this.userModel);
  }

  async register(createAuthDto: CreateAuthDto, res: Response) {
    console.log('Register attempt - Received data:', createAuthDto);

    if (!createAuthDto.email || !createAuthDto.password) {
      console.log('Registration failed - Invalid input:', createAuthDto);
      throw new UnauthorizedException('Invalid registration data');
    }

    const existingUser = await this.userModel
      .findOne({ email: createAuthDto.email })
      .exec();
    console.log('Existing user check result:', existingUser);
    if (existingUser) {
      console.log('Registration failed - Email already exists');
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await hash(createAuthDto.password, 10);
    const user = new this.userModel({
      email: createAuthDto.email,
      password: hashedPassword,
    });
    await user.save();
    console.log('User saved successfully with _id:', user._id);

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });
    console.log('Registration complete, token set:', token);
    return { token };
  }

  async login(loginAuthDto: LoginAuthDto, res: Response) {
    console.log('Login attempt:', loginAuthDto.email);
    const user = await this.userModel
      .findOne({ email: loginAuthDto.email })
      .exec();
    if (!user || !(await compare(loginAuthDto.password, user.password))) {
      console.log('Login failed - User not found or password mismatch');
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });
    console.log('Login successful, token set:', token);
    return { token };
  }
}
