import { View } from '@/components/Themed';
import React from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

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
