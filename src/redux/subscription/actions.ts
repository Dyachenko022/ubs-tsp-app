import * as api from './api';
import { AppDispatch, IReduxState } from '../store';
import * as types from './types';
import { errorPopupHelper, showErrorPopup, showPopup } from '../globalPopup/actions';
import { Alert } from 'react-native';

export function getSubscriptions(clearPrevious = false, pageNum = 1) {
  return async(dispatch: AppDispatch, getState: () => IReduxState) => {
    try {
      dispatch({ type: types.LIST_SUBSCRIPTIONS_START_REQ });
      const filter = getState().subscriptions.filter;
      const result = await api.listSubscriptions(filter, pageNum);
      const subscriptions: ISubscriptionData[] = result.subscriptions.map((subscription) => ({
        id: subscription.id,
        date: subscription.timeCreate,
        state: subscription.state,
        stateName: subscription.stateName,
        description: subscription.note,
        correspCode: subscription.correspCode,
      }));

      dispatch({
        type: types.LIST_SUBSCRIPTIONS_REQ_SUC,
        payload: {
          subscriptions,
          clearPrevious,
          countSubscriptions: result.countSubscriptions,
        }
      });
    } catch (e) {
      dispatch(errorPopupHelper(e as RequestException));
      dispatch({ type: types.LIST_SUBSCRIPTIONS_REQ_ERR });
    }
  };
}

export function deleteSubscription(id:number)
{
  return async(dispatch: AppDispatch, getState: () => IReduxState) => {
    try {
      const result = await api.deleteSubscription(id);
      dispatch({
        type: types.SUBSCRIPTIONS_DEL_REQ_SUC,
        payload: {
          id:id,
        }
      });
    } catch (e) {
      dispatch(errorPopupHelper(e as RequestException));
      dispatch({ type: types.SUBSCRIPTIONS_DEL_REQ_ERR });
    }
  };
}

export function setFilter(filter: ISubscriptionsFilter) {
  return {
    type: types.SET_FILTER,
    payload: { filter },
  };
}
