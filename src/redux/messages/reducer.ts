import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from './api';
import { AppDispatch, IReduxState } from '../store';
import { isAfter, parseISO } from 'date-fns';
import { showPopup } from '../globalPopup/actions';

interface IMessagesReduxState {
  messages: IMessage[],
  loading: boolean,
  type: 'incoming' | 'sent',
  countUnreadMessages: number,
}

const initialState: IMessagesReduxState = {
  messages: [],
  loading: false,
  type: 'incoming',
  countUnreadMessages: 0,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessages: (state: IMessagesReduxState, action: PayloadAction<AsyncResult<typeof api.getNotifications>>) => {
      state.messages = mergeMessages(state.messages, action.payload.notifications);
      state.countUnreadMessages = action.payload.countUnreadMessages;
    },
    setUnreadMessagesCount: (state: IMessagesReduxState, action: PayloadAction<number>) => {
      state.countUnreadMessages = action.payload;
    },
    markAsRead: (state: IMessagesReduxState, action: PayloadAction<string>) => {
      const message = state.messages.find((message) => message.guid === action.payload);
      if (message) {
        message.unread = false;
        state.messages = [...state.messages];
      }
    },
    setFilter: (state: IMessagesReduxState, action: PayloadAction<'incoming' | 'sent'>) => {
      state.type = action.payload;
      state.messages = [];
    },
  }
});

function getMessages(numPages = 1) {
  return async (dispatch: AppDispatch, getState: () => IReduxState) => {
    try {
      dispatch(messagesSlice.actions.setLoading(true));
      const response = await api.getNotifications(numPages, getState().messages.type === 'incoming');
      dispatch(messagesSlice.actions.setMessages(response));
    } catch (e) {
      console.error(e);
      dispatch(showPopup(e.textResult || 'Прозошла ошибка, пожалуйста, обратитесь в банк.'));
    } finally {
      dispatch(messagesSlice.actions.setLoading(false));
    }
  };
}

function markAsRead(guidMessage: string) {
  return (dispatch: AppDispatch) => {
    dispatch(messagesSlice.actions.markAsRead(guidMessage));
    void api.stateMessage(guidMessage);
  };
}

function mergeMessages(oldMessages: IMessage[], newMessages: IMessage[]) {
  const merged = [...oldMessages];
  const guidsHashes = new Set();
  oldMessages.forEach((item) => guidsHashes.add(item.guid));
  newMessages.forEach((newMessage) => {
    if (!guidsHashes.has(newMessage.guid)) {
      merged.push(newMessage);
    }
  });
  return merged.sort((a, b) => {
    const res = isAfter(parseISO(a.time), parseISO(b.time));
    return res ? -1 : 1;
  });
}

export const actions = {
  setFilter: messagesSlice.actions.setFilter,
  markAsRead,
  getMessages,
};
export default messagesSlice.reducer;
