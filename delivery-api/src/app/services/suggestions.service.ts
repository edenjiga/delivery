import { SuggestionsRepository } from '@/data/repository/suggestions.repository';
import { UpdateSuggestionDto } from '@edenjiga/delivery-common';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SuggestionsService {
  constructor(private suggestionDataSource: SuggestionsRepository) {}

  addSuggestion(data) {
    return this.suggestionDataSource.save(data);
  }

  paginate(query: any, options: any) {
    const defaultOptions = { limit: 50 };

    return this.suggestionDataSource.paginate(query, {
      ...defaultOptions,
      ...options,
    });
  }

  findByIdAndUpdate(id: string, data: UpdateSuggestionDto) {
    return this.suggestionDataSource.findByIdAndUpdate(id, data);
  }
}
