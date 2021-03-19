import RequestStatus from "@/constants/RequestStatus";
import SCREEN_NAMES from "@/constants/screenNames";
import { RootState } from "@/store";
import { RootStackParamList } from "@/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import OrderScreen from "./OrderScreen";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.ORDER>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.ORDER>;
}

export default ({ navigation }: Props) => {
  const { user } = useSelector<RootState, RootState>((state) => state);
  const { loadingStatus, data: userData } = user;

  useEffect(() => {
    const goTo = SCREEN_NAMES.ORDER;
    if (loadingStatus !== RequestStatus.REQUEST_LOADED) {
      return navigation.replace(SCREEN_NAMES.LOGIN, {
        goTo,
      });
    }

    if (!userData.name || !userData.email || !userData.identification) {
      return navigation.replace(SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM, {
        goTo,
      });
    }
  }, []);
  return <OrderScreen />;
};
