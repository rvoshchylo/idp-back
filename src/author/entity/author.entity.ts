import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }], default: [] })
  booksIds!: Types.ObjectId[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
