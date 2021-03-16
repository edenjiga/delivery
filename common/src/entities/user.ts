import { USER_ROLES } from "../constants";

export interface UserPublicFields {
  code?: string;
  email?: string;
  identification?: string;
  name?: string;
  phone?: string;
  roles?: [USER_ROLES];
  // creditCards?: CreditCard[];
  password?: string;
}
