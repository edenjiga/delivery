import { View, Text } from "@/components/Themed";
import { RootState } from "@/store";
import { ICartState } from "@/types";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default () => {
  const cart = useSelector<RootState, ICartState>((state) => state.cart);

  return (
    <SafeAreaView>
      <View>
        {Object.values(cart).map(({ product, quantity }) => (
          <Text key={`tabCart-${product._id}`}>
            {product.name} {quantity}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};
