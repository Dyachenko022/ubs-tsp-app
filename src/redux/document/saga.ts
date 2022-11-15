import { put, call, take, select, takeLatest } from 'redux-saga/effects';
import * as actions from './reducer';
import * as api from './api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IExecuteRes } from './api';
import { documentSelector, IMergedDocumentState } from './selectors';

export function* documentSaga(action: PayloadAction<{
  sidRequest: string,
  sidDocument: string,
  idDocument?: number,
}>) {
  let response = (yield call(api.execute, action.payload.sidRequest, action.payload.sidDocument,
    [])) as IExecuteRes;

  // Закинуть в редюсер значения, для полученного документа
  yield put(actions.setInitialDocument(response));

  let needMoreGroups = true;
  let document: IMergedDocumentState;

  while (needMoreGroups) {
    // Все значения заполняются при помощи actions, мы просто ждем
    // нажатия кнопки "Далее"
    yield take('NEXT_PRESSED');

    document = (yield select(documentSelector)) as IMergedDocumentState;
    const { currentGroupIndex } = document;

    // Если не в последней группе, то просто отображаем следующую группу
    if (currentGroupIndex <  document.groups.length -1) {
      yield put(actions.moveToNextGroup());
      continue;
    }

    // Если СИД запроса не CreateVerify, значит делаем запрос, который вернет еще
    // группы контролов для отображения
    if ((document.sidRequest !== 'CreateVerify') && (document.sidRequest !== '')) {
      // ДЕЛАЕМ ЗАПРОС
      const addRes = yield call(api.execute, document.sidRequest, action.payload.sidDocument);
      yield put(actions.setAdditionalData);
    } else {
      needMoreGroups = false;
    }
  }

  // CreateVerify
  response = (yield call(api.execute, 'CreateVerify', action.payload.sidDocument, document.values)) as IExecuteRes;
  const idDocumentValue = response.values.find((item) => item.name === 'Идентификатор документа');

  // processDocument + idDocument
  const valuesWithDocId = [...document.values, idDocumentValue];
  response = (yield call(api.execute, 'processDocument', action.payload.sidDocument, valuesWithDocId)) as IExecuteRes;
}

export default function* documentSagaWatcher() {
  yield takeLatest('DOCUMENT_SAGA', documentSaga);
}
