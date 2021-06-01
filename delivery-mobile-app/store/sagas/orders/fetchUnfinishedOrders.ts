import { getOrders } from '@/api/orders';
import { fetchUnfinishedOrdersAsync } from '@/store/actions/orders';
import { OrderPublicFields } from '@edenjiga/delivery-common';
import { call, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';

const orderSchema = new schema.Entity<OrderPublicFields>(
  'orders',
  {},
  { idAttribute: '_id' },
);
const ordersListSchema = new schema.Array(orderSchema);

export default function* (): Generator {
  try {
    const { docs } = (yield call(getOrders, {
      unfinished: true,
    })) as { docs: OrderPublicFields[] };
    const { entities } = normalize<OrderPublicFields>(docs, ordersListSchema);

    const { orders } = entities;

    yield put(fetchUnfinishedOrdersAsync.success(orders));
  } catch (err) {
    yield put(fetchUnfinishedOrdersAsync.failure());
  }
}
