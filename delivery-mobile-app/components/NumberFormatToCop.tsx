import { formatNumberToCop } from '@/utils/number';
import React, { FC } from 'react';
import { Text, TextProps } from './Themed';

type Props = {
  number: number;
} & TextProps;

const NumberFormatToCop: FC<Props> = ({ number, ...otherProps }) => (
  <Text {...otherProps}>${formatNumberToCop(number)}</Text>
);
export default NumberFormatToCop;
