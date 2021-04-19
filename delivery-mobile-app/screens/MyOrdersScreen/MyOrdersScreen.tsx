import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';
import { OrderPublicFields } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import OrderDetail from './components/OrderDetail';

type Props = {
  orders: OrderPublicFields[];
};

const MyOrdersScreen: FC<Props> = ({ orders }) => {
  return (
    <ScrollView style={style.principalView}>
      <GoBackButton title="MIS ORDENES" />
      {orders.map((order) => (
        <OrderDetail key={order._id} order={order} />
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  principalView: {
    backgroundColor: Colors.whiteGrey,
    flex: 1,
  },
});

export default MyOrdersScreen;
