import { post } from '../../utils/apiFabric';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { mergeLink } from '../../utils/filePathsLink';

interface IOperation {
  date: string,
  state: string,
  stateCode: number,
  sid: string,
  note: string,
  amount: string,
  image: string,
  accountR: string,
  canBeRefunded: boolean,
  currencyCod: string,
  idRequest: string,
  trxid: string,
  localOperationId: string
  payerPhone: string,
  payerName: string
  noteRefund: string,
  type: 'payment' | 'refund' | 'make' | 'deact';
}

export interface IListTspOperationsRes extends IBaseResponse {
  operations: IOperation[],
  countOpers: number,
}

interface IListTspOperationsReq {
  dateFrom: string,
  dateTo: string,
  type: 'Оплата' | 'Возврат' | '',
  amountFrom: number,
  amountTo: number,
  state: 'Завершена' | 'В процессе' | 'Отбракована' | '',
  idSbp: string,
  pageRows: number,
  pageNum: number,
  searchString: string,
}

interface IGetTspDocumentDetailsReq {
  idRequest: number,
}

export interface IGetTspDocumentDetailsRes extends IBaseResponse {
  orderedItems: IOrderedItem[],
  stateName: string,
  reasonOfFail: string,
  idOperationSbp: string,
  dateProcessing: string
}

interface IOrderedItem {
  name: string,
  sum: number,
  count: number,
}

export interface IExtractRbDocReq {
  typeOfFile: 'pdf' | 'xls',
  dateFrom: string,
  dateTo: string,
  sidDoc: string,
  stateCode: number[],
}

interface IExtractRbDocRes extends IBaseResponse {
  file: string,
}

interface IRefundReq {
  originalId: number,
  originalIdType: 'INT',
  amount: number,
  note: string,
}

interface IRefundRes extends IBaseResponse {
  state: number,
  noteState: string,
  idRequest: number,
}

/**
 * Список операций. Вернет операции в соответствии с фильтром
 * @param filter
 * @param pageNum
 */
export async function listOperations(filter: IDocumentsFilter, pageNum: number) {
  const { dateTo, dateFrom } = typeOfPeriodToDateFrom(filter.period);

  const params: IListTspOperationsReq = {
    amountFrom: filter.sumFrom || 0,
    amountTo: filter.sumTo || 0,
    state: filter.state || '',
    dateTo,
    type: filter.typeOperations || '',
    dateFrom,
    idSbp: filter.identyOfOperation || '',
    pageNum,
    pageRows: 20,
    searchString: filter.searchString || '',
  };

  const response = await post<IListTspOperationsReq, IListTspOperationsRes>('tsc/operations', params);
  response.operations.forEach((operation) => {
    operation.image = mergeLink(operation.image, 'imageDocuments');
  });
  return response;
}


/**
 * Вернет сведения об операции
 * @param id - ИД операции
 */
export function getTspOperationDetails(id: number) {
  return post<IGetTspDocumentDetailsReq, IGetTspDocumentDetailsRes>('tsc/operationDetails', { idRequest: id });
}

/**
 * Выгрузить документы за период
 * @param typeOfFile
 * @param period
 * @param typeOfDocument
 * @param status
 */
export async function extractRbDoc(typeOfFile: TypeOfFile, period: TypeOfPeriod, typeOfDocument: TypeOfDocument,
  status: TypeOfStatus) {
  const { dateFrom, dateTo } = typeOfPeriodToDateFrom(period);
  const request: IExtractRbDocReq = {
    typeOfFile: typeOfFile === 'PDF' ? 'pdf' : 'xls',
    dateFrom,
    dateTo,
    sidDoc: typeOfDocumentToSid(typeOfDocument),
    stateCode: statusToStateCode(status as string),
  };
  const response = await post<IExtractRbDocReq, IExtractRbDocRes>('extractRbDoc', request);
  response.file = mergeLink(response.file, 'unloadFiles');
  return response;
}

interface IPrintDocumentReq {
  format: 'PDF',
  id: number,
  email: string,
}

interface IPrintDocumentRes extends IBaseResponse {
  file: string,
}

/**
 * Выписка по операции
 * @param idDocument
 */
export async function printOperation(id: number) {
  const response = await post<IPrintDocumentReq, IPrintDocumentRes>('tsc/printOperation', {
    format: 'PDF',
    id,
    email: '',
  });
  response.file = mergeLink(response.file, 'unloadFiles');
  return response;
}

/**
 * Возврат средств по операции с заданным id
 * @param id
 */
export async function refund(id: number, amount: number, note: string) {
  return post<IRefundReq, IRefundRes>('tsc/refund', {
    originalId: id,
    originalIdType: 'INT',
    amount,
    note,
  });
}


// Helpers

function typeOfPeriodToDateFrom(typeOfPeriod: string) {
  let dateTo = format(Date.now(), 'dd.MM.yyyy');
  let dateFrom = '';
  switch (typeOfPeriod) {
    case 'Год':
      dateFrom = format(subYears(Date.now(), 1), 'dd.MM.yyyy');
      break;
    case 'Месяц':
      dateFrom = format(subMonths(Date.now(), 1), 'dd.MM.yyyy');
      break;
    case 'Неделя':
      dateFrom = format(subDays(Date.now(), 7), 'dd.MM.yyyy');
      break;
    default:
      dateFrom = dateTo = '01.01.2222';
  }
  return { dateFrom, dateTo };
}

function statusToStateCode(typeOfOperation: string | undefined): number[] {
  switch (typeOfOperation) {
    case 'Завершена':
      return [101];
    case 'В процессе':
      return [100];
    case 'Отбракована':
      return [99];
    default:
      return [];
  }
}

function typeOfDocumentToSid(typeOfDocument: string | undefined) {
  switch (typeOfDocument) {
    case 'Оплата':
      return 'UBS_RB_TSP_PAYMENT';
    case 'Возврат':
      return 'UBS_RB_TSP_REFUND';
    default: return '';
  }
}
