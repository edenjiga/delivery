import { ActionType, createReducer } from 'typesafe-actions';
import * as addressActions from '@/store/actions/address';
import { Address } from '@edenjiga/delivery-common';

type Action = ActionType<typeof addressActions>;

const initialState: Address = {
  name: '',
  note: '',
  nomenclature: '',
  coordinates: {
    latitude: '',
    longitude: '',
  },
};

const reducer = createReducer<Address, Action>(initialState)
  .handleAction(addressActions.setAddress, (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  })
  .handleAction(addressActions.clearAddress, () => {
    return initialState;
  });

export default reducer;
