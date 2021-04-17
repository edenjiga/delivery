import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from '@/components/Themed';
import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  onSubmit(): void;
  setValue(a: string, value: any): void;
  nameInitialValue?: string;
  emailInitialValue?: string;
  identificationInitialValue?: string;
};

export default ({
  onSubmit,
  emailInitialValue,
  identificationInitialValue,
  nameInitialValue,
  setValue,
}: Props) => (
  <View style={styles.container}>
    <KeyboardAvoidingView>
      <GoBackButton backWitheArrow={true} viewStyles={styles.goBackButton} />
      <View style={styles.header}>
        <Text style={styles.title}>Completa tus datos</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.inputCont}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('assets/images/user.png')}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValue('name', value)}
            placeholder="Nombre"
            defaultValue={nameInitialValue}
          />
        </View>
        <View style={styles.inputCont}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('assets/images/mail.png')}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValue('email', value)}
            placeholder="Email"
            defaultValue={emailInitialValue}
          />
        </View>
        <View style={styles.inputCont}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('assets/images/id.png')}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValue('identification', value)}
            placeholder="Identification"
            keyboardType="phone-pad"
            maxLength={10}
            defaultValue={identificationInitialValue}
          />
        </View>
        <TouchableOpacity style={styles.buttonAdd} onPress={onSubmit}>
          <Text style={styles.addText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  title: {
    color: Colors.white,
    fontSize: 24,
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 50,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
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
  inputCont: {
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
  },
});
