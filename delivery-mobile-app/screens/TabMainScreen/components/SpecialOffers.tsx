import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { getProducts } from "@/api/products";
import { Product } from "@edenjiga/delivery-common";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
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
      <View style={styles.container}>
        <Text style={styles.title}>Ofertas especiales</Text>
        <View style={styles.box}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.productCard}>
              {products.map((product) => (
                <ProductCardVertical product={product} key={product._id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: "100%",
    backgroundColor: Colors.lightgrey,
    justifyContent: "center",
  },
  productCard: {
    backgroundColor: Colors.lightgrey,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  title: {
    backgroundColor: Colors.lightgrey,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    color: Colors.black,
    fontWeight: "bold",
  },
});
