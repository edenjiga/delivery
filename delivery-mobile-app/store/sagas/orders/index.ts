/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery } from 'redux-saga/effects';
import { fetchUnfinishedOrdersAsync } from '@/store/actions/orders';
import fetchUnfinishedOrders from './fetchUnfinishedOrders';

export default function* rootSaga() {
  yield takeEvery(fetchUnfinishedOrdersAsync.request, fetchUnfinishedOrders);
}
