import { Product } from "@edenjiga/delivery-common";
import screenNames from "@/constants/screenNames";

const { LOCATION, ROOT } = screenNames;

export interface ICartState {
  [key: string]: {
    product: Product;
    quantity: number;
  };
}

export type ProductsWithQuantity = {
  [key: string]: {
    quantity: number;
    product: Product;
  };
};

export type RootStackParamList = {
  [ROOT]: undefined;
  [LOCATION]: undefined;
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
