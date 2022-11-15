import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGlobalLoaderReduxState {
  loading: boolean,
}

const initialState: IGlobalLoaderReduxState = {
  loading: false,
};

export const messagesSlice = createSlice({
  name: 'globalLoader',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  }
});

export const actions = {
  setLoading: messagesSlice.actions.setLoading,
};
export default messagesSlice.reducer;
