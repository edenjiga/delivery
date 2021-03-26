import { Address } from "@edenjiga/delivery-common";
import React, { useCallback } from "react";
import AddAddressScreen from "./AddAddressScreen";

const AddAddressScreenContainer = () => {
  const onSubmit = useCallback((address: Address) => {}, []);

  return <AddAddressScreen onSubmit={onSubmit} />;
};

export default AddAddressScreenContainer;
