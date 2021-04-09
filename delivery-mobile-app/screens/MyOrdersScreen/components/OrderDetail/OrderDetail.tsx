import { Text, View } from '@/components/Themed';
import { orderStatusText } from '@/constants';
import Colors from '@/constants/Colors';
import { parseTime } from '@/utils/date';
import { formatNumberToCop } from '@/utils/number';
import { OrderPublicFields, ORDER_STATUS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Button, StyleSheet } from 'react-native';

type Props = {
  order: OrderPublicFields;
  onPressCancel(): void;
};

const OrderDetail: FC<Props> = ({ order, onPressCancel }) => {
  let statusTextStyle;

  switch (order.status) {
    case ORDER_STATUS.COMPLETED:
      statusTextStyle = style.statusTextGreen;
      break;
    case ORDER_STATUS.CANCELED:
      statusTextStyle = style.statusTextRed;
      break;

    default:
      statusTextStyle = style.statusTextYellow;
      break;
  }

  return (
    <View style={style.container}>
      <Text>{parseTime(order.createdAt, '{y}-{m}-{d} {h}:{i}')}</Text>
      <Text>{order.address.nomenclature}</Text>
      {order.productsWithUnit.map(({ product, unitsPurchased }) => (
        <View key={product._id} style={style.productView}>
          <Text>
            {product.name} x{unitsPurchased}
          </Text>
          <Text>${formatNumberToCop(product.finalPrice * unitsPurchased)}</Text>
        </View>
      ))}

      <Text>Valor domicilio: ${formatNumberToCop(order.deliveryValue)}</Text>
      <Text>Total: ${formatNumberToCop(order.price)}</Text>
      <View>
        <Text>status</Text>
        <Text style={statusTextStyle}>{orderStatusText[order.status]}</Text>
      </View>
      {order.status === ORDER_STATUS.CREATED && (
        <Button title="Cancelar orden" onPress={onPressCancel}></Button>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  productView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusTextGreen: {
    color: Colors.green,
  },
  statusTextRed: {
    color: Colors.red,
  },

  statusTextYellow: {
    color: Colors.grey,
  },
});

export default OrderDetail;
