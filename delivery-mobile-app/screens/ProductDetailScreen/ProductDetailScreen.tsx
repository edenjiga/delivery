import { ProductCardVertical } from '@/components';
import NumberFormatToCop from '@/components/NumberFormatToCop';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { formatNumberToCop } from '@/utils/number';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  product: Product;
  products: Array<Product>;
  quantity: number;
  addOneToQuantity(): void;
  goBack(): void;
  onPressAgregar(): void;
  substractOneToQuantity(): void;
};

const ProductDetailScreen: FC<Props> = ({
  product,
  products,
  quantity,
  addOneToQuantity,
  goBack,
  onPressAgregar,
  substractOneToQuantity,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={goBack}>
      <Text>X</Text>
    </TouchableOpacity>
    <ScrollView>
      <Image
        style={styles.banner}
        source={
          product.Imagen?.formats.large
            ? { uri: product.Imagen.formats.large.url }
            : require('@/assets/images/vehicle.png')
        }
      ></Image>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {product.discount ? (
          <View>
            <View style={styles.discountView}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
            <View style={styles.priceBox}>
              <NumberFormatToCop
                style={styles.finalPrice}
                number={product.finalPrice}
              />
              <NumberFormatToCop style={styles.price} number={product.price} />
            </View>
          </View>
        ) : (
          <NumberFormatToCop
            style={styles.finalPrice}
            number={product.finalPrice}
          />
        )}
      </View>
      <View>
        <Text>Productos relacionados</Text>
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          {products.map((p) => (
            <ProductCardVertical product={p} key={p._id} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>

    <View style={styles.actions}>
      <View style={styles.categoryBtn}>
        <TouchableOpacity onPress={substractOneToQuantity}>
          <Text style={styles.count}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countNumber}> {quantity} </Text>
        <TouchableOpacity onPress={addOneToQuantity}>
          <Text style={styles.count}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPressAgregar}>
        <Text style={styles.buttonAdd}>
          Agregar ${formatNumberToCop(product.finalPrice * quantity)}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  banner: {
    height: 200,
    width: '100%',
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 5,
    color: Colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryBtn: {
    alignItems: 'center',
    borderColor: Colors.lineGrey,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    // width: '50%',
  },
  container: { flex: 1 },
  count: {
    // backgroundColor: Colors.orange,
    borderRadius: 2,
    color: Colors.black,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  countNumber: {
    color: Colors.black,
    fontWeight: 'bold',
    marginHorizontal: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  discountText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  discountView: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 10,
    height: 25,
    justifyContent: 'center',
    marginTop: 10,
    width: 45,
  },
  finalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  price: {
    color: Colors.darkGrey,
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  priceBox: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
    textAlign: 'center',
  },
  productDescription: {
    color: Colors.darkGrey,
    fontSize: 15,
  },
  productInfo: {
    backgroundColor: Colors.white,
    padding: 15,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
export default ProductDetailScreen;
