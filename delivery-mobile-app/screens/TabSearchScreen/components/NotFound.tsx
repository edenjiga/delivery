import { View, Text } from '@/components/Themed';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function Component() {
  return (
    <View style={styles.container}>
       <Image
        style={styles.background}
        source={require('assets/images/background-wrong.png')}
      />
      <View style={styles.infoCont}>
        <Text style={styles.title}>Lo sentimos</Text>
        <Text style={styles.description}>
          No hemos encontrado nada relacionado con tu búsqueda, por favor,
          intenta nuevamente.
        </Text>
        <Image
          style={styles.image}
          source={require('assets/images/something-wrong.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    minHeight: 560,
  },
  background: {
    position: 'absolute',
  },
  infoCont: {
    justifyContent: 'center',
    top: 80,
    alignItems: 'center',
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    height: 240,
    top: 50,
    resizeMode: 'contain',
    width: 240,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 30,
    fontFamily: 'latoBold',
    marginBottom: 20,
  },
});
