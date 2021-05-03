import { Text, View } from '@/components/Themed';
import { orderStatusText } from '@/constants';
import Colors from '@/constants/Colors';
import { parseTime } from '@/utils/date';
import { formatNumberToCop } from '@/utils/number';
import { OrderPublicFields, ORDER_STATUS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import wait from '@/assets/images/circle-wait.png';
import done from '@/assets/images/circle-done.png';
import cancel from '@/assets/images/circle-error.png';
import onGoing from '@/assets/images/circle-truck.png';

type Props = {
  order: OrderPublicFields;
  onPressCancel(): void;
};

const OrderDetail: FC<Props> = ({ order, onPressCancel }) => {
  let statusTextStyle;
  let imageStatus;
  switch (order.status) {
    case ORDER_STATUS.COMPLETED:
      statusTextStyle = style.statusTextGreen;
      imageStatus = done;
      break;
    case ORDER_STATUS.CANCELED:
      statusTextStyle = style.statusTextRed;
      imageStatus = cancel;
      break;
    case ORDER_STATUS.CREATED:
      statusTextStyle = style.statusTextBrown;
      imageStatus = wait;
      break;
    default:
      statusTextStyle = style.statusTextOrange;
      imageStatus = onGoing;
  }

  return (
    <View style={style.container}>
      <View style={style.box}>
        <View style={style.order}>
          <View style={style.orderInfo}>
            <Text style={style.number}>ORDEN #1:</Text>
            <Text style={style.units}>
              {order.productsWithUnit.length} unidades
            </Text>
          </View>
          <View style={style.orderAddress}>
            <Text style={style.nomenclature}>{order.address.nomenclature}</Text>
            <Text style={style.date}>
              {parseTime(order.createdAt, '{y}-{m}-{d} {h}:{i}')}
            </Text>
          </View>
        </View>
        {order.productsWithUnit.map(({ product, unitsPurchased }) => (
          <View key={product._id} style={style.productView}>
            <Text style={style.detail}>
              {product.name} x{unitsPurchased}
            </Text>
            <Text style={style.orderNumber}>
              ${formatNumberToCop(product.finalPrice * unitsPurchased)}
            </Text>
          </View>
        ))}
        <View style={style.totalContent}>
          <View>
            <Text>Valor domicilio:</Text>
            <Text style={style.totalPay}>Total pago:</Text>
          </View>
          <View style={style.orderAddress}>
            <Text>${formatNumberToCop(order.deliveryValue)}</Text>
            <Text style={style.totalPayNumber}>
              ${formatNumberToCop(order.price)}
            </Text>
          </View>
        </View>

        <View style={style.statusBox}>
          <View style={style.status}>
            <Image
              style={style.orderImage}
              resizeMode={'contain'}
              source={imageStatus}
            ></Image>
            <Text style={statusTextStyle}>{orderStatusText[order.status]}</Text>
          </View>
          {order.status === ORDER_STATUS.CREATED && (
            <View style={style.button}>
              <TouchableOpacity onPress={onPressCancel}>
                <Text style={style.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  box: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  order: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.lineGrey,
    marginBottom: 5,
    paddingBottom: 10,
  },
  orderInfo: {
    alignItems: 'flex-start',
  },
  orderAddress: {
    alignItems: 'flex-end',
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  units: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  nomenclature: {
    marginBottom: 7,
    color: Colors.darkGrey,
    fontSize: 13,
  },
  date: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
  detail: {
    width: '80%',
    color: Colors.darkGrey,
  },
  orderNumber: {
    color: Colors.darkGrey,
  },
  totalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.lineGrey,
    borderBottomWidth: 1,
    marginTop: 5,
    paddingVertical: 10,
  },
  totalPay: {
    fontWeight: 'bold',
    marginTop: 3,
  },
  totalPayNumber: {
    fontWeight: 'bold',
    color: Colors.green,
    marginTop: 3,
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderImage: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  statusIcon: {
    marginRight: 5,
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusTextGreen: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusTextRed: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusTextBrown: {
    color: Colors.orangeDark,
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusTextOrange: {
    color: Colors.orange,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default OrderDetail;
