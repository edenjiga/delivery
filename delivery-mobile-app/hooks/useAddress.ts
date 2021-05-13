import { RootState } from '@/store';
import storageService from '@/utils/storageService';
import { Address } from '@edenjiga/delivery-common';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as addressActions from '@/store/actions/address';

const useAddress = () => {
  const dispatch = useDispatch();
  const address = useSelector<RootState, Address>((state) => state.address);

  const setAddress = useCallback(
    async (newAddress: Address) => {
      await storageService.setAddress(newAddress);
      dispatch(addressActions.setAddress(newAddress));
    },
    [dispatch],
  );

  return { address, setAddress };
};

export default useAddress;
