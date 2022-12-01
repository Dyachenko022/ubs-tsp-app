import { EnumStringMember } from '@babel/types';
import { post } from '../../utils/apiFabric';

export interface IPlaceOrderReq {
  items: IOrderEntry[],
  nds: number,
  amount: number,
  currencyCod: 'RUB',
  description: string,

  type?: string,
  subscriptionPurpose?: string,
  subscriptionPayerId?: string,
  subscriptionId?: string,
}

export interface IPlaceOrderRes extends IBaseResponse {
  qrcId: string,
  qrcImage: string,
  idRequest: number,
  subscrId?: string
}

interface ICheckOrderPaymentStatus {
  originalId: string,
  originalType: 'INT' | 'LCL' | 'QRC' | 'QRCsubscr',
}

export interface ICheckOrderPaymentStatusRes extends IBaseResponse {
  state: number,
  qrcId: string,
}

export function placeOrder(items: IOrderEntry[], nds: number, totalSum: number,
                           typeQr?: string, subscrPurpose?: string, subscrPayerId?: string, subscrId?: string): Promise<IPlaceOrderRes> {
  
  return post<IPlaceOrderReq, IPlaceOrderRes>('tsc/makeQr', {
    items,
    nds,
    amount: totalSum,
    description: '',
    currencyCod: 'RUB',

    type: typeQr?.replace(/[0-9]/g, ""),
    subscriptionPurpose: subscrPurpose,
    subscriptionPayerId: subscrPayerId,
    subscriptionId: subscrId,
  });
}


export function activateQr(items: IOrderEntry[], nds: number, totalSum: number, subscId: string): Promise<IPlaceOrderRes> {
  return post<IPlaceOrderReq, IPlaceOrderRes>('tsc/activateQr', {
    items,
    nds,
    amount: totalSum,
    description: '',
    currencyCod: 'RUB',

    type: "C",
    subscriptionPurpose: "",
    subscriptionPayerId: "",
    subscriptionId: subscId,
  });
}

export function payWithSubscr(items: IOrderEntry[], nds: number, totalSum: number, subscId: string): Promise<IPlaceOrderRes> {
  return post<IPlaceOrderReq, IPlaceOrderRes>('tsc/makeQr', {
    items,
    nds,
    amount: totalSum,
    description: '',
    currencyCod: 'RUB',

    type: "D",
    subscriptionPurpose: "",
    subscriptionPayerId: "",
    subscriptionId: subscId,
  });
}

export function checkOrderPaymentStatus(id: string, type: 'INT' | 'LCL' | 'QRC') {
  return post<ICheckOrderPaymentStatus, ICheckOrderPaymentStatusRes>('tsc/checkOperStatusByQr', {
    originalId: id,
    originalType: type,
  });
}

interface ICancelReq {
  idRequest: number,
}

export interface ICancelRes extends IBaseResponse {
  state: number,
  noteState: string,
  message: string,
}

/***
 * Отмена платежа по QR коду или кассовой ссылке
 * @param idRequest
 */
export function cancelPayment(idRequest: number) {
  return post<ICancelReq, ICancelRes>('tsc/cancel', { idRequest });
}
