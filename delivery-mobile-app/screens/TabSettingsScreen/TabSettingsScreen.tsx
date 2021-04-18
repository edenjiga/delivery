import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity, StyleSheet } from 'react-native';
import RequestStatus from '@/constants/RequestStatus';
import { Address, UserPublicFields } from '@edenjiga/delivery-common';
import { NotLogin } from './components';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  address: Address | null;
  onPressLogOut(): void;
  loadingStatus: RequestStatus;
  onGoToSelectAddress(): void;
  onGoToEditUserInfo(): void;
  onGoToMyOrders(): void;
  user: UserPublicFields;
};

const TabsSettingsScreen: FC<Props> = ({
  address,
  loadingStatus,
  onPressLogOut,
  onGoToSelectAddress,
  onGoToEditUserInfo,
  onGoToMyOrders,
  user,
}) => {
  if (loadingStatus === RequestStatus.REQUEST_LOADED) {
    return (
      <View style={styles.container}>
        <GoBackButton backWitheArrow={true} viewStyles={styles.goBackButton} />
        <TouchableOpacity onPress={onGoToEditUserInfo}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <TouchableOpacity onPress={onGoToSelectAddress}>
            <View style={styles.address}>
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
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  address: {
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

  logout: {
    bottom: 0,
    marginBottom: 20,
    position: 'absolute',
    width: '100%',
  },
});

export default TabsSettingsScreen;
