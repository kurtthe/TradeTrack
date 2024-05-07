import { FormatMoney } from 'format-money-js';

export class FormatMoneyService {
  static instance;

  constructor() {
    this.fm = new FormatMoney({
      decimals: 2,
    });
  }

  static getInstance() {
    if (!FormatMoneyService.instance) {
      FormatMoneyService.instance = new FormatMoneyService();
    }
    return FormatMoneyService.instance;
  }

  /* return object:
    {
    source: 12345.67,
    negative: false,
    fullAmount: '12,345.67',
    amount: '12,345',
    decimals: '.67',
    symbol: '$'
  }*/
  format(value) {
    if (value === undefined || value === null || !value) {
      return `$0.00`;
    }
    const valueFormat = this.fm.from(parseFloat(value), { symbol: '$' }, true);

    if (valueFormat.fullAmount === 'NaN') {
      return `$0.00`;
    }

    return `${valueFormat.symbol}${parseFloat(value) < 0 ? '-' : ''}${valueFormat.fullAmount}`;
  }

  clearFormat(value) {
    if (!value || value === undefined || value === null) {
      return '0';
    }
    const withoutSymbolize = value?.replace(/\$/g, '');
    const withoutComma = withoutSymbolize?.replace(',', '');

    return withoutComma;
  }
}
