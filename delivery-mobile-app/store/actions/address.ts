import { Address } from '@edenjiga/delivery-common';
import { createAction } from 'typesafe-actions';

export enum types {
  SET_ADDRESS = 'SET_ADDRESS',
  CLEAR_ADDRESS = 'CLEAR_ADDRESS',
}

export const setAddress = createAction(types.SET_ADDRESS)<Address>();
export const clearAddress = createAction(types.CLEAR_ADDRESS)();
