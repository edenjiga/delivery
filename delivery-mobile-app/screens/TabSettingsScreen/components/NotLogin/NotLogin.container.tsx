import SCREEN_NAMES from '@/constants/screenNames';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import NotLogin from './NotLogin';

const NotLoginContainer: FC = () => {
  const navigation = useNavigation();
  const onPress = useCallback(() => navigation.navigate(SCREEN_NAMES.LOGIN), [
    navigation,
  ]);
  return <NotLogin onPress={onPress} />;
};

export default NotLoginContainer;
