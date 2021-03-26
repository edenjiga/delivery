import React from "react";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import RequestStatus from "@/constants/RequestStatus";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Address } from "@edenjiga/delivery-common";
type Props = {
  address: Address | null;
  onPressLogOut(): void;
  loadingStatus: RequestStatus;
  onGoToSelectAddress(): void;
};
export default ({
  onPressLogOut,
  onGoToSelectAddress,
  loadingStatus,
  address,
}: Props) => (
  <View style={{ marginTop: 20 }}>
    <Text>Account Screen</Text>

    <TouchableHighlight activeOpacity={0.9} onPress={onGoToSelectAddress}>
      <View>
        <Text>Direccion</Text>
        <Text>{address?.nomenclature}</Text>
      </View>
    </TouchableHighlight>
    {loadingStatus === RequestStatus.REQUEST_LOADED && (
      <Button title="Cerrar sesion" onPress={onPressLogOut}></Button>
    )}
  </View>
);
