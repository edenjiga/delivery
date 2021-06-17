import {
  Address,
  OrderPublicFields,
  Product,
  PRODUCT_CATEGORY,
  UserPublicFields,
} from '@edenjiga/delivery-common';
import REQUEST_STATUS from '@/constants/RequestStatus';
import SCREEN_NAMES from '@/constants/screenNames';

const {
  ADD_ADDRESS,
  LOGIN,
  LOCATION,
  ROOT,
  ORDER,
  MY_ORDERS,
  PRODUCT_DETAIL,
  SELECT_ADDRESS,
  SEARCH_PRODUCT_BY_CATEGORY,
  USER_REQUIRED_FIELDS_FORM,
  USER_SUGGESTION,
  VERIFY_CODE,
} = SCREEN_NAMES;

export interface IModalState {
  isVisible: boolean;
  text: string;
  buttonText: string;
  icon: 'success' | 'info';
}
export interface ICartState {
  [key: string]: ProductWithQuantity;
}

export interface OrdersState {
  data: { [key: string]: OrderPublicFields };
  fetchOrderStatus: REQUEST_STATUS;
  fetchUnfinishOrderStatus: REQUEST_STATUS;
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
  [ADD_ADDRESS]: {
    goTo?: SCREEN_NAMES;
  };
  [ROOT]: undefined;
  [LOCATION]: undefined;
  [LOGIN]: { goTo?: SCREEN_NAMES };
  [ORDER]: undefined;
  [MY_ORDERS]: undefined;
  [PRODUCT_DETAIL]: { product: Product };
  [SELECT_ADDRESS]: {
    goTo?: SCREEN_NAMES;
  };
  [SEARCH_PRODUCT_BY_CATEGORY]: {
    category: PRODUCT_CATEGORY;
  };
  [USER_REQUIRED_FIELDS_FORM]: { goTo?: SCREEN_NAMES };
  [USER_SUGGESTION]: {};
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

export class PaginationModel<T> {
  totalDocs: number | undefined;
  limit: number | undefined = 0;
  totalPages: number | undefined;
  page: number | undefined;
  pagingCounter: number | undefined;
  hasPrevPage: boolean | undefined = false;
  hasNextPage: boolean | undefined = false;
  prevPage: number | undefined;
  nextPage: number | undefined;
  hasMore: boolean | undefined = false;
  docs: T[] = [];
}
