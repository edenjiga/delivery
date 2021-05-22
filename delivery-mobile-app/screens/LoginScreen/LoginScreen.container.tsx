import React, { FC, useCallback, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import LoginScreen from './LoginScreen';
import { sendSms } from '@/api/auth';
import useModal from '@/hooks/useModal';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.LOGIN>;
}

const LoginScreenContainer: FC<Props> = ({ navigation, route }) => {
  const [phoneText, setPhoneText] = useState('');
  const { showModal } = useModal();

  const onChangePhoneText = useCallback(
    (newPhoneText) => setPhoneText(newPhoneText),
    [],
  );

  const handleLogin = async () => {
    if (phoneText.length !== 10) return showModal('Numero invalido');
    try {
      await sendSms(phoneText);
      return navigation.navigate(SCREEN_NAMES.VERIFY_CODE, {
        phone: phoneText,
        goTo: route.params?.goTo,
      });
    } catch (error) {
      showModal('Verifica tu numero telefónico e intenta de nuevo');
    }
  };

  return (
    <LoginScreen
      handleLogin={handleLogin}
      onChangePhoneText={onChangePhoneText}
    />
  );
};

export default LoginScreenContainer;
