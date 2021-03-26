import SCREEN_NAMES from "@/constants/screenNames";
import useUserFromRedux from "@/hooks/useUserFromRedux";
import { RootStackParamList } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useCallback, useMemo } from "react";
import SelectAddressScreen from "./SelectAddressScreen";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const SelectAddressScreenContainer: FC<Props> = ({ navigation }) => {
  const { data } = useUserFromRedux();

  const actions = useMemo(
    () => [
      {
        text: "Agregar direccion",
        //   icon: require("./images/ic_language_white.png"),
        name: "add_address",
        position: 1,
      },
    ],
    []
  );

  const onPressItem = useCallback((name: string | undefined) => {
    navigation.navigate(SCREEN_NAMES.ADD_ADDRESS);
  }, []);

  return <SelectAddressScreen actions={actions} onPressItem={onPressItem} />;
};

export default SelectAddressScreenContainer;
