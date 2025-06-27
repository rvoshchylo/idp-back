import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateBookDescription(
    authorName: string,
    bookTitle: string,
  ): Promise<string> {
    const prompt = `Provide a short description (100 words) for a book titled "${bookTitle}" written by ${authorName}.`;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });
    const content = response.choices[0].message.content;

    console.log(
      `Generated description for "${bookTitle}" by ${authorName}:`,
      content,
    );

    return content ? content.trim() : '';
  }
}
