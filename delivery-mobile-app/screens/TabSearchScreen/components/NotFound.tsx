import { View, Text } from '@/components/Themed';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default () => (
  <View style={styles.container}>
    <View style={styles.infoCont}>
      <Text style={styles.title}>Lo sentimos</Text>
      <Text style={styles.description}>
        No hemos encontrado nada relacionado con tu búsqueda, por favor, intenta
        nuevamente.
      </Text>
      <Image
        style={styles.image}
        source={require('assets/images/not-found.png')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  infoCont: {
    height: 500,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
    color: Colors.darkGrey,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  image: {
    resizeMode: 'contain',
    marginTop: 40,
  },
});
