import {CREDIT_CARD_STATUS} from '@edenjiga/delivery-common'

export class CreditCard {
  name: string;
  paymentSourceId: string;
  expiresAt: Date;
  status: CREDIT_CARD_STATUS;
}

export class CreateOrderCreditCard {
  name: CreditCard['name'];
  paymentSourceId?: CreditCard['paymentSourceId'];
  expiresAt?: CreditCard['expiresAt'];
  status?: CreditCard['status'];
}
