import { Product } from '@edenjiga/delivery-common';
import { createAction } from 'typesafe-actions';

export enum types {
  ADD_PRODUCT = 'ADD_PRODUCT',
  DECREASE_PRODUCT = 'DECREASE_PRODUCT',
  CLEAN_CART = 'CLEAN_CART',
}

export const addProductAction = createAction(types.ADD_PRODUCT)<Product>();
export const cleanCartAction = createAction(types.CLEAN_CART)();
export const decreaseProductAction = createAction(
  types.DECREASE_PRODUCT,
)<string>();
