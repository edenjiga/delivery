import React, { FC, useCallback, useMemo } from 'react';
import { View, Text } from '@/components/Themed';
import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';
import { ORDER_STATUS } from '@edenjiga/delivery-common';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import SCREEN_NAMES from '@/constants/screenNames';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
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
      <View style={style.content}>
        <View style={style.number}>
          <Text style={style.detailNumber}>{orderActives.length}</Text>
        </View>
        <Text style={style.detailText}>ORDEN EN PROCESO</Text>
      </View>
      <View style={style.content}>
        <Image
          style={style.arrow}
          resizeMode="contain"
          source={require('assets/images/backWhite.png')}
        />
      </View>
    </TouchableOpacity>
  ) : null;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 20,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    borderRadius: 30,
    backgroundColor: Colors.green,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailNumber: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  detailText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },
  arrow: {
    height: 18,
    width: 18,
    transform: [{ rotate: '180deg' }],
  },
});
export default OrderActives;
