import { IsInt, IsString, Min } from 'class-validator';

export class CreateOrderProductPurchasedDto {
  @IsString()
  id: string;

  @IsInt()
  @Min(1)
  unitsPurchased: number;
}

export interface IProduct {
  unitsInStock: number;
  _id: string;
  name: string;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  Imagen?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    url: string;
    provider: string;
    related: [string];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  price: number;
  discount?: number;
  id: string;
  finalPrice: number;
  discountValue: number;
}

export interface ProductToBeSoldBody {
  soldUnits: number;
  id: string;
}
