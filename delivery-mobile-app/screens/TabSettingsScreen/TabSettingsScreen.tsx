import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import {
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import RequestStatus from '@/constants/RequestStatus';
import { Address } from '@edenjiga/delivery-common';
import { NotLogin } from './components';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

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
      <View style={styles.container}>
        <GoBackButton backWitheArrow={true} viewStyles={styles.goBackButton} />
        <View style={styles.info}>
          <TouchableOpacity onPress={onGoToSelectAddress}>
            <View style={styles.adress}>
              <Text style={styles.adressText}>Dirección: </Text>
              <Text style={styles.adressText}>{address?.nomenclature}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonAdd} onPress={onGoToMyOrders}>
          <Text style={styles.addText}>Mis ordenes</Text>
        </TouchableOpacity>
        {loadingStatus === RequestStatus.REQUEST_LOADED && (
          <View style={styles.logout}>
            <TouchableOpacity style={styles.buttonAdd} onPress={onPressLogOut}>
              <Text style={styles.addText}>Cerrar sesion</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return <NotLogin />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  goBackButton: {
    backgroundColor: Colors.orange,
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  adress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  adressText: {
    fontSize: 15,
    marginRight: 5,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 50,
    marginTop: 30,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 20,
  },
});

export default TabsSettingsScreen;
