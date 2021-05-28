import { sendSms, verifySmsCode } from '@/api/auth';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import VerifyCodeScreen from './VerifyCodeScreen';
import * as userActions from '@/store/actions/user';
import { RemoveLastTwoAndAddGoTo } from '@/utils/navigationActions';
import useModal from '@/hooks/useModal';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.VERIFY_CODE>;
};
const second = 1;
const VerifyCodeScreenContainer: FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const [codeText, setCodeText] = useState('');
  const [countDown, setCountDown] = useState(second * 60 * 2);

  const { phone, goTo } = route.params || {};

  const onChangeText = useCallback(
    (newTextValue) => setCodeText(newTextValue),
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCountDown = countDown - second;
      setCountDown(newCountDown);
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const verifyCodeProcess = async (code: string, phone: string) => {
      try {
        const { token, user } = await verifySmsCode({ phone, code });

        await storageService.setToken(token);
        dispatch(userActions.loginUserAsync.success(user));

        return navigation.dispatch(RemoveLastTwoAndAddGoTo(goTo));
      } catch (error) {
        showModal({ text: 'Mal Codigo, Intentalo de nuevo' });
      }
    };

    if (codeText.length === 6) {
      verifyCodeProcess(codeText, phone);
    }
  }, [codeText, dispatch, goTo, navigation, phone, showModal]);

  const handleResendSms = useCallback(async () => {
    if (countDown > 0) {
      return showModal({
        text: `Debes esperar ${countDown} segundos antes de pedir un nuevo codigo`,
      });
    }

    try {
      await sendSms(phone);
    } catch (err) {
      showModal({ text: 'Error al solicitar el nuevo codigo' });
    }
  }, [countDown, phone, showModal]);

  return (
    <VerifyCodeScreen
      onChangeText={onChangeText}
      handleResendSms={handleResendSms}
      countDown={countDown}
    />
  );
};

export default VerifyCodeScreenContainer;
