import { AnyAction } from '@reduxjs/toolkit';

export interface IListDocumentsAction extends AnyAction  {
  payload: {
    documents: IOperationData[],
    clearPrevious: boolean,
    countOpers: number,
  }
}

export const LIST_DOCUMENTS_START_REQ = 'history/listDocumentsReq';
export const LIST_DOCUMENTS_REQ_SUC = 'history/listDocumentsReq_SUC';
export const LIST_DOCUMENTS_REQ_ERR = 'history/listDocumentsReq_ERR';

export const SET_FILTER = 'history/set_FILTER';
