import { all } from 'redux-saga/effects';
import loginSaga from './user/loginSaga';
import orderPlacementSaga from './orderPlacement/saga';

export default function* RootSaga() {
  while (true) {
    try {
      yield all([
        loginSaga(),
        orderPlacementSaga(),
      ]);
    } catch (ex) {
      console.error(ex);
    }
  }
}
