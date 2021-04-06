import React, { FC } from "react";
import { View, Text } from "@/components/Themed";
import { ProductWithQuantity } from "@/types";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onGoToPay(): void;
  productWithQuantity: ProductWithQuantity[];
  total: number;
};

const TabCartScreen: FC<Props> = ({
  onGoToPay,
  productWithQuantity = [],
  total,
}) => (
  <SafeAreaView>
    <View>
      {productWithQuantity.map(({ product, quantity }) => (
        <Text key={`tabCart-${product._id}`}>
          {product.name} {quantity}
        </Text>
      ))}

      {!!productWithQuantity.length && (
        <Button title={`go to pay $ ${total}`} onPress={onGoToPay} />
      )}
    </View>
  </SafeAreaView>
);

export default TabCartScreen;
