import { Reducer } from "react";
const basicReducer: Reducer<any, any> = (state: object, newState: object) => {
  return { ...state, ...newState };
};

export default { basicReducer };
