/* eslint-disable @typescript-eslint/ban-ts-comment,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-assignment
*/
// @ts-nocheck

import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { getAccounts } from '../accounts/actions';
import { takeLatest, call, take, all, put, putResolve, delay } from 'redux-saga/effects';
import { goBack, navigate, reset } from '../../rootNavigation';
import { AUTH_SELECT_CONTRACT } from './types';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAbonentToList, getAbonentsList, removeAbonentFromListById } from '../../utils/settingsHelper';
import { errorPopupHelper, showErrorPopup, showPopup } from '../globalPopup/actions';
import { setJwt } from '../../utils/apiFabric';
import { IAuthCodeRes, IAuthContractRes, IParamContractClientRes } from './api';
import { setNds } from '../settings/actions';
import { getDocuments } from '../history/actions';
import { actions as messagesActions } from '../messages/reducer';
import { isAfter, parse } from 'date-fns';
import { Alert } from 'react-native';
import { getSubscriptions } from '../subscription/actions';


function* loginSaga(action: any) {
  const { login, password } = action.payload;

  let loginResponse: api.IAuthBaseRes;
  try {
    navigate('GlobalLoader');
    loginResponse = (yield call(api.authBase, login, password)) as api.IAuthBaseRes;
    setJwt(loginResponse.jwt);
  } catch (e) {
    yield put(errorPopupHelper(e));
    return;
  } finally {
    goBack();
  }

  navigate('SelectTspScreen', { contracts: loginResponse.contracts});

  const pll = yield take(AUTH_SELECT_CONTRACT);
  const contractId = (pll.payload.id) as number;

  // Если мы уже заходили за этого абонента и за этот договор, то пойдем не регистрироваться, а заходить в ТСП
  const abonentsList: AbonentListEntry[] = yield call(getAbonentsList);
  const abonent = abonentsList.find((abonent) => abonent.login === login && abonent.contractId === contractId);
  if (abonent) {
    yield proceedLogin(abonent.contractId);
    return;
  }

  const contractData = (yield call(api.authContract, contractId)) as api.IAuthContractRes;
  yield changePasswordIdNeededSaga(contractData);

  yield putResolve(actions.getCodeSms());
  navigate('ConfirmSmsScreen', { mode: 'registerApp' });

  yield askSmsCodeUntilSuccess();

  navigate('CodeEnterScreen');

  let code = '';
  const uid = `${DeviceInfo.getUniqueId()}-${login as string}`;
  while(true) {
    try {
      code = (yield take(types.SET_SHORT_CODE)).payload.code;
      let deviceName: string = yield call(DeviceInfo.getDeviceName);
      // Для того, чтобы при отладке не было ошибки "Устройство уже зарегестрированно"
      if (__DEV__) {
        deviceName = deviceName + (Math.random() * 10000.0).toString();
      }
      if (code) {
        yield call(api.registrationApp, uid, deviceName, code);
      }
      break;
    } catch (e) {
      yield put(errorPopupHelper(e));
    }
  }

  void AsyncStorage.setItem('contractId', contractId.toString());
  void AsyncStorage.setItem('uid', uid);

  yield putResolve(actions.setShortCodeUsed(!!code));
  void addAbonentToList(contractData.nameabonent, login, contractId, uid, !!code);

  if (!code) {
    // Если при регистрации не задали код, то сразу входим в приложение
    yield proceedLogin(contractId);
    return;
  }
  reset('AuthScreen');
}

function* askSmsCodeUntilSuccess() {
  let codeMistake = true;
  do {
    const res = yield take(types.CONFIRM_CODE);
    try {
      yield call(api.confirm, res.payload.code);
      codeMistake = false;
    } catch (e) {
      yield put(errorPopupHelper(e));
    }
  } while (codeMistake);
}

function* loginWithCode(action: any) {
  const { code, resolve, reject } = action.payload;
  let contractId = 0;
  try {
    navigate('GlobalLoader');
    const uid: string = yield call(AsyncStorage.getItem, 'uid');
    contractId = Number.parseInt(yield call(AsyncStorage.getItem, 'contractId'));
    const jwt = ((yield call(api.authCode, uid, code)) as IAuthCodeRes).jwt;
    setJwt(jwt);
    yield proceedLogin(contractId);
    resolve();
  } catch (e) {
    goBack();
    if (e.codeResult === 254) {
      yield call(AsyncStorage.removeItem, 'uid');
      yield call(AsyncStorage.removeItem, 'contractId');
      if (contractId) {
        yield call(removeAbonentFromListById, contractId);
      }
      yield putResolve(actions.setShortCodeUsed(false));
      yield put(showPopup(e.message));
      return;
    }
    yield put(showErrorPopup(e));
    reject();
  }
}

function* proceedLogin(contractId: string) {
  try {
    const contractData = (yield call(api.authContract, contractId)) as IAuthContractRes;

    yield changePasswordIdNeededSaga(contractData, true);

    reset('LoadingScreen');

    const paramContractClient = (yield call(api.paramContractClient)) as IParamContractClientRes;
    yield put(actions.setUserInfo(contractData.regimeaccess, contractData.nameabonent, paramContractClient));
    yield putResolve(actions.getPhotoAbonent());
    yield putResolve(getAccounts());
    yield putResolve(getDocuments());
    yield putResolve(getSubscriptions());
    yield putResolve(messagesActions.getMessages());
    yield put(setNds(paramContractClient.setNds, paramContractClient.listNds));

    yield delay(1000);
    reset('MyTspScreen');
  } catch (e) {
    reset('AuthScreen');
    throw e;
  }
}

function* changePasswordIdNeededSaga(contractData: IAuthContractRes, isLoaderShown = false) {
  if (contractData.changePassword === 1) {
    if (isLoaderShown) goBack();
    yield call(changePassword);
  } else {
    const dateChangePass = parse(contractData.expireDatePassword, 'dd.MM.yyyy\'T\'HH:mm:ss', new Date());
    if (dateChangePass.getFullYear() === 2222)  { return; }

    const userMustChangePassword = isAfter(new Date(), dateChangePass);

    const userWantToChangePass = yield call(askToChangePassword, userMustChangePassword);
    if (userWantToChangePass) {
      if (isLoaderShown) goBack();
      yield call(changePassword);
    } else {
      // Если пользователь должен поменять пароль, но не хочет, то прекращаем вход
      if (userMustChangePassword) {
        reset('AuthScreen');
        throw new Error('Необходимо сменить пароль!');
      }
    }
  }
}

function changePassword() {
  return new Promise((resolve) => {
    navigate('ChangePasswordScreen', { fromLoginSaga: true, successCallback: () => resolve() });
  });
}

function askToChangePassword(userMustChangePassword: boolean) {
  return new Promise((resolve) => {
    Alert.alert('Предупреждение', `${userMustChangePassword ? 
      'Срок действия пароля истек' : 'Срок действия пароля подходит к концу'}. Вы хотите сменить пароль?`, [
      {
        text: 'Сменить пароль',
        onPress: () => resolve(true),
      }, {
        text:  userMustChangePassword ? 'Отмена' : 'Продолжить',
        onPress: () => resolve(false),
      }
    ]);
  });
}

export default function* LoginSagaWatch() {
  yield all ([
    takeLatest(types.AUTH_LOGIN_PASSWORD, loginSaga),
    takeLatest(types.AUTH_LOGIN_CODE, loginWithCode),
  ]);
}
