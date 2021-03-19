import React, { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import SCREEN_NAMES from "@/constants/screenNames";
import { RootStackParamList } from "@/types";
import LoginScreen from "./LoginScreen";
import { sendSms } from "@/api/auth";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.LOGIN>;
}

const LoginScreenContainer: FC<Props> = ({ navigation, route }) => {
  const [phoneText, setPhoneText] = useState("");

  const onChangePhoneText = useCallback(
    (newPhoneText) => setPhoneText(newPhoneText),
    [phoneText]
  );

  const handleLogin = async () => {
    if (phoneText.length !== 10) return Alert.alert("Numero invalido");
    try {
      await sendSms(phoneText);
      navigation.navigate(SCREEN_NAMES.VERIFY_CODE, {
        phone: phoneText,
        goTo: route.params.goTo,
      });
    } catch (error) {
      Alert.alert("Verifica tu numero telefónico e intenta de nuevo");
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
