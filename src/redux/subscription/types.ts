import { AnyAction } from '@reduxjs/toolkit';

export interface IListSubscriptionsAction extends AnyAction  {
  payload: {
    subscriptions: ISubscriptionData[],
    clearPrevious: boolean,
    countSubscriptions: number,
  }
}

export const LIST_SUBSCRIPTIONS_START_REQ = 'subscription/listSubscriptionsReq';
export const LIST_SUBSCRIPTIONS_REQ_SUC = 'subscription/listSubscriptionsReq_SUC';
export const LIST_SUBSCRIPTIONS_REQ_ERR = 'subscription/listSubscriptionsReq_ERR';

export const SUBSCRIPTIONS_DEL_REQ_SUC = 'subscription/DeleteSubscriptionsReq_SUC';
export const SUBSCRIPTIONS_DEL_REQ_ERR = 'subscription/DeleteSubscriptionsReq_ERR';

export const SET_FILTER = 'subscription/set_FILTER';
