import React from "react";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native";
import RequestStatus from "@/constants/RequestStatus";
type Props = {
  onPressLogOut(): void;
  loadingStatus: RequestStatus;
};
export default ({ onPressLogOut, loadingStatus }: Props) => (
  <View style={{ marginTop: 10 }}>
    <Text>Account Screen</Text>

    {loadingStatus === RequestStatus.REQUEST_LOADED && (
      <Button title="Cerrar sesion" onPress={onPressLogOut}></Button>
    )}
  </View>
);
