import { Product } from "@edenjiga/delivery-common";
import { createAction } from "typesafe-actions";

export enum types {
  ADD_PRODUCT = "ADD_PRODUCT",
  DECREASE_PRODUCT = "DECREASE_PRODUCT",
}

export const addProductAction = createAction(types.ADD_PRODUCT)<Product>();
export const decreaseProductAction = createAction(
  types.DECREASE_PRODUCT
)<string>();
