import nowTheme from '@constants/Theme';

const styleLabel = {
  fontWeight: 'bold',
};
const styleContainer = {
  padding: 2,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
};

export const optionsOthers = [
  {
    id: 4,
    label: 'CASH SALE',
    value: 'Cash Sale',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
  {
    id: 5,
    label: 'CASH REFUND',
    value: 'Cash Refund',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
  {
    id: 2,
    label: 'CREDIT NOTE',
    value: 'Credit Note',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
]

export const radioButtonTypeTransactions = [
  {
    id: 1,
    label: 'INVOICE',
    value: 'Invoice',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
  {
    id: 6,
    label: 'ORDER',
    value: 'Order',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
  {
    id: 3,
    label: 'QUOTE',
    value: 'Quote',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
  {
    id: 3333,
    label: 'OTHER V',
    value: 'Other',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer,
    selected: false,
  },
];

