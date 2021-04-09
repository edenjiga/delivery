/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery } from 'redux-saga/effects';
import {
  fetchOrdersAsync,
  fetchUnfinishedOrdersAsync,
} from '@/store/actions/orders';
import fetchUnfinishedOrders from './fetchUnfinishedOrders';
import fetchOrders from './fetchOrders';

export default function* rootSaga() {
  yield takeEvery(fetchUnfinishedOrdersAsync.request, fetchUnfinishedOrders);
  yield takeEvery(fetchOrdersAsync.request, fetchOrders);
}
