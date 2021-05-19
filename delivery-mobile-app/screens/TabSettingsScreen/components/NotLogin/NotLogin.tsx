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
      <Text style={style.welcomeText}>¡Bienvenido!</Text>
    </View>
    <View style={style.logoBox}>
      <Image
        style={style.logo}
        resizeMode="contain"
        source={require('assets/images/logo_kangaroo.png')}
      />
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
    height: '40%',
    paddingTop: 100,
  },
  pressable: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    width: 180,
    marginBottom: 20,
  },
  pressableText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondView: {
    alignItems: 'center',
    top: 220,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  logoBox: {
    position: 'absolute',
    top: '28%',
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  logo: {
    width: 270,
    height: 270,
  },
});

export default NotLogin;
