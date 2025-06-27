import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
