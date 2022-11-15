import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  selectedAccountIndex: number | undefined,
  accounts: IAccountDetails[],
}

const initialState: IState = {
  selectedAccountIndex: undefined,
  accounts: [],
};


const accountsReducerSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {
    setAccounts: (state: IState, action: PayloadAction<IAccountDetails[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const reducerActions = {
  setAccounts: accountsReducerSlice.actions.setAccounts,
};

export default accountsReducerSlice.reducer;

