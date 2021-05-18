import { View, Text } from '@/components/Themed';
import React, { FC } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Image } from 'react-native';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  onChangeText(text: string): void;
  handleResendSms(): void;
};
const VerifyCodeScreen: FC<Props> = ({ onChangeText, handleResendSms }) => (
  <View style={styles.container}>
    <SafeAreaView>
      <GoBackButton backWitheArrow={true} viewStyles={styles.goBackButton} />
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>
          Por favor, ingresa el código que te llegó por mensaje de texto a tu
          celular
        </Text>
        <View style={styles.inputCont}>
          <Image
            style={styles.phone}
            resizeMode="contain"
            source={require('assets/images/code.png')}
          />
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder={'Ingresa codigo'}
            onChangeText={onChangeText}
            maxLength={6}
            placeholderTextColor={Colors.grey}
          />
        </View>

        <Text style={styles.text}>¿No te llegó el código?</Text>
        <Text style={styles.counterText}>
          Reenviar código en<Text style={styles.counter}> 59 segundos</Text>
        </Text>
        <Text onPress={handleResendSms} style={styles.reenviar}>
          Reenviar código
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
    height: '30%',
    paddingTop: 40,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
  },
  counterText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  counter: {
    color: Colors.red,
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
    left: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 40,
    height: 40,
    backgroundColor: Colors.whiteGrey,
    paddingLeft: 45,
    fontSize: 15,
  },
  reenviar: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    color: Colors.grey,
  },
});

export default VerifyCodeScreen;
