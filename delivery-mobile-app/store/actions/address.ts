import { Address } from '@edenjiga/delivery-common';
import { createAction } from 'typesafe-actions';

export enum types {
  SET_ADDRESS = 'SET_ADDRESS',
}

export const setAddress = createAction(types.SET_ADDRESS)<Address>();
