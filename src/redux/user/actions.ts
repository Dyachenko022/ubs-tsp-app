import * as types from './types';
import * as api from './api';
import DeviceInfo from 'react-native-device-info';
import { AppDispatch } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setJwt } from '../../utils/apiFabric';
import { confirmRestoreAccess, IParamContractClientRes } from './api';
import { SET_AVATAR } from './types';
import { goBack, navigate, reset } from '../../rootNavigation';
import { showErrorPopup } from '../globalPopup/actions';
import { withLoaderModal } from '../../utils/withLoaderModal';
import { Alert } from 'react-native';
import { removeAbonentFromList } from '../../utils/settingsHelper';

export function getCodeSms() {
  return async (dispatch: AppDispatch) => {
    const getCodeSmsResponse = await api.getCodeSms(DeviceInfo.getDeviceType(), DeviceInfo.getDeviceNameSync());
    const { phoneSending, liveTime, dateGenerate } = getCodeSmsResponse;
    dispatch({ type: types.GET_CODE_SMS_REQ_SUC, payload: {
      phoneSending, liveTime, dateGenerate
    }});
  };
}

export function confirmCode(code: string) {
  return {
    type: types.CONFIRM_CODE,
    payload: {
      code,
    }
  };
}

export function setShortCode(code: string) {
  return {
    type: types.SET_SHORT_CODE,
    payload: {
      code,
    }
  };
}

export function setShortCodeUsed(used: boolean) {
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.setItem('isCodeUsed', used ? '1' : '0');
    dispatch({
      type: types.SET_SHORT_CODE_USED,
      payload: {
        used,
      }
    });
  };
}

export function loginWithCode(code: string) {
  return (dispatch: AppDispatch) =>
    new Promise((resolve, reject) => {
      dispatch({
        type: types.AUTH_LOGIN_CODE,
        payload: {
          code,
          resolve,
          reject,
        }
      });
    });
}

export function logout() {
  return (dispatch: AppDispatch) => {
    setJwt('');
    reset('AuthScreen');
  };
}

export function setUserInfo(regimeAccess: RegimeAccess, abonentName: string, userInfo: IParamContractClientRes) {
  return {
    type: types.SET_USER_INFO,
    payload: {
      regimeAccess,
      name: abonentName,
      organization: userInfo.clientName,
      address: userInfo.addressReg,
      sbpId: userInfo.idTspSbp,
      tspName: userInfo.nameTSP,
    }
  };
}

export function getPhotoAbonent() {
  return async (dispatch: AppDispatch) => {
    const { foto } = await api.getPhotoAbonent();
    dispatch({
      type: SET_AVATAR,
      payload: {
        avatar: foto,
      }
    });
  };
}

export function restoreAccess(phone: string, login: string, inn: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await withLoaderModal(api.restoreAccess(phone, login, inn));
      setJwt(response.jwt);
      const { phoneSending, liveTime, dateGenerate } = response;
      dispatch({ type: types.GET_CODE_SMS_REQ_SUC, payload: {
        phoneSending, liveTime, dateGenerate
      }});
      navigate('ConfirmSmsScreen', { mode: 'forgotPassword', phone, login, inn });
    } catch (e) {
      dispatch(showErrorPopup(e));
    }
  };
}

export function restoreAccessConfirm(login: string, smsCode: string) {
  return async (dispatch: AppDispatch) => {
    try {
      await withLoaderModal(api.confirmRestoreAccess(smsCode));
      await removeAbonentFromList(login);
      await AsyncStorage.setItem('contractId', '');
      await AsyncStorage.setItem('uid', '');
      reset('AuthScreen');
      Alert.alert('Временный пароль был выслан Вам в СМС сообщении', 'Используйте его для входа в систему');
    } catch (e) {
      dispatch(showErrorPopup(e));
    }
  };
}
