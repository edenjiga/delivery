import { Reducer } from 'react';
const basicReducer: Reducer<any, any> = (state: any, newState: any) => {
  return { ...state, ...newState };
};

export default { basicReducer };
