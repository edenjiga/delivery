import React, { useCallback, useReducer } from "react";
import { getProducts } from "@/api/products";
import useReducerHelper from "@/utils/useReducerHelper";
import { Product } from "@edenjiga/delivery-common";

import TabSearchScreen from "./TabSearchScreen";

type State = {
  text: string;
  products: Array<Product>;
  isLoading: boolean;
  timer?: number;
};

const initialState: State = {
  text: "",
  products: [],
  isLoading: true,
};

const TabSearchScreenContainer = () => {
  const [state, setState] = useReducer(
    useReducerHelper.basicReducer,
    initialState
  );

  const { isLoading, products, text, timer }: State = state;

  const onChangeText = useCallback((value) => {
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      setState({ isLoading: true });

      if (value) {
        const products = await getProducts({
          name_contains: value,
        });

        return setState({
          isLoading: false,
          products,
          text: value,
        });
      }

      setState({
        isLoading: false,
        products: [],
        text: value,
      });
    }, 1000);

    setState({
      timer: newTimer,
    });
  }, []);

  return (
    <TabSearchScreen
      onChangeText={onChangeText}
      products={products}
      text={text}
      isLoading={isLoading}
    />
  );
};

export default TabSearchScreenContainer;
