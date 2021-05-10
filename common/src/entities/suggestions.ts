import { IsNotEmpty, IsString } from "class-validator";

export interface SuggestionsPublicFields {
  _id: string;
  userId: string;
  text: string;
}

export class CreateSuggestionsDto {
  @IsString()
  @IsNotEmpty()
  readonly text: SuggestionsPublicFields["text"];
}
