import {
  CreateSuggestionsDto,
  SuggestionsPublicFields,
} from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const addSuggestion = (
  body: CreateSuggestionsDto,
): Promise<SuggestionsPublicFields> =>
  mainApi.post<SuggestionsPublicFields>('/suggestions', {
    body,
  });

export { addSuggestion };
