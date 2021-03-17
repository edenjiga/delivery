import { verifySmsCode } from "@/api/auth";
import SCREEN_NAMES from "@/constants/screenNames";
import { RootStackParamList } from "@/types";
import storageService from "@/utils/storageService";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import VerifyCodeScreen from "./VerifyCodeScreen";
import * as userActions from "@/store/actions/user";
import { RemoveLastTwoAndAddGoTo } from "@/utils/navigationActions";
import { Alert } from "react-native";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.VERIFY_CODE>;
}

const VerifyCodeScreenContainer: FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [codeText, setCodeText] = useState("");

  const { phone, goTo } = route.params;

  const onChangeText = useCallback(
    (newTextValue) => setCodeText(newTextValue),
    [codeText]
  );

  useEffect(() => {
    const verifyCodeProcess = async (code: string, phone: string) => {
      try {
        const { token, user } = await verifySmsCode({ phone, code });

        await storageService.setToken(token);
        dispatch(userActions.loginUserAsync.success(user));

        return navigation.dispatch(RemoveLastTwoAndAddGoTo(goTo));
      } catch (error) {
        Alert.alert("Mal Codigo, Intentalo de nuevo");
      }
    };

    if (codeText.length === 6) {
      verifyCodeProcess(codeText, phone);
    }
  }, [codeText]);

  return <VerifyCodeScreen onChangeText={onChangeText} />;
};

export default VerifyCodeScreenContainer;
