import { SET_NDS, SET_THEME_SETTINGS, setNds, setThemeSettings } from './actions';
import { AnyAction } from '@reduxjs/toolkit';

interface ISettingsState  {
  ndsList: number[],
  nds: number,
  useAutoTheme: boolean,
  useDarkTheme: boolean,
}

const initialState: ISettingsState = {
  useAutoTheme: false,
  useDarkTheme: false,
  ndsList: [10, 18, 20],
  nds: 10,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_THEME_SETTINGS: {
      const setSettingsPayload = (action as ReturnType<typeof setThemeSettings>).payload;
      return {
        ...state,
        useAutoTheme: setSettingsPayload.useAutoTheme,
        useDarkTheme: setSettingsPayload.useDarkTheme,
      };
    }
    case SET_NDS: {
      const setNdsPayload = (action as ReturnType<typeof setNds>).payload;
      return {
        ...state,
        nds: setNdsPayload.nds,
        ndsList: setNdsPayload.ndsList ? setNdsPayload.ndsList.map((item) => Number(item.nds)) : state.ndsList,
      };
    }
    default:
      return state;
  }
}
