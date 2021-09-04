import React, { useState, createRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import FilterButton from '@components/FilterButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon, Input } from '@components';
import ActionSheet from 'react-native-actions-sheet';
import RadioGroup from 'react-native-radio-buttons-group';
import { radioButtonsHour } from '@shared/dictionaries/types-radio-buttons';
import nowTheme from '@constants/Theme';
import moment from 'moment';
import { AlertService } from '@core/services/alert.service';

const iconSearch = (
  <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
);
const { width } = Dimensions.get('screen');
const alertService = new AlertService();

const Filters = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateStart, setDateStart] = useState(true);
  const [dateStartValue, setDateStartValue] = useState('');
  const [dateEndValue, setDateEndValue] = useState('');
  const [type, setType] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const actionSheetType = createRef();

  const handleDatePicked = (date) => {
    const valueDate = moment(date).format('YYYY-MM-DD');

    if (dateStart) {
      setDateStartValue(valueDate);
    } else {
      if (validDateEnd(valueDate)) {
        console.log('set dateend');
        setDateEndValue(valueDate);
      }
    }
    hideDateTimePicker();
  };

  const validDateEnd = (date) => {
    if (dateStartValue === '') {
      return false;
    }

    const startDate = moment(dateStartValue);
    const endDate = moment(date);
    const diffDate = endDate.diff(startDate, 'days', true);

    if (diffDate < 0) {
      alertService.show('Alert!', 'The end date must be greater than or equal');
      return false;
    }
    return true;
  };

  const hideDateTimePicker = () => {
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = (isDateStart) => {
    setDateStart(isDateStart);
    setShowDatePicker(true);
  };

  changeValuesFilters = (whoChange, value) => {
    if (whoChange === 'type') {
      setType(value);
    }
    if (whoChange === 'date') {
      handleDatePicked(value);
    }
    if (whoChange === 'text') {
      setTextSearch(value);
    }
    getDataFilters();
  };

  const getDataFilters = () => {
    const data = {
      start_date: dateStartValue,
      end_date: dateEndValue,
      type: type,
      search: textSearch,
    };
    setTimeout(() => {
      props.getValues && props.getValues(data);
    }, 500);
  };

  const onPressRadioButton = () => {
    actionSheetType.current?.setModalVisible(false);
  };

  const rangeDate = () => {
    return (
      <>
        <Block style={styles.contentFilterBtn}>
          <View style={{ marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>By Date</Text>
          </View>
          <Block row center space="around">
            <FilterButton
              text={dateStartValue === '' ? 'Start date' : dateStartValue}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => handleOpenDatePicker(true)}
            />
            <FilterButton
              text={dateEndValue === '' ? 'End date' : dateEndValue}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => handleOpenDatePicker(false)}
            />
          </Block>
        </Block>
        <DateTimePicker
          isVisible={showDatePicker}
          onConfirm={(date) => changeValuesFilters('date', date)}
          onCancel={hideDateTimePicker}
        />
      </>
    );
  };

  const typeSearch = () => {
    return (
      <>
        <Block style={styles.contentFilterBtn}>
          <View style={{ marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>By Type</Text>
          </View>
          <Block>
            <FilterButton text={'Select'} onPress={() => onPressRadioButton()} />
          </Block>
        </Block>
        <ActionSheet ref={actionSheetType} headerAlwaysVisible>
          <Block style={{ height: 'auto', padding: 15, paddingBottom: 30 }}>
            <RadioGroup
              radioButtons={radioButtonsHour}
              color={nowTheme.COLORS.INFO}
              onPress={(option) => changeValuesFilters('type', option)}
            />
          </Block>
        </ActionSheet>
      </>
    );
  };

  const inputText = () => {
    return (
      <Input
        right
        color="black"
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        style={styles.search}
        placeholder="By description or invoice number"
        onChangeText={(text) => changeValuesFilters('text', text)}
      />
    );
  };

  return (
    <>
      <Block style={styles.container}>
        {rangeDate()}
        {typeSearch()}
        {inputText()}
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  contentFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  search: {
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  },
});

export default Filters;
