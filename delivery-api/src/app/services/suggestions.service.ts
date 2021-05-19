import { SuggestionsRepository } from '@/data/repository/suggestions.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SuggestionsService {
  constructor(private suggestionDataSource: SuggestionsRepository) {}

  addSuggestion(data) {
    return this.suggestionDataSource.save(data);
  }
}
