import { PLEASE_CALL_BANK } from '../../utils/K';
import { RequestException } from '../../utils/apiFabric';

export const SHOW_POPUP = 'globalPopup/SHOW_POPUP';
export const HIDE_POPUP = 'globalPopup/HIDE_POPUP';

export function showPopup(text: string, type: PopupType = 'error') {
  return {
    type: SHOW_POPUP,
    payload: {
      text,
      shown: true,
      type
    }
  };
}

export function showErrorPopup(e: Error) {
  let text = e.message;
  if (e instanceof RequestException) {
    if (e.codeResult === 1 && e.textResult) {
      text = e.textResult;
    } else {
      text = PLEASE_CALL_BANK;
    }
  }
  if (!text) {
    text = PLEASE_CALL_BANK;
  }
  return {
    type: SHOW_POPUP,
    payload: {
      text,
      shown: true,
      type: 'error',
    }
  };
}

export function hidePopup() {
  return {
    type: HIDE_POPUP,
  };
}

export function errorPopupHelper(ex: RequestException) {
  if (ex.codeResult === 1 && ex.textResult) {
    return showPopup(ex.textResult);
  } else {
    return showPopup(PLEASE_CALL_BANK);
  }
}
