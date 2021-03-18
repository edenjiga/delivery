import { USER_ROLES } from "../constants";
import { Address } from "./address";
import { CreditCard } from "./creditCard";

export interface UserPublicFields {
  _id?: string;
  code?: string;
  email?: string;
  identification?: string;
  name?: string;
  phone?: string;
  roles?: [USER_ROLES];
  address?: Array<Address>;
  creditCards?: CreditCard[];
  password?: string;
}
