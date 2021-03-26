import { View } from '@/components/Themed';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { NotFound } from './components';
import { TextInput, StyleSheet } from 'react-native';
import { ProductCardHorizontal } from '@/components';

type Props = {
  isLoading: boolean;
  onChangeText(text: string): void;
  products: Array<Product>;
  text: string;
};

const TabSearchScreen: FC<Props> = ({
  onChangeText,
  products,
  text,
  isLoading,
}) => {
  const showNotFound = !products.length && text;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        defaultValue={''}
      />
      {!isLoading && (
        <View>
          {products.map((product) => (
            <ProductCardHorizontal key={product._id} product={product} />
          ))}

          {showNotFound ? <NotFound /> : null}
        </View>
      )}
    </View>
  );
};
export default TabSearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    margin: 20,
  },
});
