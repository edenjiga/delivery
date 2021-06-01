import { addSuggestion } from '@/api/suggestions';
import SCREEN_NAMES from '@/constants/screenNames';
import useModal from '@/hooks/useModal';
import { RootStackParamList } from '@/types';
import { HandleErrorMessage } from '@/utils/errorMessages';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState } from 'react';
import SuggestionScreen from './SuggestionScreen';

type Props = {
  navigation: StackNavigationProp<
    RootStackParamList,
    SCREEN_NAMES.USER_SUGGESTION
  >;
};

const SuggestionScreenContainer: FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');
  const { showModal } = useModal();

  const onPress = useCallback(async () => {
    try {
      console.log(text);
      await addSuggestion({ text });
      return navigation.goBack();
    } catch (err) {
      const message = HandleErrorMessage(error.message);
      showModal({ text: message });
    }
  }, [navigation, showModal, text]);

  const onChangeText = useCallback((value: string) => {
    setText(value);
  }, []);
  return <SuggestionScreen onPress={onPress} onChangeText={onChangeText} />;
};

export default SuggestionScreenContainer;
