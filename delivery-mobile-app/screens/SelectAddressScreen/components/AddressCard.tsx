import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  name: string;
  nomenclature: string;
  selected?: boolean;
  onPress(): void;
};

const AddressCard: FC<Props> = ({ name, nomenclature, selected, onPress }) => (
  <View style={style.container}>
    <TouchableOpacity style={style.elementView} onPress={onPress}>
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
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  elementView: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    minHeight: 70,
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 50,
    height: 25,
    width: 25,
  },
  dotView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 15,
  },
  greenDot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    borderRadius: 50,
    height: 25,
    width: 25,
  },
  witheDot: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  nameText: {
    marginBottom: 3,
    fontWeight: 'bold',
  },
  nomenclatureText: {
    color: Colors.darkGrey,
  },
});

export default AddressCard;
