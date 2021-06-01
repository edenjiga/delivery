import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export interface SuggestionsPublicFields {
  _id: string;
  userId: string;
  text: string;
  read: boolean;
}

export class CreateSuggestionsDto {
  @IsString()
  @IsNotEmpty()
  readonly text: SuggestionsPublicFields["text"];
}

export class UpdateSuggestionDto {
  @IsBoolean()
  @IsOptional()
  read?: SuggestionsPublicFields["read"];

  @IsString()
  @IsOptional()
  readonly text: SuggestionsPublicFields["text"];
}
