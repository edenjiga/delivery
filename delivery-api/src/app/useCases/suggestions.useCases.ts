import { SuggestionsService } from '@/services';
import {
  CreateSuggestionsDto,
  UserPublicFields,
} from '@edenjiga/delivery-common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuggestionsUseCases {
  constructor(private suggestionsService: SuggestionsService) {}
  addSuggestion(user: UserPublicFields, body: CreateSuggestionsDto) {
    const { text } = body;
    return this.suggestionsService.addSuggestion({ userId: user._id, text });
  }
}
