import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExecuteRes } from './api';


interface IDocumentReduxState {
  currentGroupIndex: number,
  requestBound: Array<IRequestBound>,
  groupInput: string,
  nameForm: string,
  nameButton: string | null,
  linkInfo: string | null,
  linkContract: string | null,
  descriptionForm: string,
  pathImage: string,
}

interface IRequestBound {
  indexStart: number,
  sidRequest: string,
  groups: Array<IFieldsGroup>,
  values: IParameter[],
  listValues: Array<{
    name: string,
    value: any,
  }>,
}

const initialState: IDocumentReduxState = {
  currentGroupIndex: 0,
  requestBound: [],
  groupInput: '',
  nameForm: '',
  nameButton: null,
  linkInfo: null,
  linkContract: null,
  descriptionForm: '',
  pathImage: '',
};

const documentSlice = createSlice({
  name: 'document',
  initialState: { ...initialState },
  reducers: {

    clear: (state) => {
      state = initialState;
    },
    setInitialDocument: (state, action: PayloadAction<IExecuteRes>) => {
      const payload = action.payload;
      state.currentGroupIndex = 0;
      state.requestBound = [{
        values: payload.values,
        listValues: payload.listValues,
        sidRequest: payload.sidRequest,
        groups: payload.inputFields,
        indexStart: 0,
      }];
      state.descriptionForm = payload.descriptionForm;
      state.nameForm = payload.nameForm;
      state.nameButton = payload.nameButton;
      state.pathImage = payload.pathImage;
      state.linkInfo = payload.linkInfo;
      state.linkContract = payload.linkContract;
      state.groupInput = payload.groupInput;
    },
    setAdditionalData: (state, action: PayloadAction<IExecuteRes>) => {

    },
    moveToNextGroup: (state) => {
      state.currentGroupIndex += 1;
    },
    moveToPreviousGroup: (state) => {
      if (state.currentGroupIndex > 0) {
        state.currentGroupIndex -= 1;
        const fallback = state.requestBound.findIndex((item) => item.indexStart === state.currentGroupIndex);
        if (fallback > 0) {
          state.requestBound = state.requestBound.slice(0, 1);
        }
      }
    }
  },
});

export default documentSlice.reducer;

export const {
  setInitialDocument,
  moveToNextGroup,
  moveToPreviousGroup,
  setAdditionalData,
} = documentSlice.actions;
