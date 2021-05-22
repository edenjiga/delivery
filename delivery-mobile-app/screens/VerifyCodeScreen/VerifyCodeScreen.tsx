import { View, Text } from '@/components/Themed';
import React, { FC } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Image } from 'react-native';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  onChangeText(text: string): void;
  handleResendSms(): void;
  countDown: number;
};
const VerifyCodeScreen: FC<Props> = ({
  onChangeText,
  handleResendSms,
  countDown,
}) => (
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

        {countDown > 0 ? (
          <Text style={styles.counterText}>
            Reenviar código en
            <Text style={styles.counter}> {countDown} segundos</Text>
          </Text>
        ) : (
          <Text onPress={handleResendSms} style={styles.reenviar}>
            Reenviar código
          </Text>
        )}
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
    fontSize: 15,
    textAlign: 'center',
  },
  counterText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  counter: {
    color: Colors.red,
  },
  inputCont: {
    marginVertical: 30,
  },
  phone: {
    height: 20,
    left: 15,
    position: 'absolute',
    top: 10,
    width: 20,
    zIndex: 10,
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
