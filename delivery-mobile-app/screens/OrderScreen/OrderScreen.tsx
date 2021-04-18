/* eslint-disable react-native/no-raw-text */
import React, { FC } from 'react';
import { Text } from '@/components/Themed';
import { Button, SafeAreaView, View } from 'react-native';
import { ProductWithQuantity } from '@/types';
import { Address, PAYMENT_METHODS } from '@edenjiga/delivery-common';
import { GoBackButton } from '@/components';
import NumberFormatToCop from '@/components/NumberFormatToCop';
import { PaymentMethods } from './components';
type Props = {
  address: Address | null;
  deliveryValue: number;
  onCreateOrder(): void;
  paymentMethodSelected: PAYMENT_METHODS;
  productsWithQuanty: ProductWithQuantity[];
  subTotal: number;
  setPaymentMethodSelected(a: PAYMENT_METHODS): void;
  totalDiscount: number;
  total: number;
};

const OrderScreen: FC<Props> = ({
  address,
  deliveryValue,
  onCreateOrder,
  productsWithQuanty,
  subTotal,
  setPaymentMethodSelected,
  paymentMethodSelected,
  total,
  totalDiscount,
}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>OrderScreen</Text>
        <GoBackButton title="RESUMENT DE LA ORDEN:" />

        <Text>Entregar domicilio a </Text>
        <Text>{address?.nomenclature}</Text>
        <Text>{address?.name}</Text>
        {/* {productsWithQuanty.map(({ quantity, product: { name, _id } }) => (
          <View key={_id}>
            <Text>
              {name} {quantity}
            </Text>
          </View>
        ))} */}
        <Text>Numero de products: {productsWithQuanty.length}</Text>
        <Text>
          SubTotal: <NumberFormatToCop number={subTotal} />
        </Text>
        <Text>
          Descuento Aplicado: <NumberFormatToCop number={totalDiscount} />
        </Text>
        <Text>
          Envio: <NumberFormatToCop number={deliveryValue} />
        </Text>
        <Text>
          Total a pagar: <NumberFormatToCop number={total} />
        </Text>

        <Text>Metodo de pago:</Text>
        <PaymentMethods
          paymentMethodSelected={paymentMethodSelected}
          onValueChange={(itemValue) => setPaymentMethodSelected(itemValue)}
        />
        <Button title="Ordernar" onPress={onCreateOrder} />
      </View>
    </SafeAreaView>
  );
};
export default OrderScreen;
