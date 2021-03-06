import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import cart from "./cart";
const rootReducer = combineReducers({
  cart,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
