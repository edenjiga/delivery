import { GoBackButton } from '@/components';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { IOrdersState } from '@/types';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  orders: IOrdersState['data'];
};

const MyOrdersScreen: FC<Props> = ({ orders }) => {
  return (
    <View style={style.principalView}>
      <GoBackButton title="MIS ORDENES" />
      {Object.values(orders).map((order) => (
        <View key={order._id}>
          <Text>
            {order._id} {order.status}
          </Text>
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  principalView: {
    backgroundColor: Colors.whiteGrey,
    flex: 1,
  },
});

export default MyOrdersScreen;
