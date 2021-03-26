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
      {!!product.Imagen && (
        <View style={styles.ImagenView}>
          <Image
            style={styles.productImage}
            resizeMode={"contain"}
            source={{
              uri: product.Imagen.url,
            }}
          />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.finalPrice}</Text>
      </View>
      {!quantity ? (
        <TouchableOpacity style={styles.buttonAdd} onPress={addProduct}>
          <Text style={styles.addText}>Agregar</Text>
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
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    minHeight: 120,
    width: 140,
    borderRadius: 6,
    justifyContent: "space-between",
  },
  ImagenView: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomColor: Colors.lineGray,
    borderBottomWidth: 1,
  },
  productImage: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: "100%",
    height: 100,
  },
  info: {
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 5,
    minHeight: 90,
    justifyContent: "space-between",
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 40,
    justifyContent: "center",
  },
  counter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 40,
    backgroundColor: Colors.white,
  },
  quantity: {
    justifyContent: "center",
    color: Colors.black,
    width: 60,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
  },
  count: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 28,
    fontWeight: "600",
  },
  addText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  increase: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    width: 40,
    borderBottomRightRadius: 6,
  },
  decrease: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange,
    width: 40,
    borderBottomLeftRadius: 6,
  },
  name: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 10,
  },
  price: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default ProductCardHorizontal;
