import { all, fork } from 'redux-saga/effects';
import ordersSaga from './orders';
import { sagaMiddleware } from '../index';
export default function* rootSaga() {
  yield all([fork(ordersSaga)]);
}

sagaMiddleware.run(rootSaga);
