import { PAYMENT_METHODS } from '@edenjiga/delivery-common';
import React, { FC, useCallback, useState } from 'react';
import PaymentMethods from './PaymentMethods';

type Props = {
  onValueChange(value: PAYMENT_METHODS): void;
  paymentMethodSelected: PAYMENT_METHODS;
};

const PaymentMethodsContainer: FC<Props> = ({
  onValueChange,
  paymentMethodSelected,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodSelected,
  );

  const onPressPaymentMethod = useCallback(
    (value: PAYMENT_METHODS) => {
      setSelectedPaymentMethod(value);
      onValueChange(value);
    },
    [onValueChange],
  );

  return (
    <PaymentMethods
      selectedPaymentMethod={selectedPaymentMethod}
      onPressPaymentMethod={onPressPaymentMethod}
    />
  );
};

export default PaymentMethodsContainer;
