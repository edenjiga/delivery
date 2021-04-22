import { View } from '@/components/Themed';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import PaymentCard from './components/PaymentCard';
import { StyleSheet } from 'react-native';

type Props = {
  selectedPaymentMethod: PAYMENT_METHODS;
  onPressPaymentMethod(value: PAYMENT_METHODS): void;
};

const PaymentMethods: FC<Props> = ({
  selectedPaymentMethod,
  onPressPaymentMethod,
}) => (
  <View style={style.box}>
    {[PAYMENT_METHODS.CASH, PAYMENT_METHODS.DATAPHONE].map((value) => (
      <PaymentCard
        key={value}
        method={value}
        selected={value === selectedPaymentMethod}
        onPress={() => onPressPaymentMethod(value)}
      />
    ))}
  </View>
);

const style = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PaymentMethods;
