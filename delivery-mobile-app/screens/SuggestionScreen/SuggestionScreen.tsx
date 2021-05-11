import React, { FC } from 'react';
import { TextInput, View } from '@/components/Themed';
import { Button } from 'react-native';
import { GoBackButton } from '@/components';

type Props = {
  onPress(): void;
  onChangeText(value: string): void;
};
const SuggestionScreen: FC<Props> = ({ onPress, onChangeText }) => (
  <View>
    <GoBackButton title="OPINIONES Y/O SUGERENCIAS" />
    <TextInput onChangeText={onChangeText}></TextInput>
    <Button title="OnPres" onPress={onPress}></Button>
  </View>
);

export default SuggestionScreen;
