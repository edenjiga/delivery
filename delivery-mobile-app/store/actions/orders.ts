import { IOrder } from '@edenjiga/delivery-common';
import { createAction } from 'typesafe-actions';

export enum types {
  ADD_ORDER = 'ADD_ORDER',
}
export const addOrder = createAction(types.ADD_ORDER)<IOrder>();
