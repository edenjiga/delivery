import { View } from '@/components/Themed';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { NotFound } from './components';
import { TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProductCardHorizontal } from '@/components';
import Colors from '@/constants/Colors';

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
      <View>
        <Image
          style={styles.search}
          resizeMode="contain"
          source={require('assets/images/search.png')}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          defaultValue={''}
          placeholder={'¿Qué deseas disfrutar hoy?'}
        />
        <View style={styles.close}>
          <TouchableOpacity
            onPress={() => {
              alert('You tapped the button!');
            }}
          >
            <Image
              style={styles.closeIcon}
              resizeMode="contain"
              source={require('assets/images/closeIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

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
    flex: 1,
    backgroundColor: Colors.white,
  },
  search: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 22,
    top: 30,
    zIndex: 1,
  },
  input: {
    backgroundColor: Colors.whiteGrey,
    borderColor: Colors.lineGrey,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 45,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 30,
    zIndex: 10,
  },
  closeIcon: {
    width: 22,
    height: 22,
  },
});
