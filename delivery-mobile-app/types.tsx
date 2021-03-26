import { Address, Product, UserPublicFields } from '@edenjiga/delivery-common';
import screenNames from '@/constants/screenNames';
import REQUEST_STATUS from '@/constants/RequestStatus';
import SCREEN_NAMES from '@/constants/screenNames';

const {
  ADD_ADDRESS,
  LOGIN,
  LOCATION,
  ROOT,
  ORDER,
  SELECT_ADDRESS,
  USER_REQUIRED_FIELDS_FORM,
  VERIFY_CODE,
} = screenNames;

export interface ICartState {
  [key: string]: ProductWithQuantity;
}

export interface IuserState {
  loadingStatus: REQUEST_STATUS;
  error: {};
  data: UserPublicFields;
}

export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};

export type RootStackParamList = {
  [ADD_ADDRESS]: undefined;
  [ROOT]: undefined;
  [LOCATION]: undefined;
  [LOGIN]: { goTo?: SCREEN_NAMES };
  [ORDER]: undefined;
  [SELECT_ADDRESS]: undefined;
  [USER_REQUIRED_FIELDS_FORM]: { goTo: SCREEN_NAMES };
  [VERIFY_CODE]: {
    phone: string;
    goTo?: SCREEN_NAMES;
  };
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabSetting: undefined;
  TabCart: undefined;
  TabMain: undefined;
  TabSearch: undefined;
};

export type LocationFormValues = {
  note: Address['note'];
  nomenclature: Address['nomenclature'];
  name: Address['name'];
};
