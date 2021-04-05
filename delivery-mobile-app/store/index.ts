import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers, { RootState } from './reducers';
// import rootSaga from "./sagas";
export { RootState };

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);
