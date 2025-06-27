import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author, AuthorDocument } from './entity/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async findOrCreateByName(name: string): Promise<AuthorDocument> {
    let author = await this.authorModel.findOne({ name });

    if (!author) {
      author = await this.authorModel.create({ name });
    }

    return author;
  }

  async addBookToAuthor(
    authorId: Types.ObjectId,
    bookId: Types.ObjectId,
  ): Promise<void> {
    await this.authorModel.findByIdAndUpdate(
      authorId,
      { $addToSet: { booksIds: bookId } },
      { new: true },
    );
  }

  async removeBookFromAuthor(
    authorId: Types.ObjectId,
    bookId: Types.ObjectId,
  ): Promise<void> {
    await this.authorModel.updateOne(
      { _id: authorId },
      { $pull: { booksIds: bookId } },
    );
  }
}
