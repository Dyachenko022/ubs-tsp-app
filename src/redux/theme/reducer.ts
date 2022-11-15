import { SET_THEME } from './actions';
import { Appearance } from 'react-native';

const initialState = {
  theme: 'light',
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_THEME: {
      return {
        ...state,
        theme: action.payload as string,
      };
    }
  }

  return state;
}
