import { AppDispatch } from '../store';

export const SET_THEME_SETTINGS = 'settings/SET_THEME_SETTINGS';
export const SET_NDS = 'settings/SET_NDS';
import { setNds as reqSetNds } from './api';
import { showPopup } from '../globalPopup/actions';

export function changeNds(nds: number) {
  return async (dispatch: AppDispatch) => {
    try {
      await reqSetNds(nds);
      dispatch(setNds(nds));
    } catch (e) {
      dispatch(showPopup(e.textResult || 'Прозошла ошибка, пожалуйста, обратитесь в банк'));
    }
  };
}

export function setThemeSettings(useAutoTheme: boolean, useDarkTheme: boolean) {
  return {
    type: SET_THEME_SETTINGS,
    payload: {
      useAutoTheme,
      useDarkTheme,
    },
  };
}

export function setNds(nds: number, ndsList: Array<{nds: string}> | undefined = undefined) {
  return {
    type: SET_NDS,
    payload: {
      nds,
      ndsList,
    }
  };
}
