import { startOfMonth, startOfDay, format, isYesterday, isToday, parseISO, isAfter } from 'date-fns';
import getUnixTime from 'date-fns/getUnixTime';
import { ru } from 'date-fns/locale';

/**
 * Группирует массив IOperationData по датам. Рекомендуется использовать
 * вместе с функцией мемоизации
 * @param {IOperationData[]} documents - Список документов, групировааный по датам.
 */
export function dateGroupedOperationsHelper(documents: IOperationData[]): IDateGroupedOperationData[] {
  const result: IDateGroupedOperationData[] = [];
  const map = new Map<number, IDateGroupedOperationData>();
  documents.forEach((document) => {
    const dateDocument = parseISO(document.date);
    let formatForDateOutput = 'dd.MM.yyyy HH:mm';
    let dateFormat = '';
    let unixEpoch = 0;

    if (isToday(dateDocument)) {
      dateFormat = 'Сегодня';
      formatForDateOutput = 'Сегодня HH:mm';
      unixEpoch = getUnixTime(startOfDay(dateDocument));
    } else if (isYesterday(dateDocument)) {
      dateFormat = 'Вчера';
      formatForDateOutput = 'Вчера HH:mm';
      unixEpoch = getUnixTime(startOfDay(dateDocument));
    } else {
      dateFormat = 'LLLL yyyy';
      unixEpoch = getUnixTime(startOfMonth(dateDocument));
    }

    const group = map.get(unixEpoch);
    if (group) {
      group.data.push({
        ...document,
        dateDocument,
        formattedDate: format(dateDocument, formatForDateOutput),
      });
    } else {
      map.set(unixEpoch, {
        unixEpoch,
        title: format(dateDocument, dateFormat, { locale: ru }),
        data: [{
          ...document,
          dateDocument,
          formattedDate: format(dateDocument, formatForDateOutput),
        }],
      });
    }
  });
  for (const data of map.entries()) {
    const grouped = data[1];
    grouped.data.sort((a, b) => isAfter(b.dateDocument, a.dateDocument) ? 1 : -1);
    result.push(data[1]);
  }
  return result.sort((a, b) => b.unixEpoch - a.unixEpoch);
}
