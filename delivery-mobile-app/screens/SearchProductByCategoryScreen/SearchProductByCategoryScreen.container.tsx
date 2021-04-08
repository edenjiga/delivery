import SCREEN_NAMES from '@/constants/screenNames';
import useFetchProducts from '@/hooks/useFetchProducts';
import { RootStackParamList } from '@/types';
import { PRODUCT_CATEGORY } from '@edenjiga/delivery-common';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useMemo } from 'react';
import SearchProductByCategoryScreen from './SearchProductByCategoryScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.SEARCH_PRODUCT_BY_CATEGORY>;
};

const SearchProductByCategoryScreenContainer: FC<Props> = ({ route }) => {
  const category = useMemo(() => route.params.category, [
    route.params.category,
  ]);

  const { products, getProductsByQuery } = useFetchProducts();
  useEffect(() => {
    getProductsByQuery({
      category,
    });
  }, [category, getProductsByQuery]);

  const title = useMemo(() => {
    switch (category) {
      case PRODUCT_CATEGORY.ALCOHOL:
        return 'Licores';

      case PRODUCT_CATEGORY.CIGARETTES:
        return 'Cigarrillos';

      default:
        return 'Pasabocas';
    }
  }, [category]);

  return <SearchProductByCategoryScreen products={products} title={title} />;
};

export default SearchProductByCategoryScreenContainer;
