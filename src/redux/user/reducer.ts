import * as types from './types';
import { setUserInfo } from './actions';

interface IState {
  avatar: string,
  name: string,
  organization: string,
  address: string,
  sbpId: string,
  tspName: string,
  regimeAccess: RegimeAccess,
  shortCodeUsed: boolean,
  confirmCodeSms: {
    timeToLive: number,
    dateGenerate: string,
    phoneSending: string,
  },
}

const initialState: IState = {
  avatar: '',
  name: '',
  organization: '',
  address: '',
  sbpId: '',
  tspName: '',
  regimeAccess: 'Кассир',

  shortCodeUsed: false,
  confirmCodeSms: {
    timeToLive: 5,
    dateGenerate: '',
    phoneSending: '',
  },
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_CODE_SMS_REQ_SUC: {
      return {
        ...state,
        confirmCodeSms: {
          timeToLive: action.payload.timeToLive as number,
          dateGenerate: action.payload.dateGenerate as string,
          phoneSending: action.payload.phoneSending as string,
        },
      };
    }
    case types.SET_SHORT_CODE_USED:
      return {
        ...state,
        shortCodeUsed: action.payload.used as boolean,
      };
    case types.SET_USER_INFO: {
      const userInfoPayload = (action as ReturnType<typeof setUserInfo>).payload;
      return {
        ...state,
        name: userInfoPayload.name,
        regimeAccess: userInfoPayload.regimeAccess,
        organization: userInfoPayload.organization,
        address: userInfoPayload.address,
        sbpId: userInfoPayload.sbpId,
        tspName: userInfoPayload.tspName,
      };
    }
    case types.SET_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar as string,
      };
    default:
      return state;
  }
}
