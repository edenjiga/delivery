import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import dollarBill from '@/assets/images/dollar-bill-1.png';
import dataphone from '@/assets/images/dataphone-icon.png';

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
      <Text>{text}</Text>
      <Image source={image} />
    </Pressable>
  );
};
const style = StyleSheet.create({
  dot: {
    alignItems: 'center',
    backgroundColor: Colors.orangeDark,
    borderRadius: 50,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  dotView: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '20%' 
  },
  greenDot: {
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 50,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  whiteDot: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  pressable: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 6,
    borderColor: Colors.lineGrey,
    borderWidth: 1,
    width: 140,
  },
});

export default PaymentCard;
