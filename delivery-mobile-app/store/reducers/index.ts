import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import cart from './cart';
import user from './user';
import orders from './orders';
import modal from './modal';
const rootReducer = combineReducers({
  cart,
  orders,
  user,
  modal,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
