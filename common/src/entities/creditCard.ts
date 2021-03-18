import { CREDIT_CARD_STATUS } from "../constants/creditCardStatus";

export interface CreditCard {
  name: string;
  paymentSourceId: string;
  expiresAt: Date;
  status: CREDIT_CARD_STATUS;
}
