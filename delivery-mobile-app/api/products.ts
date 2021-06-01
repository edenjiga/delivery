import { Product } from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const getProducts = (params = {}) =>
  mainApi.get<Product[]>('/products', {
    params: {
      ...params,
      unitsInStock_ne: 0,
    },
  });

export { getProducts };
