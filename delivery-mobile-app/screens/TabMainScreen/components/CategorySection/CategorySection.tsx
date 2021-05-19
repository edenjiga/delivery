import React, { FC } from 'react';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { Category } from './components';

import Licor from '@/assets/images/glass-bottles-of-beer-with-glass-and-ice-on-dark-background.png';
import Chips from '@/assets/images/top-view-different-kind-chips-texture-horizontal.png';
import Cigarrete from '@/assets/images/cigarette.png';
import { PRODUCT_CATEGORY } from '@edenjiga/delivery-common';

const CategorySection: FC = () => (
  <View style={style.container}>
    <View style={style.containers}>
      <Category
        name="licores"
        imageSource={Licor}
        category={PRODUCT_CATEGORY.ALCOHOL}
      />
      <Category
        name="pasabocas"
        imageSource={Chips}
        category={PRODUCT_CATEGORY.MECCATOS}
      />
      <Category
        name="cigarrillos"
        imageSource={Cigarrete}
        category={PRODUCT_CATEGORY.CIGARETTES}
      />
      <Category
        name="Otros"
        imageSource={Cigarrete}
        category={PRODUCT_CATEGORY.OTHERS}
      />
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CategorySection;
