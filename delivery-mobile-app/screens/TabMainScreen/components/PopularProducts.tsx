import React, { FC, useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import { getProducts } from '@/api/products';
import { Product } from '@edenjiga/delivery-common';
import { ProductCardHorizontal } from '@/components';
import { StyleSheet, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';

const PopularProducts: FC = () => {
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        const popular = await getProducts({
          _sort: 'unitsInStock:desc',
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

export default PopularProducts;

const styles = StyleSheet.create({
  title: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'latoBold',
    padding: 10,
  },
});
