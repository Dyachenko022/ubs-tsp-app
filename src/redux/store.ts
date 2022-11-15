import { Action, AnyAction, applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import themeReducer from './theme/reducer';
import accountsReducer from './accounts/reducer';
import userReducer from './user/reducer';
import settingsReducer from './settings/reducer';
import globalPopupReducer from './globalPopup/reducer';
import historyReducer from './history/reducer';
import subscriptionReducer from './subscription/reducer';
import subscriptionCreateReducer from './subscriptionCreate/reducer';
import documentReducer from './document/reducer';
import orderPlacementReducer from './orderPlacement/reducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './rootSaga';
import globalLoaderReducer from './globalLoader/reducer';
import messagesReducer from './messages/reducer';
import settingsFrontReducer from './settingsFront/reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  theme: themeReducer,
  settingsFront: settingsFrontReducer,
  accounts: accountsReducer,
  user: userReducer,
  settings: settingsReducer,
  globalPopup: globalPopupReducer,
  history: historyReducer,
  subscriptions: subscriptionReducer,
  subscriptionCreate: subscriptionCreateReducer,
  messages: messagesReducer,
  document: documentReducer,
  globalLoader: globalLoaderReducer,
  orderPlacement: orderPlacementReducer,
});

type StateType = ReturnType<typeof rootReducer>;
type DispatchFunctionType = ThunkDispatch<StateType, undefined, AnyAction>

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware<DispatchFunctionType, StateType>(thunkMiddleware, sagaMiddleware, logger)
);

sagaMiddleware.run(RootSaga);

export type IReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<IReduxState, void, Action>;
