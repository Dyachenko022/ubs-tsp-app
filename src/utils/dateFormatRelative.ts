import ru from 'date-fns/esm/locale/ru';
import formatRelative from 'date-fns/formatRelative';
import { format } from 'date-fns';

const formatRelativeLocale: any = {
  yesterday: 'Вчера',
  today: 'Сегодня',
  lastWeek: 'dd.MM.yyyy',
  tomorrow: 'dd.MM.yyyy',
  nextWeek: 'dd.MM.yyyy',
  other: 'dd.MM.yyyy',
};

const locale = {
  ...ru,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export function dateFormatRelative(date: Date): string {
  return formatRelative(date, new Date(), { locale });
}

/**
 * Возвращает название месяца в именительном падеже и с заглавной буквы
 * @param date дата
 */
export function month(date: Date): string {
  const monthName = format(date, 'LLLL', { locale: ru });
  return monthName.charAt(0).toUpperCase() + monthName.substring(1);
}
