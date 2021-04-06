import { PaginationModel } from '@/types';
import { CreateOrderDto, IOrder } from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const createOrder = (body: CreateOrderDto) =>
  mainApi.post<IOrder>('/orders', {
    body,
  });

const getOrders = (params = {}) =>
  mainApi.get<PaginationModel<IOrder>>('/orders', {
    params,
  });
export { createOrder, getOrders };
