import { AnyAction } from '@reduxjs/toolkit';
import { isAfter, parseISO } from 'date-fns';

interface IState {
  subscrPurpose: string,
  subscrPayerId: string,
  loading: boolean,
}

const initialState: IState = {
  loading: true,
  subscrPurpose: "",
  subscrPayerId: "",
};

export default function reducer(state=initialState, action: AnyAction) {
  return state;
};
