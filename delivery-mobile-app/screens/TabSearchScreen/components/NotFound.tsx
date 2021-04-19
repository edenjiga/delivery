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
    marginTop: 100,
    paddingHorizontal: 20,
  },
  infoCont: {
    justifyContent: 'center',
    height: 280,
    alignItems: 'center',
  },

  description: {
    color: Colors.darkGrey,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    marginTop: 60,
    resizeMode: 'contain',
    width: '100%',
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
