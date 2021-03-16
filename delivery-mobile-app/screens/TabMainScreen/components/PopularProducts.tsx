import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { getProducts } from "@/api/products";
import { Product } from "@edenjiga/delivery-common";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCardHorizontal } from "@/components";

export default () => {
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        const popular = await getProducts({
          _limit: 5,
          _sort: "unitsInStock:desc",
        });
        setProductState(popular);
      } catch (e) {
        //TODO: handle error

        console.error(e);
      }
    };

    getPopularProducts();
  }, []);
  return (
    <SafeAreaView>
      <Text>Ofertas especiales</Text>
      <View style={{ height: 143 }}>
        {products.map((product) => (
          <ProductCardHorizontal key={product._id} product={product} />
        ))}
      </View>
    </SafeAreaView>
  );
};
