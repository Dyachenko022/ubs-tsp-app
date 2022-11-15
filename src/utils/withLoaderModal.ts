import { navigate, goBack } from '../rootNavigation';

/**
 * Хелпер для отображения модальной формы с лоадером. Внутри передаваемого промиса
 * нельзя делать навигацию!!!
 * @param promise
 */
export async function withLoaderModal<T>(promise: Promise<T>) {
  navigate('GlobalLoader');
  try {
    return await promise;
  } finally {
    goBack();
  }
}
