import { JwtAuthGuard } from '@/auth';
import { SuggestionsUseCases } from '@/useCases';
import { CreateSuggestionsDto } from '@edenjiga/delivery-common';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('suggestions')
export class SuggestionsController {
  constructor(private suggestionUsesCases: SuggestionsUseCases) {}
  @Post()
  addSuggestions(@Req() req, @Body() body: CreateSuggestionsDto) {
    const { user } = req;
    return this.suggestionUsesCases.addSuggestion(user, body);
  }
}
