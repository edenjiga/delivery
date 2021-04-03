import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  onPress(): void;
};

const NotLogin: FC<Props> = ({ onPress }) => (
  <View style={style.viewContainer}>
    <View style={style.firstView}>
      <Text style={style.welcomeText}>!Bienvenido¡</Text>
    </View>
    <View style={style.secondView}>
      <Pressable style={style.pressable} onPress={onPress}>
        <Text style={style.pressableText}>Registrarme</Text>
      </Pressable>
      <Pressable style={style.pressable} onPress={onPress}>
        <Text style={style.pressableText}>Iniciar sesión</Text>
      </Pressable>
    </View>
  </View>
);

const style = StyleSheet.create({
  firstView: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    height: '50%',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 7,
    height: 28,
    justifyContent: 'center',
    width: 132,
  },
  pressableText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  secondView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: '50%',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    height: '100%',
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotLogin;
