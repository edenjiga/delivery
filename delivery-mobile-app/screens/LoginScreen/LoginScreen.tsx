import { View, Text } from '@/components/Themed';
import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  onChangePhoneText(text: string): void;
  handleLogin(): void;
};

export default ({ onChangePhoneText, handleLogin }: Props) => (
  <View style={styles.container}>
    <SafeAreaView>
      <GoBackButton backWitheArrow={true} viewStyles={styles.goBackButton} />
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>
          Te enviaremos un código de verificación al número de celular que
          ingreses
        </Text>
        <View style={styles.inputCont}>
          <Image
            style={styles.phone}
            resizeMode="contain"
            source={require('assets/images/phone.png')}
          />
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={10}
            onChangeText={onChangePhoneText}
            placeholder="Ingresar numero de celular"
            placeholderTextColor={Colors.grey}
          />
        </View>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleLogin}>
          <Text style={styles.addText}>Enviar</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Al confirmar aceptas que te enviemos un código de verificación vía SMS
        </Text>
      </View>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  goBackButton: {
    backgroundColor: Colors.orange,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    height: '20%',
    justifyContent: 'center',
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 50,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
  },
  text: {
    textAlign: 'center',
  },
  inputCont: {
    marginVertical: 30,
  },
  phone: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    height: 40,
    backgroundColor: Colors.whiteGrey,
    paddingLeft: 40,
    fontSize: 15,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
});
