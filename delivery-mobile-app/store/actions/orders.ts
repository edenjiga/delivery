import { OrdersState } from '@/types';
import { OrderPublicFields, SOCKET_EVENTS } from '@edenjiga/delivery-common';
import { createAction, createAsyncAction } from 'typesafe-actions';
export enum types {
  ADD_ORDER = 'ADD_ORDER',
  FETCH_UNFINISHED_ORDERS_REQUEST = 'FETCH_UNFINISHED_ORDERS_REQUEST',
  FETCH_UNFINISHED_ORDERS_SUCCESS = 'FETCH_UNFINISHED_ORDERS_SUCCESS',
  FETCH_UNFINISHED_ORDERS_FAIL = 'FETCH_UNFINISHED_ORDERS_FAIL',
  FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL',
}
export const addOrder = createAction(types.ADD_ORDER)<OrderPublicFields>();
export const orderUpdatedAction = createAction(
  SOCKET_EVENTS.ORDER_UPDATED,
)<OrderPublicFields>();

export const fetchOrdersAsync = createAsyncAction(
  types.FETCH_ORDERS_REQUEST,
  types.FETCH_ORDERS_SUCCESS,
  types.FETCH_ORDERS_FAIL,
)<void, OrdersState['data'] | undefined, void>();

export const fetchUnfinishedOrdersAsync = createAsyncAction(
  types.FETCH_UNFINISHED_ORDERS_REQUEST,
  types.FETCH_UNFINISHED_ORDERS_SUCCESS,
  types.FETCH_UNFINISHED_ORDERS_FAIL,
)<void, OrdersState['data'] | undefined, void>();
