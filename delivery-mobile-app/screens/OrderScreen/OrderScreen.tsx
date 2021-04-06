import React, { FC } from "react";
import { Text } from "@/components/Themed";
import { Button, SafeAreaView, View } from "react-native";
import { ProductWithQuantity } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { PAYMENT_METHODS } from "@edenjiga/delivery-common";
type Props = {
  deliveryValue: number;
  onCreateOrder(): void;
  paymentMethodSelected: PAYMENT_METHODS;
  productsWithQuanty: ProductWithQuantity[];
  subTotal: number;
  setPaymentMethodSelected(a: PAYMENT_METHODS): void;
  total: number;
};

const OrderScreen: FC<Props> = ({
  deliveryValue,
  onCreateOrder,
  productsWithQuanty,
  subTotal,
  setPaymentMethodSelected,
  paymentMethodSelected,
  total,
}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>OrderScreen</Text>
        <Picker
          selectedValue={paymentMethodSelected}
          onValueChange={(itemValue) => setPaymentMethodSelected(itemValue)}
        >
          <Picker.Item label="EFECTIVO" value={PAYMENT_METHODS.CASH} />
          <Picker.Item label="DATAFONO" value={PAYMENT_METHODS.DATAPHONE} />
        </Picker>
        {productsWithQuanty.map(({ quantity, product: { name, _id } }) => (
          <View key={_id}>
            <Text>
              {name} {quantity}
            </Text>
          </View>
        ))}
        <Text>{subTotal}</Text>
        <Text>Domicilio: {deliveryValue}</Text>
        <Text>{total}</Text>
        <Button title="Ordernar" onPress={onCreateOrder} />
      </View>
    </SafeAreaView>
  );
};
export default OrderScreen;
