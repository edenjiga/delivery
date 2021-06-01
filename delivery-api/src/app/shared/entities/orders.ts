import { IOrder, ORDER_STATUS } from '@edenjiga/delivery-common';
import { IsEnum, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsEnum(ORDER_STATUS)
  status: IOrder['status'];
}
