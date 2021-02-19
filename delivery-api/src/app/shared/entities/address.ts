import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Coordinate {
  latitude: string;
  longitude: string;
}
export class Address {
  name: string;
  nomenclature: string;
  note?: string;
  coordinate: Coordinate;
}

export class CreateOrderAddressDto {
  @IsString()
  name: Address['name'];

  @IsString()
  nomenclature: Address['nomenclature'];

  @IsObject()
  @IsNotEmptyObject()
  coordinate: Coordinate;

  @IsString()
  @IsOptional()
  note: Address['note'];
}
