/* eslint-disable sonarjs/no-duplicate-string */
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
  onPressActionButton(): void;
};

const OrderDetail: FC<Props> = ({ order, onPressActionButton }) => {
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
              <TouchableOpacity onPress={onPressActionButton}>
                <Text style={style.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
          {order.status === ORDER_STATUS.IN_PROGRESS && (
            <View style={style.button}>
              <TouchableOpacity onPress={onPressActionButton}>
                <Text style={style.buttonText}>Contactar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  box: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    padding: 10,
  },
  button: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  date: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
  detail: {
    color: Colors.darkGrey,
    width: '80%',
  },
  nomenclature: {
    color: Colors.darkGrey,
    fontSize: 13,
    marginBottom: 7,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  order: {
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: Colors.lineGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 10,
  },
  orderAddress: {
    alignItems: 'flex-end',
  },
  orderImage: {
    height: 25,
    marginRight: 8,
    width: 25,
  },
  orderInfo: {
    alignItems: 'flex-start',
  },

  orderNumber: {
    color: Colors.darkGrey,
  },
  productView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statusTextBrown: {
    color: Colors.orangeDark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusTextGreen: {
    color: Colors.green,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusTextOrange: {
    color: Colors.orange,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusTextRed: {
    color: Colors.red,
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalContent: {
    borderBottomWidth: 1,
    borderColor: Colors.lineGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 10,
  },
  totalPay: {
    fontWeight: 'bold',
    marginTop: 3,
  },
  totalPayNumber: {
    color: Colors.green,
    fontWeight: 'bold',
    marginTop: 3,
  },
  units: {
    color: Colors.darkGrey,
    fontSize: 14,
  },
});

export default OrderDetail;
