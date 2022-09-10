import { nowTheme } from '@constants/index';

export const setOptionsPicker = (data, toSame) => {

  data.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

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