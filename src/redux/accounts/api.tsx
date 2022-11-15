import { post } from '../../utils/apiFabric';
import { format } from 'date-fns';
import { mergeLink } from '../../utils/filePathsLink';

interface IAccount {
 id: number,
 account: string,
 description: string,
 logo: string,
 currency: string,
 balance: number,
 dateOpen: string,
 state: string,
 hide: boolean,
 balanceRub: number,
 currencyName: string,
 stopList: Array<IRestriction> | null,
}

interface ISetDescriptionProductReq {
 id: number,
 description: string,
 code: 'OD',
}

interface IGetAccountDetailsReq {
  code: 'OD',
  email: '',
  format: 'pdf',
  idObject: number,
}

interface IGetAccountsAnalyticsReq {
  typePeriod: 'month' | 'quarter' | 'year',
  dateStart: string,
}

interface IGetAccountsAnalyticsRes extends IBaseResponse {
  data: [{
    income: number,
    outcome: number,
    namePeriod: string,
  }],
}

interface IGetAccountDetailsRes extends IBaseResponse {
 file: string,
}

export interface IGetAccountsResponse extends IBaseResponse {
  accounts: IAccount[],
}

export function getAccounts() {
  return post<unknown, IGetAccountsResponse>('v2/accounts', {});
}

export function setDescriptionProduct(id: number, description: string) {
  return post<ISetDescriptionProductReq, IBaseResponse>('setDescriptionProduct', { id, description, code: 'OD'});
}

export async function getAccountDetails(id: number) {
  const response = await post<IGetAccountDetailsReq, IGetAccountDetailsRes>('getAccountDetails', {
    idObject: id,
    email: '',
    format: 'pdf',
    code: 'OD',
  });
  response.file = mergeLink(response.file, 'unloadFiles');
  return response;
}

export function getAccountsAnalytics(typePeriod: 'month' | 'quarter' | 'year', dateStart: string) {
  return post<IGetAccountsAnalyticsReq, IGetAccountsAnalyticsRes>('tsc/analytics', {
    typePeriod,
    dateStart,
  });
}

interface IExtractReq {
  code: 'OD',
  idObject: number,
  dateFrom: string,
  dateTo: string,
  printDocument: false,
  format: '1C' | 'pdf'
}

export interface IExtractRes extends IBaseResponse {
  file: string,
}

/**
 * Получить выписку
 */
export async function extract(idAccount: number, dateFrom: Date, dateTo: Date, fileFormat: '1C' | 'pdf') {
  const response = await post<IExtractReq, IExtractRes>('extract', {
    code: 'OD',
    printDocument: false,
    dateFrom: format(dateFrom, 'dd.MM.yyyy'),
    dateTo: format(dateTo, 'dd.MM.yyyy'),
    idObject: idAccount,
    format: fileFormat,
  });
  console.log('_my', response.file);
  response.file = mergeLink(response.file, 'unloadFiles');
  console.log('_my', response.file);
  return response;
}
