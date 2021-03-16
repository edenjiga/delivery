import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { getProducts } from "@/api/products";
import { Product } from "@edenjiga/delivery-common";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { ProductCardVertical } from "@/components";

export default () => {
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    const getProductsInPromotion = async () => {
      try {
        const productsInOffers = await getProducts({
          discount_null: false,
          _limit: 5,
        });

        setProductState(productsInOffers);
      } catch (e) {
        //TODO: handle error
        console.log(e);
      }
    };

    getProductsInPromotion();
  }, []);
  return (
    <SafeAreaView>
      <Text>Ofertas especiales</Text>
      <View style={{ height: 143 }}>
        <ScrollView
          horizontal={true}
          style={styles.container}
          showsHorizontalScrollIndicator={false}
        >
          {products.map((product) => (
            <ProductCardVertical product={product} key={product._id} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 103,
    height: 65,
  },
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    width: 360,
  },
  products: {
    margin: 10,
    height: 103,
    width: 103,
    backgroundColor: "red",
  },
});
