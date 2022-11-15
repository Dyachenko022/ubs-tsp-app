import { format, parseISO } from 'date-fns';

const scheme = {'Ё':'YO','Й':'I','Ц':'TS','У':'U','К':'K','Е':'E','Н':'N','Г':'G','Ш':'SH','Щ':'SCH','З':'Z','Х':'H','Ъ':'\'','ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'\'','Ф':'F','Ы':'I','В':'V','А':'a','П':'P','Р':'R','О':'O','Л':'L','Д':'D','Ж':'ZH','Э':'E','ф':'f','ы':'i','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','Я':'Ya','Ч':'CH','С':'S','М':'M','И':'I','Т':'T','Ь':'\'','Б':'B','Ю':'YU','я':'ya','ч':'ch','с':'s','м':'m','и':'i','т':'t','ь':'\'','б':'b','ю':'yu'};
const letterTransform = (letter: string) => scheme[letter] ? scheme[letter] : (/[a-zA-Z0-9\-=\.]/.test(letter) ? letter : '');

/**
 * Функция переводит текст с кириллицы на латиницу
 */
export function transliterate(text: string) {
  return text.split('').map(letterTransform).join('');
}

/**
 * Функция для вывода номера счета в формате xxxxx.xxx.x.xxxx.xxxxxxx
 */
export function formatAccountNumber(acc: string) {
  if (acc.length !== 20) return acc;
  return `${acc.substring(0,5)}.${acc.substring(5,8)}.${acc.substring(8,9)}.${acc.substring(9,13)}.${acc.substring(13,20)}`;
}

/**
 * Форматирует строку с датой-веременем в формате ISO в строку с датой
 * @param isoDate
 * @param showTime
 */
export function formatIsoDate(isoDate: string, showTime = false) {
  if (!isoDate) return '';
  const formatStr = showTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy';
  return format(parseISO(isoDate), formatStr);
}
