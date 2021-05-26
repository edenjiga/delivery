import React from 'react';
import { Text, View } from './Themed';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';


export default () => (
  <View style={styles.container}>
    <Image
      style={styles.background}
      source={require('assets/images/background.png')}
    />
    <View style={styles.info}>
      <Text style={styles.titulo}>¡Actualización disponible!</Text>
      <Text style={styles.subtitulo}>Hay una <Text style={styles.mark}>nueva versión</Text> de la apliación disponible.</Text>
      <Text style={styles.description}>Para poder seguir disfrutando de una mejor experiencia <Text style={styles.mark}>descarga la  actualización aquí:</Text></Text>
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          alert('You tapped the button!');
        }}
      >
        <Text style={styles.closeText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
  },
  info: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 40,
    fontFamily: 'latoBold',
    color: Colors.darkGrey,
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20,
    color: Colors.darkGrey,
    paddingHorizontal: 30,
  },
  description: {
    textAlign: 'center',
    fontSize: 17,
    color: Colors.darkGrey,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  mark: {
    fontFamily: 'latoBold',
    color: Colors.darkGrey,
  },
  close: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 6,
    justifyContent: 'center',
    marginTop: 15,
    minHeight: 36,
    minWidth: 150,
  },
  closeText: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: 'latoBold',
  },
});