import React, { FC, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';
import { ORDER_STATUS } from '@edenjiga/delivery-common';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import SCREEN_NAMES from '@/constants/screenNames';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

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
    <TouchableOpacity style={style.container} onPress={goToMyOrders}>
      <Text>
        {orderActives.length}
        <Text style={style.detailText}>ORDEN EN PROCESO</Text>
      </Text>
    </TouchableOpacity>
  ) : null;
};

const style = StyleSheet.create({
  container: {
    // alignContent: 'flex-start',
    backgroundColor: Colors.lightGreen,
    borderRadius: 8,
    // flexDirection: 'row',
    height: 31,
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  detailText: {
    color: Colors.white,
    fontWeight: 'bold',
    // fontSize: 13,
  },
});
export default OrderActives;
