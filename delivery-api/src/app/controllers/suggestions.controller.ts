import { JwtAuthGuard } from '@/auth';
import { JwtAdminAuthGuard } from '@/auth/guards/jwt-admin-auth.guard';
import { SuggestionsUseCases } from '@/useCases';
import {
  CreateSuggestionsDto,
  UpdateSuggestionDto,
} from '@edenjiga/delivery-common';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('suggestions')
export class SuggestionsController {
  constructor(private suggestionUsesCases: SuggestionsUseCases) {}

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  getSuggestions(@Req() req) {
    const { query } = req;
    return this.suggestionUsesCases.getSuggestions(query);
  }

  @Post()
  addSuggestions(@Req() req, @Body() body: CreateSuggestionsDto) {
    const { user } = req;
    return this.suggestionUsesCases.addSuggestion(user, body);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch('/:id')
  updateSuggestion(@Param('id') id: string, @Body() body: UpdateSuggestionDto) {
    return this.suggestionUsesCases.updateSuggestion(id, body);
  }
}
