import { getOrders } from '@/api/orders';
import { fetchUnfinishedOrdersAsync } from '@/store/actions/orders';
import { IOrder } from '@edenjiga/delivery-common';
import { call, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';

const orderSchema = new schema.Entity<IOrder>(
  'orders',
  {},
  { idAttribute: '_id' },
);
const ordersListSchema = new schema.Array(orderSchema);

export default function* (): Generator {
  try {
    const { docs } = (yield call(getOrders, {
      unfinished: true,
    })) as { docs: IOrder[] };
    const { entities } = normalize<IOrder>(docs, ordersListSchema);

    const { orders } = entities;

    yield put(fetchUnfinishedOrdersAsync.success(orders));
  } catch (err) {
    yield put(fetchUnfinishedOrdersAsync.failure());
  }
}
