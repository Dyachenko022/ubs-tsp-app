import { IReduxState } from '../store';
import { createSelector } from 'reselect';

/**
 * Селектор, который возвращает последние 10 документов
 */
export const lastTenDocumentsSelector = createSelector(
  (state: IReduxState) => state.history.documents,
  (documents) => documents.slice(0, 10)
);
