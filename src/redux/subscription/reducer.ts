import { AnyAction } from '@reduxjs/toolkit';
import * as types from './types';
import { setFilter } from './actions';
import { IListSubscriptionsAction } from './types';
import { isAfter, parseISO } from 'date-fns';

interface IState {
  subscriptions: ISubscriptionData[],
  filter: ISubscriptionsFilter,
  countSubscriptions: number,
  loading: boolean,
}

const initialState: IState = {
  loading: true,
  subscriptions: [],
  countSubscriptions: 0,
  filter: {
    searchString: '',
  }
};

export default function reducer(state=initialState, action: AnyAction) {
  switch (action.type) {
    case types.LIST_SUBSCRIPTIONS_START_REQ:
      return  {
        ...state,
        loading: true,
      };
    case types.SET_FILTER:
      return  {
        ...state,
        filter: {
          ...state.filter,
          ...(action as ReturnType<typeof setFilter>).payload.filter,
        }
      };
    case types.LIST_SUBSCRIPTIONS_REQ_SUC: {
      const listSubscriptionsAction = action as IListSubscriptionsAction;
      let subscriptions: ISubscriptionData[];
      if (listSubscriptionsAction.payload.clearPrevious) {
        subscriptions = listSubscriptionsAction.payload.subscriptions;
      } else {
        subscriptions = [...state.subscriptions];
        const newSubscriptionsMap = new Map<number, ISubscriptionData>();
        listSubscriptionsAction.payload.subscriptions.forEach((subscription) => newSubscriptionsMap.set(subscription.id, subscription));

        // Обновим существующие документы
        for (let i = 0; i<subscriptions.length; i++) {
          if (newSubscriptionsMap.has(subscriptions[i].id)) {
            subscriptions[i] = newSubscriptionsMap.get(subscriptions[i].id) as ISubscriptionData;
            newSubscriptionsMap.delete(subscriptions[i].id);
          }
        }

        // Если есть новые документы, то добавим их в массив документов
        if (newSubscriptionsMap.size > 0) {
          newSubscriptionsMap.forEach((value) => {
            subscriptions.push(value);
          });
        }
        //subscriptions = subscriptions.sort((doc1, doc2) =>
        //  isAfter(parseISO(doc1.date) , parseISO(doc2.date)) ? -1 : 1
        //);

      }
      return {
        ...state,
        loading: false,
        subscriptions,
        countSubscriptions: listSubscriptionsAction.payload.countSubscriptions,
      };
    }
    case types.LIST_SUBSCRIPTIONS_REQ_ERR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
