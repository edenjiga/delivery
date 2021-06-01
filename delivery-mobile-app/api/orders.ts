import { PaginationModel } from '@/types';
import {
  CreateOrderDto,
  OrderPublicFields,
  PartialOrderPublicFields,
} from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const createOrder = (body: CreateOrderDto) =>
  mainApi.post<OrderPublicFields>('/orders', {
    body,
  });

const getOrders = (params = {}) =>
  mainApi.get<PaginationModel<OrderPublicFields>>('/orders', {
    params: { ...params, sort: 'field -createdAt' },
  });

const updateOrder = (orderId: string, body: PartialOrderPublicFields) =>
  mainApi.patch<OrderPublicFields>(`/orders/${orderId}`, { body });

export { createOrder, getOrders, updateOrder };
