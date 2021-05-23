import { SuggestionsService } from '@/services';
import {
  CreateSuggestionsDto,
  UpdateSuggestionDto,
  UserPublicFields,
} from '@edenjiga/delivery-common';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class SuggestionsUseCases {
  constructor(private suggestionsService: SuggestionsService) {}

  addSuggestion(user: UserPublicFields, body: CreateSuggestionsDto) {
    const { text } = body;
    return this.suggestionsService.addSuggestion({ userId: user._id, text });
  }

  getSuggestions(params: any) {
    const optionsFields = [
      'select',
      'collation',
      'populate',
      'sort',
      'offset',
      'page',
      'limit',
    ];

    const query = _.omit(params, optionsFields);
    const options = _.pick(params, optionsFields);

    return this.suggestionsService.paginate(query, options);
  }

  updateSuggestion(id: string, body: UpdateSuggestionDto) {
    return this.suggestionsService.findByIdAndUpdate(id, body);
  }
}
