import { AppDispatch, IReduxState } from '../store';
import { ndsToValue } from '../../utils/settingsHelper';

export const SET_LOADING = 'orderPlacement/setLoader';
export const SET_ITEMS = 'orderPlacement/SetItems';
export const PLACE_ORDER = 'orderPlacement/placeOrder';
export const SET_QR_CODE = 'orderPlacement/setQrCode';
export const SET_MODAL_FORM_STATE = 'orderPlacement/setModalFormState';
export const MODAL_CLOSED = 'orderPlacement/modalClosed';

export function setLoading(isLoading: boolean) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}

export function setItems(items: IOrderEntry[]) {
  return (dispatch: AppDispatch, getState :() => IReduxState) => {
    const totalSum = items.reduce((total, item) => total + item.price * item.count, 0);
    const ndsSum = ndsToValue(getState().settings.nds) * totalSum;
    dispatch({
      type: SET_ITEMS,
      payload: {
        totalSum,
        ndsSum,
        items,
      }
    });
  };
}

export function placeOrder(withCashLink: boolean, items: IOrderEntry[], nds: number, totalSum: number,
                           type?: string, subscrPurpose?: string, subscrPayerId?: string, subscrId?: number) {
  return {
    type: PLACE_ORDER,
    payload: {
      withCashLink,
      items,
      nds,
      totalSum,

      type,
      subscrPurpose, 
      subscrPayerId, 
      subscrId,
    }
  };
}

export function setQrCode(qrCodeBase64: string, paymentMode: 'qrCode' | 'cashLink') {
  return {
    type: SET_QR_CODE,
    payload: {
      qrCodeBase64,
      paymentMode
    },
  };
}

export function setQrCodeFormResult(status: string, errorText: string) {
  return {
    type: SET_MODAL_FORM_STATE,
    payload: {
      qrCodeStatus: status,//isSuccess ? 'success' : 'failure',
      qrCodeFailureText: errorText,
    }
  };
}
