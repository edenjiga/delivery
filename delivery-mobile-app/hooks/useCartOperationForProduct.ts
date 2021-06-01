import { RootState } from '@/store';
import { addProductAction, decreaseProductAction } from '@/store/actions/cart';
import { ProductWithQuantity } from '@/types';
import { Product } from '@edenjiga/delivery-common';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCartOperationForProduct = (product: Product) => {
  const dispatch = useDispatch();
  const productWithQuantity = useSelector<RootState, ProductWithQuantity>(
    (state) => state.cart[product._id],
  );

  const { quantity = 0 } = productWithQuantity || {};

  const addProduct = useCallback(
    (quantity?: number) => dispatch(addProductAction({ product, quantity })),
    [dispatch, product],
  );

  const decreaseProduct = useCallback(
    () => dispatch(decreaseProductAction(product._id)),
    [dispatch, product._id],
  );

  return { addProduct, quantity, decreaseProduct };
};

export default useCartOperationForProduct;
