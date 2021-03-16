import React, { FC, useEffect, useReducer, useState } from "react";
import LocationScreen from "./LocationScreen";
import { getLocation } from "@/utils/location";
import { SubmitHandler, useForm } from "react-hook-form";
import { Region } from "react-native-maps";
import useReducerHelper from "@/utils/useReducerHelper";
import { Address } from "@edenjiga/delivery-common";
import { checkField } from "@/utils/checkField";
import storageService from "@/utils/storageService";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types";
import SCREEN_NAMES from "@/constants/screenNames";
import { loaderService } from "@/utils/loader";

type FormValues = {
  note: string;
  direccion: string;
  name?: string;
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.LOCATION>;
}

interface IState {
  coords: {
    latitude: number;
    longitude: number;
  };
  currentCoords?: Address["coordinates"];
  isReady: boolean;
}

const initialState: IState = {
  coords: {
    latitude: 10.329696,
    longitude: -75.411985,
  },
  isReady: false,
};

const LocationScreenContainer: FC<Props> = ({ navigation }) => {
  const { handleSubmit, register, setValue } = useForm<FormValues>();

  const [state, setState] = useReducer(
    useReducerHelper.basicReducer,
    initialState
  );

  const { coords, currentCoords, isReady }: IState = state;

  //Register form use effect
  useEffect(() => {
    register("note", { required: true });
    register("direccion", { required: true });
    register("name", { required: false });
  }, [register]);

  useEffect(() => {
    const askForLocation = async () => {
      try {
        loaderService.show();
        const location = await getLocation();
        if (location?.coords) {
          const { coords } = location;
          setState({
            coords,
          });
        }
      } finally {
        setState({
          isReady: true,
        });
        loaderService.hide();
      }
    };
    askForLocation();
  }, []);

  const onRegionChangeComplete = (region: Region) => {
    try {
      setState({ currentCoords: region });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { direccion, note } = data;

    if (!checkField(currentCoords)) {
      return;
    }

    const address: Address = {
      nomenclature: direccion,
      note,
      coordinates: currentCoords,
    };
    try {
      await storageService.setAddress(address);
      navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      Alert.alert("Ups something fail");
      console.error(error);
    }
  };

  const onError = (errors: any) => {
    const requiredFields = Object.keys(errors).reduce(
      (prev, current) => `${prev}, ${current}`
    );
    Alert.alert(`Los campos: ${requiredFields} son requerido`);
  };

  return isReady ? (
    <LocationScreen
      coords={coords}
      onSubmit={handleSubmit(onSubmit, onError)}
      onRegionChangeComplete={onRegionChangeComplete}
      setValue={setValue}
    />
  ) : null;
};

export default LocationScreenContainer;
