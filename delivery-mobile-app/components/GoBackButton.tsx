import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, View, ViewProps } from './Themed';
import Colors from '@/constants/Colors';

import orangeArrow from '@/assets/images/back.png';
import whiteBackArrow from '@/assets/images/backWhite.png';

type Props = {
  title?: string;
  viewStyles?: ViewProps['style'];
  backWitheArrow?: boolean;
};

const GoBackButton: FC<Props> = ({ backWitheArrow, title, viewStyles }) => {
  const navigation = useNavigation();

  return (
    <View style={[style.container, viewStyles]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={style.imageBack}>
          <Image
            style={style.backBnt}
            resizeMode="contain"
            source={backWitheArrow ? whiteBackArrow : orangeArrow}
          />
        </View>
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  imageBack: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  backBnt: {
    height: 23,
    width: 23,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'latoBold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
});

export default GoBackButton;
