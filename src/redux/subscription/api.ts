import { post } from '../../utils/apiFabric';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { mergeLink } from '../../utils/filePathsLink';
import { int32ARGBColor } from 'react-native-svg';

interface ISubscription {
  id: number,
  timeCreate: string,
  stateName: string,
  state: number,
  note: string,
  correspCode: string,
}

export interface IListTspSubscriptionsRes extends IBaseResponse {
  subscriptions: ISubscription[],
  countSubscriptions: number,
}

interface IListTspSubscriptionsReq {
  pageRows: number,
  pageNum: number,
  search: string,
}

interface ITspDeleteSubscriptionsReq {
  id: number,
}

/**
 * Список операций. Вернет операции в соответствии с фильтром
 * @param filter
 * @param pageNum
 */
export async function listSubscriptions(filter: ISubscriptionsFilter, pageNum: number) {
  const params: IListTspSubscriptionsReq = {
    pageNum,
    pageRows: 20,
    search: filter.searchString || '',
  };
  const response = await post<IListTspSubscriptionsReq, IListTspSubscriptionsRes>('subscriptions', params);
  //response.subscriptions.forEach((subscription) => {
    //subscription.image = mergeLink(subscription.image, 'imageDocuments');
  //});
  return response;
}

export async function deleteSubscription(id: number) {
  const params: ITspDeleteSubscriptionsReq = {
    id:id,
  };
  await post<ITspDeleteSubscriptionsReq, IBaseResponse>('tsc/subscriptiondelete', params);
}

