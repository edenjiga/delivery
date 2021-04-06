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
    paddingHorizontal: 20,
    marginTop: 100,
  },
  infoCont: {
    justifyContent: 'center',
    height: 280,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkGrey,
    marginBottom: 15,
  },
  description: {
    paddingHorizontal: 20,
    textAlign: 'center',
    color: Colors.darkGrey,
    fontSize: 16,
  },
  image: {
    resizeMode: 'contain',
    marginTop: 60,
    width: '100%',
    height: '100%',
  },
});
