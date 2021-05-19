import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import RequestStatus from '@/constants/RequestStatus';
import { UserPublicFields } from '@edenjiga/delivery-common';
import { NotLogin } from './components';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';
import environment from '@/environment';

type Props = {
  onPressLogOut(): void;
  loadingStatus: RequestStatus;
  onGoToSelectAddress(): void;
  onGoToEditUserInfo(): void;
  onGoToMyOrders(): void;
  onGoToSuggestionScreen(): void;
  user: UserPublicFields;
};

const TabsSettingsScreen: FC<Props> = ({
  loadingStatus,
  onPressLogOut,
  onGoToSelectAddress,
  onGoToEditUserInfo,
  onGoToMyOrders,
  onGoToSuggestionScreen,
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
                source={require('assets/images/kangaroo_profile.png')}
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
          <TouchableOpacity onPress={onGoToSuggestionScreen}>
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
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=${environment.whatappDefaultText}&phone=${environment.whatsappNumber}`,
                )
              }
            >
              <Image
                style={styles.mediaImage}
                resizeMode={'contain'}
                source={require('assets/images/whatsapp.png')}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`instagram://${environment.instagramUrl}`)
              }
            >
              <Image
                style={styles.mediaImage}
                resizeMode={'contain'}
                source={require('assets/images/instagram.png')}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${environment.email}`)}
            >
              <Image
                style={styles.mediaImage}
                resizeMode={'contain'}
                source={require('assets/images/gmail.png')}
              ></Image>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 280,
  },
  imageCont: {
    borderRadius: 60,
    backgroundColor: Colors.whiteGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 65,
    height: 65,
  },
  textCont: {
    justifyContent: 'center',
    maxWidth: 220,
    paddingHorizontal: 15,
  },
  userName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  userMail: {
    color: Colors.darkGrey,
    fontSize: 13,
  },
  userEdit: {
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 34,
    flexDirection: 'row',
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  edit: {
    height: 22,
    width: 22,
  },
  info: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    top: 15,
  },
  addressCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 25,
    width: 25,
  },
  adressText: {
    color: Colors.darkGrey,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  icon: {
    height: 18,
    transform: [{ rotate: '180deg' }],
    width: 18,
  },
  contact: {
    color: Colors.darkGrey,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  socialMedia: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  mediaImage: {
    height: 50,
    marginHorizontal: 10,
    width: 50,
  },
  logout: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 50,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 180,
    paddingVertical: 10,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TabsSettingsScreen;
