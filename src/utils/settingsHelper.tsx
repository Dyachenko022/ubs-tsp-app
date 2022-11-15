import AsyncStorage from '@react-native-async-storage/async-storage';
import BankTheme from '../bankTheme';

/** Возвращает значение НДС для расчета
 * @param {number} nds - Значение НДС в процентах
 * **/
export function ndsToValue(nds: number): number {
  return nds / (100.0 + nds);
}

export async function saveSettings(settings: ISettings) {
  let themeType: 'auto' | 'dark' | 'light' = 'auto';
  if (!settings.useAutoTheme) {
    if (settings.useDarkTheme) themeType = 'dark';
    else themeType = 'light';
  }
  BankTheme.setThemeType(themeType);
}

export async function loadSettings(): Promise<ISettings> {
  const themeType = await BankTheme.loadThemeType();
  const useAutoTheme = themeType === 'auto';
  const useDarkTheme = themeType === 'dark';
  return {
    useDarkTheme,
    useAutoTheme,
  };
}

/***
 * Возвращает массив абонентов, сохраненных на устройстве. Если ни один абонент не сохранен,
 * то возвращается пустой массив
 */
export async function getAbonentsList(): Promise<AbonentListEntry[]> {
  const strList = await AsyncStorage.getItem('abonentList');
  if (strList) {
    return JSON.parse(strList) as AbonentListEntry[];
  } else {
    return [];
  }
}

/***
 * Удаляет абонента из списка сохраненных абонентов
 * @param login
 */
export async function removeAbonentFromList(login: string): Promise<void> {
  let list = await getAbonentsList();
  list = list.filter((abonent) => abonent.login !== login);
  await AsyncStorage.setItem('abonentList', JSON.stringify(list));
}

export async function removeAbonentFromListById(contractId: number): Promise<void> {
  let list = await getAbonentsList();
  list = list.filter((abonent) => abonent.contractId !== contractId);
  await AsyncStorage.setItem('abonentList', JSON.stringify(list));
}


/***
 * Добавлеяет абонента в список абонентов, которые сохраняются на устройстве
 * @param abonentName
 * @param login
 * @param contractId
 * @param uid
 * @param useShortCode
 */
export async function addAbonentToList(abonentName: string, login: string, contractId: number, uid: string, useShortCode: boolean) {
  const abonentsArray = await getAbonentsList();
  const foundValue = abonentsArray.find((abonent) => abonent.abonentName === abonentName);
  if (foundValue) {
    foundValue.login = login;
    foundValue.contractId = contractId;
    foundValue.uid = uid;
    foundValue.useShortCode = useShortCode;
  } else {
    abonentsArray.push({ abonentName, login, contractId, uid, useShortCode });
  }
  await AsyncStorage.setItem('abonentList', JSON.stringify(abonentsArray));
}
