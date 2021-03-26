import useCartOperationForProduct from "@/hooks/useCartOperationForProduct";
import { Product } from "@edenjiga/delivery-common";
import React, { FC } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";

type Props = {
  product: Product;
};

const ProductCardHorizontal: FC<Props> = ({ product }) => {
  const { addProduct, decreaseProduct, quantity } = useCartOperationForProduct(
    product
  );
  return (
    <View style={styles.card}>
      <View style={styles.box}>
        <View style={styles.image}>
          {!!product.Imagen && (
            <Image
              style={styles.productImage}
              resizeMode={"contain"}
              source={{
                uri: product.Imagen.url,
              }}
            />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>

      <View style={styles.boxInfo}>
        <Text style={styles.price}>${product.finalPrice}</Text>
        {!quantity ? (
          <TouchableOpacity style={styles.buttonAdd} onPress={addProduct}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counter}>
            <TouchableOpacity style={styles.decrease} onPress={decreaseProduct}>
              <Text style={styles.count}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.increase} onPress={addProduct}>
              <Text style={styles.count}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  box: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 10,
  },
  card: {
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    minHeight: 100,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lineGray,
  },
  productImage: {
    borderRadius: 10,
    width: 80,
    height: 100,
  },
  info: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    width: 150,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    justifyContent: "center",
  },
  counter: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  quantity: {
    justifyContent: "center",
    color: Colors.black,
    textAlign: "center",
    alignSelf: "center",
    width: 25,
  },
  count: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 22,
    fontWeight: "600",
  },
  addText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  increase: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: 25,
  },
  decrease: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: 25,
  },
  name: {
    color: Colors.darkGrey,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: "300",
  },
  price: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "right",
  },
});

export default ProductCardHorizontal;
