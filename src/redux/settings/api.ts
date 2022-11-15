import { post } from '../../utils/apiFabric';

interface ISendNdsReq {
  name: 'Ставка НДС',
  value: number,
}

export function setNds(nds: number) {
  return post<ISendNdsReq, IBaseResponse>('tsc/saveparamcontract', {
    name: 'Ставка НДС',
    value: nds,
  });
}
