import { addSuggestion } from '@/api/suggestions';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import SuggestionScreen from './SuggestionScreen';

type Props = {
  navigation: StackNavigationProp<
    RootStackParamList,
    SCREEN_NAMES.USER_SUGGESTION
  >;
};

const SuggestionScreenContainer: FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');

  const onPress = useCallback(async () => {
    try {
      console.log(text);
      await addSuggestion({ text });
      return navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Ups algo salio mal agregando la sugerencia o el comentario');
    }
  }, [navigation, text]);

  const onChangeText = useCallback((value: string) => {
    setText(value);
  }, []);
  return <SuggestionScreen onPress={onPress} onChangeText={onChangeText} />;
};

export default SuggestionScreenContainer;
