import { getProducts } from '@/api/products';
import { Product } from '@edenjiga/delivery-common';
import { useCallback, useState } from 'react';

const useFetchProducts = () => {
  const [products, setProductState] = useState<Product[]>([]);

  const getProductsByQuery = useCallback(async (query = {}) => {
    try {
      const newProducts = await getProducts(query);
      setProductState(newProducts);
    } catch (e) {
      //TODO: handle error
      console.error(e);
    }
  }, []);

  return { products, getProductsByQuery };
};

export default useFetchProducts;
