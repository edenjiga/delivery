import { Product } from "@edenjiga/delivery-common";

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
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabCart: undefined;
  TabMain: undefined;
  TabThree: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
