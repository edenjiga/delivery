import { LocationFormValues } from "@/types";
import { checkField } from "@/utils/checkField";
import { loaderService } from "@/utils/loader";
import { getLocation } from "@/utils/location";
import useReducerHelper from "@/utils/useReducerHelper";
import { Address } from "@edenjiga/delivery-common";
import React, { FC, useEffect, useReducer } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { Region } from "react-native-maps";
import LocationForm from "./LocationForm";

type Props = {
  onSubmit(data: Address): void;
};

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

const LocationFormContainer: FC<Props> = ({ onSubmit }) => {
  const { handleSubmit, register, setValue } = useForm<LocationFormValues>();
  const [state, setState] = useReducer(
    useReducerHelper.basicReducer,
    initialState
  );

  const { coords, currentCoords, isReady }: IState = state;

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

  //Register form use effect
  useEffect(() => {
    register("note", {
      required: { value: true, message: "Instrucciones son requeridas" },
    });
    register("nomenclature", {
      required: { value: true, message: "Direccion es requerida" },
    });
    register("name", { required: false });
  }, [register]);

  const onRegionChangeComplete = (region: Region) => {
    try {
      setState({ currentCoords: region });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitForm: SubmitHandler<LocationFormValues> = async (data) => {
    if (!checkField(currentCoords)) {
      return;
    }

    onSubmit({ ...data, coordinates: currentCoords });
  };

  const onError: SubmitErrorHandler<LocationFormValues> = (errors) => {
    const message = Object.values(errors).reduce(
      (prevValue, field) => `${prevValue}\n${field?.message}`,
      ""
    );

    Alert.alert(message);
  };

  return isReady ? (
    <LocationForm
      coords={coords}
      onSubmit={handleSubmit(onSubmitForm, onError)}
      onRegionChangeComplete={onRegionChangeComplete}
      setValue={setValue}
    />
  ) : null;
};

export default LocationFormContainer;
