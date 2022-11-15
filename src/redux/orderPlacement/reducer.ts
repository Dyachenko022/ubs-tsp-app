import * as actionTypes from './actions';
import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { setQrCode } from './actions';

interface IOrderPlacementReduxState {
  loading: boolean,
  items: IOrderEntry[],
  totalSum: number,
  ndsSum: number,
  qrCodeBase64: string,
  qrCodeStatus: 'pending' | 'success' | 'failure',
  paymentMode: 'qrCode' | 'cashLink',
  qrCodeFailureText: string,
}

const initialState: IOrderPlacementReduxState = {
  loading: false,
  items: [],
  totalSum: 0,
  ndsSum: 0,
  qrCodeBase64: '',
  qrCodeStatus: 'pending',
  qrCodeFailureText: '',
  paymentMode: 'qrCode',
};

export default function reducer(state = initialState, action: AnyAction): IOrderPlacementReduxState {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      };
    case actionTypes.SET_QR_CODE: {
      const _action = action as ReturnType<typeof setQrCode>;
      return {
        ...state,
        paymentMode: _action.payload.paymentMode,
        qrCodeStatus: 'pending',
        qrCodeFailureText: '',
        qrCodeBase64: _action.payload.qrCodeBase64,
      };
    }
    case actionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload.items as IOrderEntry[],
        totalSum: action.payload.totalSum as number,
        ndsSum: action.payload.ndsSum as number,
      };
    case actionTypes.SET_MODAL_FORM_STATE:
      return {
        ...state,
        qrCodeStatus: action.payload.qrCodeStatus as ('pending' | 'success' | 'failure'),
        qrCodeFailureText: action.payload.qrCodeFailureText as string,
      };
    default:
      return state;
  }
}
