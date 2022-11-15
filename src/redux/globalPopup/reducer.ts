import * as actions from './actions';

interface IGlobalPopup {
  shown: boolean,
  text: string,
  type: PopupType,
}

const initialState: IGlobalPopup = {
  shown: false,
  text: '',
  type: 'error',
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SHOW_POPUP:
      return {
        shown: true,
        text: action.payload.text as string,
        type: action.payload.type as PopupType,
      };
    case actions.HIDE_POPUP:
      return {
        ...state,
        shown: false,
      };
    default:
      return state;
  }
}
