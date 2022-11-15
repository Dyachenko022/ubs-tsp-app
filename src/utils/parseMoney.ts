export default function parseMoney(number = 0, cur = 'RUB', n = 2, x = 3, s = ' ', c = '.') {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  let num = Number(number).toFixed(Math.max(0, ~~n));

  const pennies = num.toString().split('.')[1];

  let currency = cur || 'RUB';
  switch (cur) {
    case 'RUB':
    case 'RUR':
      currency = '₽';
      break;
    case 'USD':
      currency = '$';
      break;
    case 'EUR':
      currency = '€';
      break;
    case 'GBP':
      currency = '£';
      break;
    case 'CHF':
      currency = '₣';
      break;
    default:
      currency = cur;
      break;
  }
  return `${(c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))} ${currency}`;
}
