import * as api from './api';
import { AppDispatch, IReduxState } from '../store';
import * as types from './types';
import { errorPopupHelper, showErrorPopup, showPopup } from '../globalPopup/actions';
import { printOperation } from './api';
import { goBack, navigate } from '../../rootNavigation';
import { checkOrderPaymentStatus } from '../orderPlacement/api';
import { PLEASE_CALL_BANK } from '../../utils/K';
import throttling from '../../utils/throttling';
import { Alert } from 'react-native';

export function getDocuments(clearPrevious = false, pageNum = 1) {
  return async(dispatch: AppDispatch, getState: () => IReduxState) => {
    try {
      dispatch({ type: types.LIST_DOCUMENTS_START_REQ });
      const filter = getState().history.filter;
      const result = await api.listOperations(filter, pageNum);
      const documents: IOperationData[] = result.operations.map((operation) => ({
        id: Number(operation.idRequest),
        date: operation.date,
        payerName: operation.payerName,
        payerPhone: operation.payerPhone,
        description: operation.note,
        sum: Number(operation.amount),
        image: operation.image,
        state: operation.stateCode,
        stateName: operation.state,
        numAccount: operation.accountR,
        canBeRefunded: operation.canBeRefunded,
        type: operation.type,
      }));

      dispatch({
        type: types.LIST_DOCUMENTS_REQ_SUC,
        payload: {
          documents,
          clearPrevious,
          countOpers: result.countOpers,
        }
      });
    } catch (e) {
      dispatch(errorPopupHelper(e as RequestException));
      dispatch({ type: types.LIST_DOCUMENTS_REQ_ERR });
    }
  };
}


export function setFilter(filter: IDocumentsFilter) {
  return {
    type: types.SET_FILTER,
    payload: { filter },
  };
}

export function openReceipt(idDocument: number) {
  return async (dispatch: AppDispatch) => {
    try {
      navigate('GlobalLoader');
      const response = await printOperation(idDocument);
      goBack();
      navigate('PdfViewerScreen', { file: response.file, headerTitle: 'Квитанция' });
    } catch (e) {
      dispatch(showErrorPopup(e));
      goBack();
    }
  };
}

export function refund(id: number, amount: number, note: string) {
  return async (dispatch: AppDispatch) => {
    try {
      navigate('GlobalLoader');
      const refundResponse = await api.refund(id, amount, note);
      if (refundResponse.state === 0 || refundResponse.state === 99) {
        throw new Error(refundResponse.noteState);
      }
      
      else if(refundResponse.state === 10) {
        dispatch(showPopup('Операция была успешно отменена', 'success'));
      }
      else {
        dispatch(showPopup('Операция отмены в обработке, отслеживайте завершение возврата в истории операций', 'warn'));
      }
      //while(true) {
      //  const checkResponse = await checkOrderPaymentStatus(refundResponse.idRequest);
      //  if (checkResponse.state === 1) {
      //    // Ничего не надо делать
      //  } else if(checkResponse.state === 10) {
      //    // Успех
      //    dispatch(showPopup('Операция была успешно отменена', 'success'));
      //    break;
      //  } else {
      //    throw new Error(PLEASE_CALL_BANK);
      //  }
      //  await throttling(5000);
      //}
      
    } catch (e){
      Alert.alert('Ошибка', e.message);
    } finally {
      goBack();
    }
  };
}
