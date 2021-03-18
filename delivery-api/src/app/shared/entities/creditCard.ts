import { CreditCard } from '@edenjiga/delivery-common';

export class CreateOrderCreditCard {
  name: CreditCard['name'];
  paymentSourceId?: CreditCard['paymentSourceId'];
  expiresAt?: CreditCard['expiresAt'];
  status?: CreditCard['status'];
}
