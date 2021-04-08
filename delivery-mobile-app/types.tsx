import {
  Address,
  IOrder,
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
  SELECT_ADDRESS,
  SEARCH_PRODUCT_BY_CATEGORY,
  USER_REQUIRED_FIELDS_FORM,
  VERIFY_CODE,
} = SCREEN_NAMES;

export interface ICartState {
  [key: string]: ProductWithQuantity;
}

export interface IOrdersState {
  loadingStatus: REQUEST_STATUS;
  data: { [key: string]: IOrder };
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
  [SEARCH_PRODUCT_BY_CATEGORY]: {
    category: PRODUCT_CATEGORY;
  };
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
