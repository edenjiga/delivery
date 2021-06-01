import SCREEN_NAMES from '@/constants/screenNames';
import { RootState } from '@/store';
import { ICartState, RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TabCartScreen from './TabCartScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TabCartScreenContainer: FC<Props> = ({ navigation }) => {
  const cart = useSelector<RootState, ICartState>((state) => state.cart);

  const productsWithQuanty = useMemo(() => Object.values(cart), [cart]);

  const total = useMemo(() => {
    return productsWithQuanty.reduce(
      (prevValue, { quantity, product: { finalPrice } }) => {
        return prevValue + quantity * finalPrice;
      },
      0,
    );
  }, [productsWithQuanty]);

  const onGoToPay = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.ORDER);
  }, [navigation]);

  return (
    <TabCartScreen
      onGoToPay={onGoToPay}
      productWithQuantity={productsWithQuanty}
      total={total}
    />
  );
};

export default TabCartScreenContainer;
