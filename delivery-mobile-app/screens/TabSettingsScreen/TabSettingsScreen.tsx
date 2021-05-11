import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
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
        <GoBackButton title="Configuración" viewStyles={styles.goBackButton} />
        <View style={styles.userInfo}>
          <View style={styles.user}>
            <View style={styles.imageCont}>
              <Image
                style={styles.userImage}
                resizeMode={'contain'}
                source={require('assets/images/kangaroo.png')}
              ></Image>
            </View>
            <View style={styles.textCont}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userMail}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.userEdit}>
            <TouchableOpacity onPress={onGoToEditUserInfo}>
              <Image
                style={styles.edit}
                resizeMode={'contain'}
                source={require('assets/images/edit.png')}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.info}>
          <TouchableOpacity onPress={onGoToSelectAddress}>
            <View style={styles.addressCont}>
              <View style={styles.address}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={require('assets/images/marker.png')}
                ></Image>
                <Text style={styles.adressText}>Mis direcciones </Text>
              </View>
              <View>
                <Image
                  style={styles.icon}
                  resizeMode={'contain'}
                  source={require('assets/images/back.png')}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <TouchableOpacity onPress={onGoToMyOrders}>
            <View style={styles.addressCont}>
              <View style={styles.address}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={require('assets/images/list.png')}
                ></Image>
                <Text style={styles.adressText}>Mis órdenes </Text>
              </View>
              <View>
                <Image
                  style={styles.icon}
                  resizeMode={'contain'}
                  source={require('assets/images/back.png')}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <TouchableOpacity
            onPress={() => {
              console.log('You tapped the button!');
            }}
          >
            <View style={styles.addressCont}>
              <View style={styles.address}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={require('assets/images/question.png')}
                ></Image>
                <Text style={styles.adressText}>Opiniones y/o Sugerencias</Text>
              </View>
              <View>
                <Image
                  style={styles.icon}
                  resizeMode={'contain'}
                  source={require('assets/images/back.png')}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text style={styles.contact}>Contáctanos</Text>
          <View style={styles.socialMedia}>
            <Image
              style={styles.mediaImage}
              resizeMode={'contain'}
              source={require('assets/images/whatsapp.png')}
            ></Image>
            <Image
              style={styles.mediaImage}
              resizeMode={'contain'}
              source={require('assets/images/instagram.png')}
            ></Image>
            <Image
              style={styles.mediaImage}
              resizeMode={'contain'}
              source={require('assets/images/gmail.png')}
            ></Image>
          </View>
          <Text style={styles.web}>www.kangaroo.co</Text>
        </View>

        {loadingStatus === RequestStatus.REQUEST_LOADED && (
          <View style={styles.logout}>
            <TouchableOpacity style={styles.buttonAdd} onPress={onPressLogOut}>
              <Text style={styles.addText}>Cerrar sesión</Text>
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
    flex: 1,
  },
  goBackButton: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
  userInfo: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  user: {
    minWidth: 280,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCont: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.whiteGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  userImage: {
    width: 45,
    height: 45,
  },
  textCont: {
    maxWidth: 220,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  userMail: {
    fontSize: 13,
    color: Colors.darkGrey,
  },
  userEdit: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: 22,
    height: 22,
  },
  info: {
    top: 15,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginBottom: 10,
  },
  addressCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
  },
  adressText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    marginLeft: 10,
    color: Colors.darkGrey,
  },
  icon: {
    width: 18,
    height: 18,
    transform: [{ rotate: '180deg' }],
  },
  contact: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    color: Colors.darkGrey,
  },
  socialMedia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  mediaImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  web: {
    textAlign: 'center',
    color: Colors.darkGrey,
    fontSize: 16,
    marginTop: 15,
  },
  logout: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    paddingVertical: 10,
    minWidth: 180,
    minHeight: 40,
    justifyContent: 'center',
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TabsSettingsScreen;
