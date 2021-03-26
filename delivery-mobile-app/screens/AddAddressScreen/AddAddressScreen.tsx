import { LocationForm } from "@/components";
import { Address } from "@edenjiga/delivery-common";
import React, { FC } from "react";

type Props = {
  onSubmit(addres: Address): void;
};

const AddAddressScreen: FC<Props> = ({ onSubmit }) => (
  <LocationForm onSubmit={onSubmit} />
);

export default AddAddressScreen;
