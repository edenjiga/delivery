import { ORDER_STATUS, PAYMENT_STATUS } from '@/constants';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Address, CreateOrderAddressDto } from './address';
import { CreateOrderCreditCard } from './creditCard';
import { CreateOrderProductPurchasedDto, IProduct } from './products';

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
    product: IProduct;
  }>;
}

export class IPayment {
  @IsEnum(PAYMENT_METHODS)
  readonly paymentMethod: PAYMENT_METHODS;
  @IsOptional()
  @IsObject()
  creditCard?: CreateOrderCreditCard;
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

export class UpdateOrderDto {
  @IsString()
  @IsEnum(ORDER_STATUS)
  status: IOrder['status'];
}
