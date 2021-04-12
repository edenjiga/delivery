import React, { FC, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';
import { ORDER_STATUS } from '@edenjiga/delivery-common';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import SCREEN_NAMES from '@/constants/screenNames';

const OrderActives: FC = () => {
  const { data } = useOrdersFromRedux();
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, SCREEN_NAMES.ROOT>
  >();

  const orderActives = useMemo(
    () =>
      Object.values(data).filter(
        ({ status }) =>
          status === ORDER_STATUS.CREATED ||
          status === ORDER_STATUS.IN_PROGRESS,
      ),
    [data],
  );

  const goToMyOrders = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.MY_ORDERS);
  }, [navigation]);

  return orderActives.length ? (
    <TouchableOpacity onPress={goToMyOrders}>
      <Text>Ordenes activas {orderActives.length} </Text>
    </TouchableOpacity>
  ) : null;
};
export default OrderActives;
