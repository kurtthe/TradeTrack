import { nowTheme } from '@constants/index';

export const setOptionsPicker = (data=[], toSame) => {


  return data.map((c) => ({
    ...c,
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
    label: c.name,
    value: c.name,
    selected: toSame && c.name === toSame.name && c.id === toSame.id,
  }));
};

export const resetValueSelect = (listData = []) => {
  return listData.map((item) => {
    return {
      ...item,
      selected: false,
    };
  });
};