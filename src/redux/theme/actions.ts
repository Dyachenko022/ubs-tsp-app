export const SET_THEME = 'theme/set_theme';

export function setTheme(theme: string) {
  return {
    type: SET_THEME,
    payload: theme
  };
}
