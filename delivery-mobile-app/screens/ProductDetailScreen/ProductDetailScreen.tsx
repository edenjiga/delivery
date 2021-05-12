import NumberFormatToCop from '@/components/NumberFormatToCop';
import { GoBackButton, ProductCardVertical } from '@/components';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { formatNumberToCop } from '@/utils/number';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
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
  onPressAgregar,
  substractOneToQuantity,
}) => (
  <View style={styles.container}>
    <View style={styles.head}>
      <GoBackButton />
    </View>
    <ScrollView>
      <View style={styles.banner}>
        <Image
          style={styles.bannerImg}
          source={
            product.Imagen?.formats.large
              ? { uri: product.Imagen.formats.large.url }
              : require('@/assets/images/vehicle.png')
          }
          resizeMode={'contain'}
        ></Image>
        {!!product.discount && (
          <View style={styles.discountBox}>
            <Image
              style={styles.discount}
              resizeMode="contain"
              source={require('assets/images/discount.png')}
            />
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.priceCont}>
          {!product.discount ? (
            <NumberFormatToCop
              style={styles.normalPrice}
              number={product.price}
            />
          ) : (
            <View style={styles.boxPrice}>
              <NumberFormatToCop
                style={styles.discountPrice}
                number={product.finalPrice}
              />
              <NumberFormatToCop
                style={styles.specialPrice}
                number={product.price}
              />
            </View>
          )}
        </View>
      </View>
      <View>
        <Text style={styles.title}>Productos relacionados</Text>
        <View style={styles.box}>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
            {products.map((p) => (
              <ProductCardVertical product={p} key={p._id} />
            ))}
          </ScrollView>
        </View>
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
      <TouchableOpacity style={styles.addButton} onPress={onPressAgregar}>
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
    borderTopColor: Colors.lightgrey,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  addButton: {
    backgroundColor: Colors.orange,
    borderRadius: 8,
  },
  banner: {
    height: 200,
    justifyContent: 'center',
  },
  bannerImg: {
    height: 180,
    width: '100%',
  },
  buttonAdd: {
    borderRadius: 6,
    color: Colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryBtn: {
    borderColor: Colors.lineGrey,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  count: {
    color: Colors.black,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  countNumber: {
    color: Colors.black,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  discount: {
    height: 45,
    width: 45,
  },
  discountBox: {
    bottom: 20,
    position: 'absolute',
    right: 20,
  },
  discountText: {
    color: Colors.white,
    fontSize: 13,
    position: 'absolute',
    right: 2,
    textAlign: 'center',
    top: 13,
    width: 40,
    ...Platform.select({
      ios: {
        fontSize: 12,
        top: 15,
      },
    }),
  },
  head: {
    backgroundColor: Colors.white,
  },
  productDescription: {
    color: Colors.darkGrey,
    fontSize: 16,
    marginBottom: 10,
  },
  productInfo: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  productName: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    backgroundColor: Colors.bgGrey,
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  box: {
    backgroundColor: Colors.bgGrey,
    paddingBottom: 20,
  },
  priceCont: {
    paddingVertical: 10,
  },
  boxPrice: {
    flexDirection: 'row',
  },
  normalPrice: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountPrice: {
    color: Colors.green,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 30,
  },
  specialPrice: {
    color: Colors.red,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});
export default ProductDetailScreen;
