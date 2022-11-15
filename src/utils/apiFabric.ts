import 'axios';
import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../redux/store';
import { Alert } from 'react-native';
import { store } from '../redux/store';
import { logout } from '../redux/user/actions';
import BankTheme from '../bankTheme';

import * as apiUser from '../redux/user/api';
import * as apiAcc from '../redux/accounts/api';
import * as apiHis from '../redux/history/api';
import * as apiMes from '../redux/messages/api';
import * as apiSub from '../redux/subscription/api';
import * as apiPQr from '../redux/permanentQrCode/api';
import * as apiStateQr from '../redux/orderPlacement/api';

const qrTest = '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';


let jwt = '';

export function setJwt(_jwt: string) {
  jwt = _jwt;
}

export const baseUrl = BankTheme.serverUrl + '/';

export class RequestException extends Error implements IBaseResponse {
  constructor(response: IBaseResponse) {
    super(response.textResult);
    this.codeResult = response.codeResult;
    this.textResult = response.textResult;
  }

  public readonly codeResult: number;
  public readonly textResult: string;
}

export async function post<T, R extends IBaseResponse>(request: string, data: T, useJwt = true, useBaseData = true) : Promise<R> {
//console.log('_MY post', request);
//console.log('_my data', data);
/*
  switch (request) {
    case 'users/auth/base':
      {
        let a: apiUser.IAuthBaseRes;
        a = {
          codeResult: 0,
          textResult: '',
          jwt: '',
          contracts: [{id: 1, name: 'test', image: '',}],
       };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(a));
        });
      }
    case 'users/auth/contract':
        let response: apiUser.IAuthContractRes;
        response={
          codeResult: 0,
          textResult: '',
          regimeConfirmation: 1,
          regimeConfirmationLogin: 1,
          expireDatePassword: '',
          changePassword: 0,
          fullname: 'Test',
          username: 'testAbonent',
          lastIp: '1.1.0.0',
          lastDate: '20220202',
          nameabonent: 'nameAbonent',
          regimeAccess: 'Администратор', //'Кассир' | 'Бухгалтер' | 'Администратор'
        };

        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
    case 'users/getCodeSMS':
      {
        let response: apiUser.IGetCodeSmsRes;
        response = {liveTime: 5,
             phoneSending: '+79991211212',
             dateGenerate: '2022-12-01T17:00:00',
             codeResult: 0,
             textResult: '',
        }
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'users/confirm':
      {
        let response: IBaseResponse;
        response={
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'registrationApp':
      {
        let response: IBaseResponse;
        response={
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'users/auth/code':
      {
        let response: apiUser.IAuthCodeRes;
        response={
          codeResult: 0,
          textResult: '',
          jwt: 'string',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/paramContract':
      {
        let response: apiUser.IParamContractClientRes;
        response={
          clientName: 'testName',
          addressReg: 'addr',
          idTspSbp: '123',
          nameTSP: 'nameTSC',
          listNds: [{nds: '10'}],
          setNds: 10,
          regimeaccess: 'Администратор', //'Кассир' | 'Бухгалтер' | 'Администратор'
          codeResult: 0,
          textResult: '',
        }
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'users/getFotoAbonent':
      {
        let response: apiUser.IGetPhotoAbonentResponse;
        response={ foto: '',
          codeResult: 0,
          textResult: '',
          };
          return new Promise((resolve, reject) => {
            resolve(<R><unknown>(response));
          });
      }
    case 'v2/accounts':
      {
        let response: apiAcc.IGetAccountsResponse;
        response={ accounts: [{id: 1,
          account: '40702810400000000444',
          description: 'my acc',
          logo: '',
          currency: 'RUB',
          balance: 500000,
          dateOpen: '2021-01-01T12:00:00',
          state: 'open',
          hide: false,
          balanceRub: 500000,
          currencyName: 'rub',
          stopList: null,
          }],
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/operations':
      {
        let response: apiHis.IListTspOperationsRes;
        response={ 
          operations:[
            {
              date: '2021-08-17T17:00:00',
              state: 'confirmed',
              stateCode: 101,
              sid: 'SID',
              note: 'cofee',
              amount: '100',
              image: '',
              accountR: '4070281040000000',
              canBeRefunded: true,
              currencyCod: 'RUB',
              idRequest: '1',
              trxid: '1',
              localOperationId: '1',
              payerPhone: '+7999*****99',
              payerName: 'Ivan',
              noteRefund: '',
              type: 'payment'
            },
            {
              date: '2021-08-17T18:00:00',
              state: 'confirmed',
              stateCode: 101,
              sid: 'SID',
              note: 'cofee',
              amount: '200',
              image: '',
              accountR: '4070281040000000',
              canBeRefunded: true,
              currencyCod: 'RUB',
              idRequest: '2',
              trxid: '2',
              localOperationId: '2',
              payerPhone: '+7888*****88',
              payerName: 'Sidr',
              noteRefund: '',
              type: 'payment'
            },
          ],
          countOpers: 2,
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'getNotifications':
      {
        let response: apiMes.IGetNotificationsRes;
        response={ 
          notifications: [
            {
              guid: '1',
              hasAttachments: false,
              text: 'msg 1',
              time: '2022-08-01T17:00:00',
              title: 'msg 1',
              type: 'messageIn',
              unread: false,
            },
            {
              guid: '2',
              hasAttachments: false,
              text: 'msg 2',
              time: '2022-08-01T18:00:00',
              title: 'msg 2',
              type: 'messageIn',
              unread: false,
            },
          ],
          countUnreadMessages: 2,
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/subscriptions':
      {
        //console.log('_my data', data);
        let response: apiSub.IListTspSubscriptionsRes;
        response={ 
          subscriptions: [
            {
              id: 1,
              timeCreate: '2022-08-23T17:00:00',
              stateName: 'Зарегистрирована',
              state: 0,
              note: 'Подписка на кофе',
              correspCode: '+79152677605',
            },
            {
              id: 2,
              timeCreate: '2022-08-22T18:00:00',
              stateName: 'Создана',
              state: 1,
              note: 'Подписка на чай',
              correspCode: '+79152677606',
            }
          ],
          countSubscriptions: 2,
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/subscriptionsDelete':
      {
        let response: IBaseResponse;
        response={
          codeResult: 0,
          textResult: '',
        };
        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/makeQr':
      {
        //console.log('_my data', data);

        
        let response: apiPQr.IRequestPermanentQrCodeRes;
        response={
          qrImage: qrTest,
          qrcImage: qrTest,
          qrcId: 'xxxxsdfsdfsdf',
          idRequest: 200,
          file: '//qr.nspk.ru/AS1A000S87V5AISG9KV87AMN7P1F6KK2?type=01&bank=1crt88888881&crc=4C7A',
          codeResult: 0,
          textResult: '',
        };

        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/checkOperStatusByQr':
      {
        console.log('_my checkOperStatusByQr', data);

        let status = 1;
        let state = 10;
        
        if(data.originalType == 'QRC')
        {
          status = 99;
          state = 99;
        }
        let response: apiStateQr.ICheckOrderPaymentStatusRes;
        response={
          state: state,
          status: status,
          qrcId: 'qrcIdFromResponseByCheck',
          codeResult: 0,
          textResult: '',
        };

        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    case 'tsc/activateQr':
      {
        let response: apiStateQr.IPlaceOrderReq;
        response={
          qrcId: 'xxxxsdfsdfsdf',
          qrcImage: qrTest,
          idRequest: 100,
          codeResult: 0,
          textResult: '',
        };

        return new Promise((resolve, reject) => {
          resolve(<R><unknown>(response));
        });
      }
    default:
      {
        console.log('_MY post', request);
        console.log('_my data', data);
      }

  }
  */ 

  type Headers = {
    sidrequest: string,
    ubsjwt?: string,
    timeRequest?: string,
  }

  let response: R;
  const headers: Headers = {
    sidrequest: request,
    ubsjwt: useJwt ? jwt : undefined,
  };

  try {
    if (useBaseData) {
      headers.timeRequest = await baseData();
    }

    const rawResponse = await axios.post<T, AxiosResponse<R>>(baseUrl +'execute', data, {
      headers,
    });
    if (rawResponse.status !== 200) throw new Error('Http status ' + rawResponse.status.toString());
    response = rawResponse.data;
  } catch (ex) {
    console.error(ex);
    throw new RequestException({ codeResult: 254, textResult: 'Ошибка запроса' });
  }
  if (response.codeResult === 255) {
    store.dispatch(logout());
    throw new RequestException({ codeResult: 255, textResult: 'Необходимо заново войти в систему' });
  } else if (response.codeResult !== 0) throw new RequestException(response);
  return response;
}

export async function get<T>(url: string): Promise<T> {
  const rawResponse = await axios.get<T>(baseUrl + url);
  if (rawResponse.status !== 200) throw new Error('Http status ' + rawResponse.status.toString());
  return rawResponse.data;
}

async function baseData(): Promise<string> {
  const rawResponse = await axios.post(baseUrl +'execute', {}, {
    headers: {
      sidrequest: 'baseData',
      ubsjwt: jwt,
    }
  });
  return rawResponse.data.timeRequest as string;
}

export function errorWrapper<R>(request: Promise<R>) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await request;
      return response;
    } catch (e) {
      const ex = e as RequestException;
      if (ex.codeResult && ex.textResult) {
        Alert.alert('Ошибка', ex.codeResult === 1 ? ex.textResult : 'Произошла ошибка, пожалуйста, обратитесь в банк.');
      }
      throw ex;
    }
  };
}
