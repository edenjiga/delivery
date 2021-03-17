import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import cart from "./cart";
import user from "./user";
const rootReducer = combineReducers({
  cart,
  user,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
