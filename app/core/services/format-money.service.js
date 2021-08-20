import {FormatMoney} from 'format-money-js';

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
    const valueFormat = this.fm.from(parseInt(value), { symbol: '$' }, true);
    return `${valueFormat.symbol}${valueFormat.fullAmount}`
  }
}
