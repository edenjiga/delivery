import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  name: string;
  nomenclature: string;
  selected?: boolean;
  onPress(): void;
};

const AddressCard: FC<Props> = ({ name, nomenclature, selected, onPress }) => (
  <Pressable style={style.elementView} onPress={onPress}>
    <View style={style.dotView}>
      {selected ? (
        <View style={style.greenDot}></View>
      ) : (
        <View style={style.dot}>
          <View style={style.witheDot}></View>
        </View>
      )}
    </View>
    <View>
      <Text style={style.nameText}>{name.toUpperCase()}</Text>
      <Text style={style.nomenclatureText}>{nomenclature}</Text>
    </View>
  </Pressable>
);

const style = StyleSheet.create({
  dotView: { width: '20%', alignItems: 'center', justifyContent: 'center' },
  dot: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 50,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  elementView: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    flexDirection: 'row',
    height: 70,
    marginTop: 11,
    width: '90%',
  },
  greenDot: {
    alignItems: 'center',
    backgroundColor: Colors.greenlight,
    borderRadius: 50,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  nameText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 7,
  },
  nomenclatureText: {
    fontSize: 13,
    marginTop: 4,
  },
  witheDot: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
});

export default AddressCard;
