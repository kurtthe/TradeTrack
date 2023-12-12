import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Block, Text } from 'galio-framework';

import FilterButton from '@components/FilterButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { radioButtonTypeTransactions, optionsOthers } from '@shared/dictionaries/types-radio-buttons';
import moment from 'moment';
import { AlertService } from '@core/services/alert.service';
import { Button } from 'react-native-paper';
import Search from '@custom-elements/Search';
import { BottomSheet } from 'react-native-sheet';
import RadioGroup from 'react-native-radio-buttons-group';
import nowTheme from '@constants/Theme';


const Filters = ({getValues, hideFilterType}) => {

  const alertService = new AlertService();
  const actionSheetRef = React.createRef();

  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [dateStart, setDateStart] = React.useState(true)
  const [dateStartValue, setDateStartValue] = React.useState('')
  const [dateEndValue, setDateEndValue] = React.useState('')
  const [type, setType] = React.useState('')
  const [textSearch, setTextSearch] = React.useState('')
  const [idSelectedType, setIdSelectedType] = React.useState(null)

  React.useEffect(()=> {
    getDataFilters()
  }, [type])
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

  const handleDatePicked = (date) => {
    const valueDate = moment(date).format('YYYY-MM-DD');
    hideDateTimePicker()

    if (dateStart) {
      setDateStartValue(valueDate)
      return
    }

    if (validDateEnd(valueDate)) {
      setDateEndValue(valueDate)
    }

  };

  const hideDateTimePicker = () => {
    setShowDatePicker(false)
  };
  const resetFilters = () => {
    setDateStartValue('')
    setDateEndValue('')
    setType('')
    setTextSearch('')
    setIdSelectedType(null)
  };

  const handleOpenDatePicker = (isDateStart) => {
    setDateStart(isDateStart)
    setShowDatePicker(true)
  };

  const debouncedOnChange = (whoChange, value) => {
    setTimeout(() => changeValuesFilters(value, whoChange), 300)
  }

  const changeValuesFilters = (value, whoChange) => {

    if (whoChange === 'type') {
      actionSheetRef.current?.hide();
    }
    if (whoChange === 'date') {
      handleDatePicked(value);
    }
    if (whoChange === 'text') {
      setTextSearch(value)
    }
    if (!whoChange) {
      resetFilters();
    }
    getDataFilters();
  };

  const getDataFilters = () => {
    const data = {
      start_date: dateStartValue,
      end_date: dateEndValue,
      type,
      search: textSearch,
    };

    console.log("getDataFilters:: data", data)
    getValues && getValues(data);
  };
  const changeSelectedTypeButton = (optionSelected) => {
    console.log("optionSelected::", optionSelected)
      setIdSelectedType(optionSelected.id)
    if(optionSelected.value === "Other"){
      return actionSheetRef.current?.show();
    }
    setType(optionSelected.value);
  };

  const selectedOptionRadio = (options) => {
    const optionSelected = options.find((item) => item.selected);
    setIdSelectedType(optionSelected.id)
    setType(optionSelected.value);
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
          onConfirm={(date) => debouncedOnChange('date', date)}
          onCancel={hideDateTimePicker}
        />
      </>
    );
  };

  const typeSearch = () => {
    if (hideFilterType) {
      return null;
    }
    const isOtherFilterSelected = idSelectedType === 5 || idSelectedType === 4 || idSelectedType === 2
    return (
      <>
        <Block style={styles.contentFilterBtn}>
          <View styletypeSearch={{ marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>By Type</Text>
          </View>
          <FlatList
            contentContainerStyle={{paddingHorizontal: 15}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={radioButtonTypeTransactions}
            renderItem={({item})=> (
              <FilterButton
                text={item.label}
                onPress={() => changeSelectedTypeButton(item)}
                selected={item.id === 3333 && isOtherFilterSelected? true: idSelectedType === item.id}
              />
            )}
            keyExtractor={(_, index)=> `button-filters${index}`}
          />
        </Block>

        <BottomSheet height={400} ref={actionSheetRef}>
          <Block style={{ height: 'auto', padding: 5, paddingBottom: 40 }}>
            <RadioGroup
              radioButtons={optionsOthers}
              color={nowTheme.COLORS.INFO}
              onPress={(option) => selectedOptionRadio(option)}
              selected={false}
            />
          </Block>
        </BottomSheet>
      </>

    );
  };

  const btnClearFilter = () => {
    return (
      <Block style={styles.contentFilterBtn}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Search</Text>
        </View>
        <Block>
          <View style={styles.cleanFilter}>
            <Button
              mode="outlined"
              onPress={() => debouncedOnChange()}
              labelStyle={styles.labelCleanFilter}
              style={styles.btnClean}
            >
              Clear
            </Button>
          </View>
        </Block>
      </Block>
    );
  };

  return (
    <View style={styles.container}>
      {btnClearFilter()}
      {rangeDate()}
      {typeSearch()}
      <Search
        inputStyle={styles.inputStyle}
        placeholder="By description or invoice number"
        onChangeText={(text) => debouncedOnChange('text', text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
    height: '35%'
  },
  contentFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cleanFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    width: '90%',
  },
  labelCleanFilter: {
    fontSize: 13,
    color: '#000',
  },
  btnClean: {
    backgroundColor: '#fff',
  },
});

export default Filters;
