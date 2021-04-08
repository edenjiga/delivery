import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import SearchProductByCategoryScreen from './SearchProductByCategoryScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.SEARCH_PRODUCT_BY_CATEGORY>;
};

const SearchProductByCategoryScreenContainer: FC<Props> = ({ route }) => {
  return <SearchProductByCategoryScreen />;
};

export default SearchProductByCategoryScreenContainer;
