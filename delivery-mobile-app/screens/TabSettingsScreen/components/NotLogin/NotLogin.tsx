import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  onPress(): void;
};

const NotLogin: FC<Props> = ({ onPress }) => (
  <View style={style.viewContainer}>
    <View style={style.firstView}>
      <Text style={style.welcomeText}>Bienvenido!</Text>
    </View>
    <View style={style.searchBox}>
      <Image
        style={style.search}
        resizeMode="contain"
        source={require('assets/images/kangaroo_empty.png')}
      />
      <View style={style.infoText}>
        <Text style={style.title}>
          Súper <Text style={style.span}>APP</Text>
        </Text>
        <Text style={style.text}>
          App millonaria de campeones para campeones
        </Text>
      </View>
    </View>
    <View style={style.secondView}>
      <TouchableOpacity style={style.pressable} onPress={onPress}>
        <Text style={style.pressableText}>Registrarme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.pressable} onPress={onPress}>
        <Text style={style.pressableText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const style = StyleSheet.create({
  firstView: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    height: '50%',
    paddingTop: 80,
  },
  pressable: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 6,
    height: 36,
    justifyContent: 'center',
    width: 130,
  },
  pressableText: {
    color: Colors.white,
    fontSize: 14,
  },
  secondView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '50%',
    justifyContent: 'space-evenly',
    marginTop: 80,
  },
  viewContainer: {
    flex: 1,
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    position: 'absolute',
    top: '25%',
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  search: {
    width: 260,
    height: 260,
  },
  infoText: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.orange,
    marginBottom: 5,
  },
  span: {
    color: Colors.violet,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default NotLogin;
