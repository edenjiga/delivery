import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsObject,
  IsString,
  IsNotEmptyObject,
  IsInt,
  Min,
  ValidateNested,
} from "class-validator";
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from "../constants";
import { Address, Coordinate } from "./address";
import { CreditCard } from "./creditCard";
import { Product } from "./products";

class CreateOrderProductPurchasedDto {
  @IsString()
  id: string;

  @IsInt()
  @Min(1)
  unitsPurchased: number;
}
export class IPayment {
  @IsEnum(PAYMENT_METHODS)
  readonly paymentMethod: PAYMENT_METHODS;
  @IsOptional()
  @IsObject()
  creditCard?: CreateOrderCreditCard;
}

export class CreateOrderAddressDto {
  @IsString()
  name: Address["name"];

  @IsString()
  nomenclature: Address["nomenclature"];

  @IsObject()
  @IsNotEmptyObject()
  coordinates: Coordinate;

  @IsString()
  @IsOptional()
  note: Address["note"];
}

export class CreateOrderCreditCard {
  name: CreditCard["name"];
  paymentSourceId?: CreditCard["paymentSourceId"];
  expiresAt?: CreditCard["expiresAt"];
  status?: CreditCard["status"];
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductPurchasedDto)
  readonly products: CreateOrderProductPurchasedDto[];

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly deliveryValue: number;

  @IsObject()
  @ValidateNested()
  @Type(() => IPayment)
  readonly payment: IPayment;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateOrderAddressDto)
  readonly address: CreateOrderAddressDto;
}

export class IOrder {
  address: Address;
  deliveryDate?: Date;
  deliveryValue: number;
  discountValue: number;
  payment: {
    status: PAYMENT_STATUS;
    paymentMethod: PAYMENT_METHODS;
    creditCard?: {
      name: string;
      paymentSourceId: string;
    };
  };
  price: number;
  status: ORDER_STATUS;
  userId: string;
  productsWithUnit: Array<{
    unitsPurchased: number;
    product: Product;
  }>;
}
