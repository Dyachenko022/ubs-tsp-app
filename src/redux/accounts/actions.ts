import * as api from './api';
import { AppDispatch } from '../store';
import { reducerActions } from './reducer';

/**
 * Сделает запрос 'accounts' и запишет в reducer счета.
 * @returns ThunkAction
 */
export function getAccounts() {
  return async (dispatch: AppDispatch) => {
    const accountsResponse = await api.getAccounts();
    const accounts: IAccountDetails[] = [];
    accountsResponse.accounts.forEach((account) => {
      accounts.push({
        id: account.id,
        balance: account.balanceRub,
        numAccount: account.account,
        accountName: account.description,
        state: account.state,
        dateOpen: account.dateOpen,
        productName: 'productName',
        restrictions: account.stopList || [],
        currency: account.currency,
        currencyName: account.currencyName,
      });
    });
    dispatch(reducerActions.setAccounts(accounts));
  };
}

/**
 * Установит название счета по его ИД и обновит список счетов
 * @param id ИД. счета
 * @param description Название счета
 */
export function setDescriptionAccountAndRefresh(id: number, description: string) {
  return async (dispatch: AppDispatch) => {
    await api.setDescriptionProduct(id, description);
    await dispatch(getAccounts());
  };
}
