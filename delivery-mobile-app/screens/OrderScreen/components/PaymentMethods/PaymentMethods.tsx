import { View } from '@/components/Themed';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import PaymentCard from './components/PaymentCard';

type Props = {
  selectedPaymentMethod: PAYMENT_METHODS;
  onPressPaymentMethod(value: PAYMENT_METHODS): void;
};

const PaymentMethods: FC<Props> = ({
  selectedPaymentMethod,
  onPressPaymentMethod,
}) => (
  <View>
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

export default PaymentMethods;
