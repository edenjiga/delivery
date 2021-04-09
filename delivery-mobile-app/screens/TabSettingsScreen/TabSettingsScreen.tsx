import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import RequestStatus from '@/constants/RequestStatus';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Address } from '@edenjiga/delivery-common';
import { NotLogin } from './components';
type Props = {
  address: Address | null;
  onPressLogOut(): void;
  loadingStatus: RequestStatus;
  onGoToSelectAddress(): void;
  onGoToMyOrders(): void;
};

const TabsSettingsScreen: FC<Props> = ({
  onPressLogOut,
  onGoToSelectAddress,
  onGoToMyOrders,
  loadingStatus,
  address,
}) => {
  if (loadingStatus === RequestStatus.REQUEST_LOADED) {
    return (
      <View>
        <Text>Account Screen</Text>

        <TouchableHighlight activeOpacity={0.9} onPress={onGoToSelectAddress}>
          <View>
            <Text>Direccion</Text>
            <Text>{address?.nomenclature}</Text>
          </View>
        </TouchableHighlight>

        <Button onPress={onGoToMyOrders} title="Mis ordenes"></Button>
        {loadingStatus === RequestStatus.REQUEST_LOADED && (
          <Button title="Cerrar sesion" onPress={onPressLogOut}></Button>
        )}
      </View>
    );
  }

  return <NotLogin />;
};
export default TabsSettingsScreen;
