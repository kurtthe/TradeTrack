import nowTheme from '@constants/Theme';

const styleLabel = {
  fontWeight: 'bold'
};
const styleContainer = {
  padding: 2,
  width: '40%',
  flexDirection: 'row',
  alignItems: 'center',
}

export const radioButtonsHour = [
  {
    id: 1,
    label: 'INVOICE',
    value: 'Invoice',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
  {
    id: 2,
    label: 'CREDIT NOTE',
    value: 'Credit Note',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
  {
    id: 3,
    label: 'QUOTE',
    value: 'Quote',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
  {
    id: 4,
    label: 'CASH SALE',
    value: 'Cash Sale',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
  {
    id: 5,
    label: 'CASH REFUND',
    value: 'Cash Refund',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
  {
    id: 6,
    label: 'ORDER',
    value: 'Order',
    color: nowTheme.COLORS.INFO,
    labelStyle: styleLabel,
    containerStyle: styleContainer
  },
];
