/**
 * Helper для постановки лоадера при запросе. На вход промис запроса и сеттер лоадера
 * @param {string} request - Промис от запроса
 * @param {string} loaderSetter - Функция, по которой при параметре true выставляется сеттер, при false
 *  - сеттер убирается
 */
export async function loaderOnRequest(request: Promise<any>, loaderSetter: (value: boolean) => void) {
  try {
    loaderSetter(true);
    await request;
  } finally {
    loaderSetter(false);
  }
}
