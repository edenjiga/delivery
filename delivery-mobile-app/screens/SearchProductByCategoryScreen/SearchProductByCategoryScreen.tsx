import { GoBackButton, ProductCardHorizontal } from '@/components';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  products: Array<Product>;
  title: string;
};
const SearchProductByCategoryScreen: FC<Props> = ({ products, title }) => (
  <ScrollView>
    <GoBackButton title={title} />

    {products.map((product) => (
      <ProductCardHorizontal key={product._id} product={product} />
    ))}
  </ScrollView>
);

export default SearchProductByCategoryScreen;
