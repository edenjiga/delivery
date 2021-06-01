import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import address from './address';
import cart from './cart';
import orders from './orders';
import modal from './modal';
import settings from './settings';
import user from './user';
const rootReducer = combineReducers({
  address,
  cart,
  modal,
  orders,
  settings,
  user,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
