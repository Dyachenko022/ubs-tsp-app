import { post, baseUrl } from '../../utils/apiFabric';

interface IRequestSubscrQrCodeReq {
    type: string,
    subscriptionPurpose: string,
    subscriptionPayerId: string,
  }
  
  export interface IRequestSubscrQrCodeRes extends IBaseResponse {
    qrcImage: string,
  }

  export async function makeSubscrQrCode(subscriptionPurpose: string, subscriptionPayerId: string) {
    const result = await post<IRequestSubscrQrCodeReq, IRequestSubscrQrCodeRes>('tsc/makeQr', {
        type: "subscr",
        subscriptionPurpose,
        subscriptionPayerId,
    });
    
    return result;
  }
