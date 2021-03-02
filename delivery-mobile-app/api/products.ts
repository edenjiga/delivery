import { Product } from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const getProducts = () => mainApi.get<Product[]>('/products');

export { getProducts };
