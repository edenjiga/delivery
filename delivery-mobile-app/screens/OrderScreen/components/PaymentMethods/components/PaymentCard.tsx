import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import dollarBill from '@/assets/images/cash.png';
import dataphone from '@/assets/images/dataphone.png';

type Props = {
  method: PAYMENT_METHODS;
  selected?: boolean;
  onPress(): void;
};

const PaymentCard: FC<Props> = ({ method, onPress, selected }) => {
  let text;
  let image;

  if (method === PAYMENT_METHODS.CASH) {
    text = 'Efectivo';
    image = dollarBill;
  } else {
    text = 'Datáfono';
    image = dataphone;
  }

  return (
    <Pressable onPress={onPress} style={style.pressable}>
      <View style={style.dotView}>
        {selected ? (
          <View style={style.greenDot}></View>
        ) : (
          <View style={style.dot}>
            <View style={style.whiteDot}></View>
          </View>
        )}
      </View>
      <View style={style.box}>
        <Image source={image} />
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
};
const style = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: Colors.lineGrey,
    borderWidth: 1,
    width: 140,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.lightgrey,
    shadowOpacity: 0.6,
    elevation: 2,
  },
  dotView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 25,
    height: 25,
    width: 25,
  },
  greenDot: {
    backgroundColor: Colors.green,
    borderRadius: 25,
    height: 25,
    width: 25,
  },
  whiteDot: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 20,
    width: 20,
  },
  box: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentCard;
