import sagaHelper from 'redux-saga-testing';
import { call, put, select, take } from 'redux-saga/effects';
import * as api from '../../src/redux/document/api';
import { documentSaga } from '../../src/redux/document/saga';
import { IExecuteRes } from '../../src/redux/document/api';
import { returnDataRes1, createVerifyRes } from './responses.mock';
import * as actions from '../../src/redux/document/reducer';
import { documentSelector } from '../../src/redux/document/selectors';
import reducer, { setInitialDocument } from '../../src/redux/document/reducer';

const splitApi = jest.fn();
const someActionSuccess = (payload: any) => ({
  type: 'SOME_ACTION_SUCCESS',
  payload,
});
const someActionEmpty = () => ({ type: 'SOME_ACTION_EMPTY' });
const someActionError = (error: any) => ({
  type: 'SOME_ACTION_ERROR',
  payload: error,
});
const selectFilters = (state: any) => state.filters;

jest.mock('../../src/redux/document/api');

describe('Тест саги документа', () => {
  describe("Сценарий 1: Запрос, получения результата, обновление редюсера", () => {
    const sidRequest = 'TEST_SREQ';
    const sidDocument = 'TEST_SID_DOC';
    const parameters = [];

    const it = sagaHelper(documentSaga({ payload: {
        sidRequest,
        sidDocument,
        parameters,
    }}));

    let reducerState = reducer(undefined, { type: '' });

    it('Сперва, нужно отправить запрос', (result) => {
        expect(result).toEqual(call(api.execute, sidRequest, sidDocument, parameters));
        return returnDataRes1;
      }
    );

    it('Затем, результат запроса записывается в редюсер', (result) => {
      expect(result).toEqual(put(actions.setInitialDocument(returnDataRes1)));
      reducerState = reducer(reducerState, actions.setInitialDocument(returnDataRes1));
    });

    it('Затем, ожидается нажатие кнопки "Далее"', (result) => {
      expect(result).toEqual(take('NEXT_PRESSED'));
    })

    it('Затем, сага запрашивает документ из редюсера c применением селектора', (result) => {
      expect(result).toEqual(select(documentSelector));

      return documentSelector({ document: reducerState });
    })

    it('Теперь сага должна отправить CreateVerify', (result) => {
      const document = documentSelector({ document: reducerState });
      expect(result).toEqual(call(api.execute, 'CreateVerify', sidDocument, document.values))
      return createVerifyRes;
    })

    it('Теперь сага должна отправить processDocument и idDocument', (result) => {
      const document = documentSelector({ document: reducerState });
      expect(result).toEqual(call(api.execute, 'CreateVerify', sidDocument, document.values));
    })

    /*
    const it = sagaHelper(mySaga('hello,foo,bar,world'));

    it('should get the list of filters from the state', (result) => {
      expect(result).toEqual(select(selectFilters));

      // Here we specify what the selector should have returned.
      // The selector is not called so we have to give its expected return value.
      return ['foo', 'bar'];
    });

    it('should have called the mock API first, which we are going to specify the results of', (result) => {
      expect(result).toEqual(call(splitApi, 'hello,foo,bar,world'));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return ['hello', 'foo', 'bar', 'world'];
    });

    it('and then trigger an action with the transformed data we got from the API', (result) => {
      expect(result).toEqual(put(someActionSuccess(['hello', 'world'])));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    }); */
  });
});
