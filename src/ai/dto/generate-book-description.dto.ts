import { IsString } from 'class-validator';

export class GenerateBookDescriptionDto {
  @IsString()
  authorName!: string;

  @IsString()
  bookTitle!: string;
}
