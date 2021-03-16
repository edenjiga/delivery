import useCartOperationForProduct from "@/hooks/useCartOperationForProduct";
import { Product } from "@edenjiga/delivery-common";
import React, { FC } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { Text, View } from "./Themed";

type Props = {
  product: Product;
};

const ProductCardHorizontal: FC<Props> = ({ product }) => {
  const { addProduct, decreaseProduct, quantity } = useCartOperationForProduct(
    product
  );
  return (
    <View>
      {!!product.Imagen && (
        <Image
          style={styles.productImage}
          source={{
            uri: product.Imagen.url,
          }}
        />
      )}
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.finalPrice}</Text>

      {!quantity ? (
        <Button title={"add"} onPress={addProduct} />
      ) : (
        <View>
          <Button title={"-"} onPress={decreaseProduct} />
          <Text>{quantity}</Text>
          <Button title={"+"} onPress={addProduct} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 103,
    height: 65,
  },
  products: {
    margin: 10,
    height: 103,
    width: 103,
    backgroundColor: "red",
  },
});

export default ProductCardHorizontal;
