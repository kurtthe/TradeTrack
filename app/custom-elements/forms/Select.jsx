import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { nowTheme } from '@constants';

const Select = (props) => {
  const handleChangeOptions = (option) => {
    props.onchange && props.onchange(option);
  };

  return (
    <RNPickerSelect
      placeholder={{ label: 'Select an option' }}
      textInputProps={{ color: '#8898AA' }}
      pickerProps={{ style: { height: 45, overflow: 'hidden' } }}
      style={{
        placeholder: styles.pickerText,
        viewContainer: styles.pickerContainer,
        inputAndroid: { color: nowTheme.COLORS.PICKERTEXT },
      }}
      onValueChange={(value) => handleChangeOptions(value)}
      items={[...props.options]}
    />
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    height: 45,
    marginBottom:7
  },
  pickerText: {
    color: nowTheme.COLORS.PICKERTEXT,
  }
});

export default Select;
