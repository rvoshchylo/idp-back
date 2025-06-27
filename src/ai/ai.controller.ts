import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateBookDescriptionDto } from './dto/generate-book-description.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-description')
  generateBookDescription(
    @Body() dto: GenerateBookDescriptionDto,
  ): Promise<string> {
    console.log('Generating book description for:', dto);

    return this.aiService.generateBookDescription(
      dto.authorName,
      dto.bookTitle,
    );
  }
}
