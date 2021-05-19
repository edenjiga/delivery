import React from 'react';
import { LocationForm } from '@/components';
import { Address } from '@edenjiga/delivery-common';

type Props = {
  onSubmit(data: Address): void;
};

export default ({ onSubmit }: Props) => <LocationForm onSubmit={onSubmit} />;
