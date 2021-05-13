import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import address from './address';
import cart from './cart';
import user from './user';
import orders from './orders';
import modal from './modal';
const rootReducer = combineReducers({
  address,
  cart,
  modal,
  orders,
  user,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
