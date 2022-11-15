import { post, baseUrl } from '../../utils/apiFabric';
import { mergeLink } from '../../utils/filePathsLink';

interface IRequestPermanentQrCodeReq {
  amount: number,
  currencyCod: 'RUB',
  description: string,
}

export interface IRequestPermanentQrCodeRes extends IBaseResponse {
  qrImage: string,
  qrcId: string,
  file: string,
}

interface IRequestCashLinkReq {
  type: 'C',
  format: 'png',
  description: string,
}

interface IRequestCashLinkRes extends IBaseResponse {
  qrImage: string,
  qrcImage: string,
  payload: string,
  qrcId: string,
}

export async function makePermanentQrCode(sum: number, description: string) {
  const result = await post<IRequestPermanentQrCodeReq, IRequestPermanentQrCodeRes>('tsc/makeQrStatic', {
    amount: sum,
    currencyCod: 'RUB',
    description,
  });
  if (result.file !== '') {
    //result.file = `${baseUrl}files/unloadFiles/${result.file}`;
    result.file = mergeLink(result.file, 'unloadFiles')
  }
  return result;
}

export async function makeCashLink(description: string) {
  const result = await post<IRequestCashLinkReq, IRequestCashLinkRes>('tsc/makeQr', {
    description,
    type: 'C',
    format: 'png',
  });
  return result;
}

export function deactivateQr() {
  return post<unknown, IBaseResponse>('tsc/deactivateQr', {});
}
