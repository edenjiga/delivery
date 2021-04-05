import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import cart from './cart';
import user from './user';
import orders from './orders';
const rootReducer = combineReducers({
  cart,
  orders,
  user,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
