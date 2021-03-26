import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { getProducts } from "@/api/products";
import { Product } from "@edenjiga/delivery-common";
import { ProductCardHorizontal } from "@/components";
import { StyleSheet, SafeAreaView } from "react-native";
import Colors from "@/constants/Colors";

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
      <Text style={styles.title}>Populares</Text>
      <View>
        {products.map((product) => (
          <ProductCardHorizontal key={product._id} product={product} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: Colors.lightgrey,
    padding: 10,
    fontSize: 20,
    color: Colors.black,
    fontWeight: "700",
  },
});
