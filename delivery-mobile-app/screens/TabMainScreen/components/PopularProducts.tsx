import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { getProducts } from "@/api/products";
import { Product } from "@edenjiga/delivery-common";
import { StyleSheet, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { addProductAction } from "@/store/actions/cart";

export default () => {
  const dispatch = useDispatch();
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        const popular = await getProducts({
          _limit: 5,
          _sort: "unitsInStock:desc",
        });
        setProductState(popular);
        console.log(popular.map(({ _id }) => _id));
      } catch (e) {
        console.log(e);
      }
    };

    getPopularProducts();
  }, []);
  return (
    <SafeAreaView>
      <Text>Ofertas especiales</Text>
      <View style={{ height: 143 }}>
        {products.map((product) => (
          <View style={styles.products} key={`special-${product._id}`}>
            {!!product.Imagen && (
              <Image
                style={styles.productImage}
                source={{
                  uri: product.Imagen.url,
                }}
              />
            )}
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
            <Button
              title="Add"
              onPress={() => dispatch(addProductAction(product))}
            />
          </View>
        ))}
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
