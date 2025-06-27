import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entity/book.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    AuthModule,
    AuthorModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
