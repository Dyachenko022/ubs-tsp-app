import { AnyAction } from '@reduxjs/toolkit';
import * as types from './types';
import { setFilter } from './actions';
import { IListDocumentsAction } from './types';
import { isAfter, parseISO } from 'date-fns';

interface IState {
  documents: IOperationData[],
  filter: IDocumentsFilter,
  countOpers: number,
  loading: boolean,
}

const initialState: IState = {
  loading: true,
  documents: [],
  countOpers: 0,
  filter: {
    period: 'Все',
  }
};

export default function reducer(state=initialState, action: AnyAction) {
  switch (action.type) {
    case types.LIST_DOCUMENTS_START_REQ:
      return  {
        ...state,
        loading: true,
      };
    case types.SET_FILTER:
      return  {
        ...state,
        filter: {
          ...state.filter,
          ...(action as ReturnType<typeof setFilter>).payload.filter,
        }
      };
    case types.LIST_DOCUMENTS_REQ_SUC: {
      const listDocumentsAction = action as IListDocumentsAction;
      let documents: IOperationData[];
      if (listDocumentsAction.payload.clearPrevious) {
        documents = listDocumentsAction.payload.documents;
      } else {
        documents = [...state.documents];
        const newDocumentsMap = new Map<number, IOperationData>();
        listDocumentsAction.payload.documents.forEach((document) => newDocumentsMap.set(document.id, document));

        // Обновим существующие документы
        for (let i = 0; i<documents.length; i++) {
          if (newDocumentsMap.has(documents[i].id)) {
            documents[i] = newDocumentsMap.get(documents[i].id) as IOperationData;
            newDocumentsMap.delete(documents[i].id);
          }
        }

        // Если есть новые документы, то добавим их в массив документов
        if (newDocumentsMap.size > 0) {
          newDocumentsMap.forEach((value) => {
            documents.push(value);
          });
        }
        documents = documents.sort((doc1, doc2) =>
          isAfter(parseISO(doc1.date) , parseISO(doc2.date)) ? -1 : 1
        );

      }
      return {
        ...state,
        loading: false,
        documents,
        countOpers: listDocumentsAction.payload.countOpers,
      };
    }
    case types.LIST_DOCUMENTS_REQ_ERR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
