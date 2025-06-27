import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './entity/book.entity';
import { AuthorService } from '../author/author.service'; // 👈

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private authorService: AuthorService,
  ) {}

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).populate('authorId', 'name');
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().populate('authorId', 'name');
  }

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const author = await this.authorService.findOrCreateByName(
      createBookDto.authorName,
    );
    const authorId = author._id as Types.ObjectId;

    const book = new this.bookModel({
      title: createBookDto.title,
      authorId: authorId,
      description: createBookDto.description,
      imageUrl: createBookDto.imageUrl,
      authorName: author.name,
    });

    const savedBook = await book.save();

    await this.authorService.addBookToAuthor(
      authorId,
      savedBook._id as Types.ObjectId,
    );

    return savedBook;
  }

  async update(
    id: string,
    updateBookDto: CreateBookDto,
  ): Promise<BookDocument> {
    const author = await this.authorService.findOrCreateByName(
      updateBookDto.authorName,
    );
    const authorId = author._id as Types.ObjectId;

    const updatedBook = await this.bookModel
      .findByIdAndUpdate(
        id,
        {
          title: updateBookDto.title,
          authorId: authorId,
          description: updateBookDto.description,
          imageUrl: updateBookDto.imageUrl,
          authorName: author.name,
        },
        { new: true },
      )
      .populate('authorId', 'name');

    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return updatedBook;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.bookModel.findByIdAndDelete(id);

    await this.authorService.removeBookFromAuthor(
      book.authorId,
      book._id as Types.ObjectId,
    );

    return { deleted: true };
  }
}
