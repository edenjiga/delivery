import { View, Text } from '@/components/Themed';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function Component() {
  return (
    <View style={styles.container}>
      <View style={styles.infoCont}>
        <Text style={styles.title}>Lo sentimos</Text>
        <Text style={styles.description}>
          No hemos encontrado nada relacionado con tu búsqueda, por favor,
          intenta nuevamente.
        </Text>
        <Image
          style={styles.image}
          source={require('assets/images/not-found.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  infoCont: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 500,
    justifyContent: 'center',
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: Colors.darkGrey,
    textAlign: 'center',
  },
  image: {
    marginTop: 40,
    resizeMode: 'contain',
  },
});
