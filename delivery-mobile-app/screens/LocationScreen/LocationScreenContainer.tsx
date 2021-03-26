import React, { FC } from "react";
import LocationScreen from "./LocationScreen";
import { Address } from "@edenjiga/delivery-common";
import storageService from "@/utils/storageService";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types";
import SCREEN_NAMES from "@/constants/screenNames";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.LOCATION>;
}

const LocationScreenContainer: FC<Props> = ({ navigation }) => {
  const onSubmit = async (data: Address) => {
    try {
      await storageService.setAddress(data);
      navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      Alert.alert("Ups something fail");
      console.error(error);
    }
  };

  return <LocationScreen onSubmit={onSubmit} />;
};

export default LocationScreenContainer;
