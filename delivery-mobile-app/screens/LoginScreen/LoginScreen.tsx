import { View } from '@/components/Themed';
import React from 'react';
import { Button, TextInput, SafeAreaView } from 'react-native';

type Props = {
  onChangePhoneText(text: string): void;
  handleLogin(): void;
};

export default ({ onChangePhoneText, handleLogin }: Props) => (
  <SafeAreaView>
    <View>
      <TextInput
        keyboardType="phone-pad"
        autoCapitalize="none"
        maxLength={10}
        onChangeText={onChangePhoneText}
        placeholder="Ingresar numero de celular"
      />

      <Button title="Enviar" onPress={handleLogin} />
    </View>
  </SafeAreaView>
);
