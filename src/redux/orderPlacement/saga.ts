/* eslint-disable @typescript-eslint/ban-ts-comment,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-assignment
*/
// @ts-nocheck

import { PLACE_ORDER, MODAL_CLOSED, setLoading, setQrCode, setQrCodeFormResult, setItems } from './actions';
import { takeLatest, put, call, delay, race, take, select } from 'redux-saga/effects';
import {
  activateQr,
  payWithSubscr,
  cancelPayment,
  checkOrderPaymentStatus,
  ICancelRes,
  ICheckOrderPaymentStatusRes,
  IPlaceOrderRes,
  placeOrder
} from './api';
import { goBack, navigate } from '../../rootNavigation';
import { showErrorPopup, showPopup } from '../globalPopup/actions';
import { PLEASE_CALL_BANK } from '../../utils/K';
import { IReduxState } from '../store';

function* orderPlacementSaga(action: any) {
  // Загрузка
  yield put(setLoading(true));

  // Отправить запрос
  const { items, nds, totalSum, withCashLink, type, subscrPurpose, subscrPayerId, subscrId } = action.payload;
  let orderResponse: IPlaceOrderRes;
  try {
    if (withCashLink) {
      orderResponse = (yield call(activateQr, items, nds, totalSum)) as IPlaceOrderRes;
    } else if(type == 'payWithSubscr') {
      orderResponse = (yield call(payWithSubscr, items, nds, totalSum, subscrId)) as IPlaceOrderRes;
    } else {
      orderResponse = (yield call(placeOrder, items, nds, totalSum, type, subscrPurpose, subscrPayerId, subscrId)) as IPlaceOrderRes;
    }
  } catch (e) {
    yield put(showErrorPopup(e));
    return;
  }

  // Открыть модальную форму
  let mode = 'qrCode';
  if(withCashLink) 
    mode = 'cashLink'
  else if(type == 'subscr')
    mode = 'subscrLink';
  else if(type == 'payAndCreateSubscr')
    mode = 'payAndCreateSubscr';
  else if(type == 'payWithSubscr')
    mode = 'payWithSubscr'
  else if (type == 'subscr2')
    mode = 'subscrLink2';

  //yield put(setQrCode(orderResponse.qrImage, withCashLink ? 'cashLink' : 'qrCode'));
  //navigate('QrCodeScreen', { mode: withCashLink ? 'cashLink' : 'qrCode' });
  yield put(setQrCode(orderResponse.qrImage, mode));
  navigate('QrCodeScreen', { mode: mode });

  // Ждать или оплаты, или отмены оплаты
  yield race({
    waitForPay: waitForPayOrSubscr(mode, (type == 'subscr' || type == 'subscr2') ? orderResponse.qrcId : orderResponse.idRequest, orderResponse.qrcId),
    cancellation: waitCancellation(type, orderResponse.idRequest),
  });

}

function* waitForPayOrSubscr(mode: string, idObject: string, qrcId: string) {
  // Поставить цикл с 5-сек задержками
  while (true) {
    yield delay(5000);
    try {
      //subscrLink         - регистрация подписки (отображается QR ожидается подтверждение)
      //subscrLinkAfterPay - регистрация подписки после оплаты (оплата, ожидание. потом QR подписки, ожидание)

      const response = (yield call(checkOrderPaymentStatus, 
                                   idObject, 
                                   mode === 'subscrLink2' || mode == 'subscrLink' || mode == 'subscrLinkAfterPay' ? 'QRCsubscr' : 'INT')) as ICheckOrderPaymentStatusRes;

      if (response.state === 10 || response.state === 0 || response.state === 99) {
        if(response.state === 10 && mode === 'payAndCreateSubscr')
        {
          mode = 'subscrLinkAfterPay';
          idObject = qrcId; //статус проверяется по qrcId
          yield put(setQrCodeFormResult(response.status === 1 ? 'successPay' : 'failure', PLEASE_CALL_BANK));
        } else {
          // Получили результат и отобразили на модальной форме
          if(mode === 'subscrLinkAfterPay')
          yield put(setQrCodeFormResult(response.status === 1 ? 'successPayAndSubscr' : 'failureSubscr', PLEASE_CALL_BANK));
          else
            yield put(setQrCodeFormResult(response.status === 1 ? 'success' : 'failure', PLEASE_CALL_BANK));
          break;
        }
      }
    } catch (e) {
      console.error(e);
      if (e.codeResult === 254) { // Если интернета нет, то просто продалжаем
        continue;
      }
      yield put(setQrCodeFormResult('failure', e.textResult || PLEASE_CALL_BANK));
      yield take(MODAL_CLOSED);
      goBack();
      return;
    }
  }
  yield put(setItems([]));
  yield take(MODAL_CLOSED);
  goBack();
}

function* waitCancellation(type: string, idResponse: number){
  if(type && type.indexOf('subsc') > -1) {
    yield put(setItems([]));
    yield take(MODAL_CLOSED);
    goBack();
    return;
  }

  yield take(MODAL_CLOSED);

  const state: IReduxState = yield select();
  const { qrCodeStatus, totalSum, paymentMode } = state.orderPlacement;
  const { tspName, tspAddress } = state.user;
  // Если операция уже завершена, то просто закрываем форму
  if (qrCodeStatus !== 'pending') {
    goBack();
    return;
  }
  try {
    const response = (yield call(cancelPayment, idResponse)) as ICancelRes;
    navigate('CancelPaymentModal', {
      state: response.state,
      noteState: response.noteState,
      message: response.message,
      tspName,
      tspAddress,
      totalSum,
    });
  } catch (e) {
    console.error(e);
    navigate('CancelPaymentModal', {
      state: 3,
      noteState: PLEASE_CALL_BANK,
      message: '',
      tspName,
      tspAddress,
      totalSum,
    });
  }
}

export default function* orderPlacementSagaWatcher() {
  yield takeLatest(PLACE_ORDER, orderPlacementSaga);
}
