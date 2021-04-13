import SCREEN_NAMES from '@/constants/screenNames';
import useCartOperationForProduct from '@/hooks/useCartOperationForProduct';
import useFetchProducts from '@/hooks/useFetchProducts';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import ProductDetailScreen from './ProductDetailScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.PRODUCT_DETAIL>;
}

const ProductDetailScreenContainer: FC<Props> = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1);
  const product = useMemo(() => route.params.product, [route.params.product]);
  const { products, getProductsByQuery } = useFetchProducts();

  const productsWithOutMainProduct = useMemo(
    () => products.filter((p) => p._id !== product._id),
    [product._id, products],
  );

  const { addProduct } = useCartOperationForProduct(product);

  useEffect(() => {
    getProductsByQuery({
      category: product.category,
    });
  }, [getProductsByQuery, product.category]);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const addOneToQuantity = useCallback(() => setQuantity(quantity + 1), [
    quantity,
  ]);

  const substractOneToQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const onPressAgregar = useCallback(() => {
    addProduct(quantity);
    return goBack();
  }, [addProduct, quantity, goBack]);

  return (
    <ProductDetailScreen
      addOneToQuantity={addOneToQuantity}
      goBack={goBack}
      onPressAgregar={onPressAgregar}
      product={product}
      quantity={quantity}
      substractOneToQuantity={substractOneToQuantity}
      products={productsWithOutMainProduct}
    />
  );
};

export default ProductDetailScreenContainer;
