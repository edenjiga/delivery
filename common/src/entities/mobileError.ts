import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class MobileErrorDto {
  @IsString()
  @IsOptional()
  public message: string;

  @IsObject()
  @IsNotEmptyObject()
  @IsOptional()
  public data: object;

  @IsString()
  public platform: string;

  @IsString()
  public stackTrace: string;

  @IsString()
  @IsOptional()
  public userId?: string;
}
