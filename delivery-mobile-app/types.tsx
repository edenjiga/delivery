import { Product, UserPublicFields } from "@edenjiga/delivery-common";
import screenNames from "@/constants/screenNames";
import REQUEST_STATUS from "@/constants/RequestStatus";

const { LOCATION, ROOT, LOGIN, VERIFY_CODE } = screenNames;

export interface ICartState {
  [key: string]: ProductWithQuantity;
}

export interface IuserState {
  loadingStatus: REQUEST_STATUS;
  error: {};
  data: {} | UserPublicFields;
}

export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};

export type RootStackParamList = {
  [ROOT]: undefined;
  [LOCATION]: undefined;
  [LOGIN]: undefined;
  [VERIFY_CODE]: {
    phone: string;
  };
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabCart: undefined;
  TabMain: undefined;
  TabThree: undefined;
  TabSearch: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
