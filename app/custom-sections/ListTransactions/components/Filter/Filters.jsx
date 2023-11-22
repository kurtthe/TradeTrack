import React, { Component, createRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Block, Text } from 'galio-framework';

import FilterButton from '@components/FilterButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { radioButtonsHour } from '@shared/dictionaries/types-radio-buttons';
import moment from 'moment';
import { AlertService } from '@core/services/alert.service';
import { Button } from 'react-native-paper';
import Search from '@custom-elements/Search';
import debounce from 'lodash.debounce';

const alertService = new AlertService();
const actionSheetRef = createRef();

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      dateStart: true,
      dateStartValue: '',
      dateEndValue: '',
      type: '',
      textSearch: '',
      idSelectedType: null,
      optionsType: radioButtonsHour,
    };
  }

  handleDatePicked = (date) => {
    const valueDate = moment(date).format('YYYY-MM-DD');

    if (this.state.dateStart) {
      this.setState({
        dateStartValue: valueDate,
      });
    } else {
      if (this.validDateEnd(valueDate)) {
        this.setState({
          dateEndValue: valueDate,
        });
      }
    }
    this.hideDateTimePicker();
  };

  validDateEnd = (date) => {
    if (this.state.dateStartValue === '') {
      return false;
    }

    const startDate = moment(this.state.dateStartValue);
    const endDate = moment(date);
    const diffDate = endDate.diff(startDate, 'days', true);

    if (diffDate < 0) {
      alertService.show('Alert!', 'The end date must be greater than or equal');
      return false;
    }
    return true;
  };

  hideDateTimePicker = () => {
    this.setState({ showDatePicker: false });
  };

  handleOpenDatePicker = (isDateStart) => {
    this.setState({
      dateStart: isDateStart,
      showDatePicker: true,
    });
  };

  resetFilters = () => {
    const resetOptionsSelected = this.state.optionsType.map((item) => {
      if (item.id === this.state.idSelectedType) {
        return {
          ...item,
          selected: false,
        };
      }

      return item;
    });

    this.setState({
      dateStartValue: '',
      dateEndValue: '',
      type: '',
      textSearch: '',
      idSelectedType: null,
      optionsType: resetOptionsSelected,
    });
  };

  debouncedOnChange = debounce(
    (whoChange, value) => this.changeValuesFilters(value, whoChange),
    300,
  );

  changeValuesFilters = (value, whoChange = false) => {
    console.log('=>whoChange', whoChange);
    console.log('=>value', value);

    if (whoChange === 'type') {
      this.setState({
        type: value,
      });
      actionSheetRef.current?.hide();
    }
    if (whoChange === 'date') {
      this.handleDatePicked(value);
    }
    if (whoChange === 'text') {
      this.setState({ textSearch: value });
    }

    if (!whoChange) {
      this.resetFilters();
    }

    setTimeout(() => {
      this.getDataFilters();
    }, 200);
  };

  getDataFilters = () => {
    const { dateStartValue, dateEndValue, type, textSearch } = this.state;

    const data = {
      start_date: dateStartValue,
      end_date: dateEndValue,
      type,
      search: textSearch,
    };
    this.props.getValues && this.props.getValues(data);
  };

  rangeDate = () => {
    return (
      <>
        <Block style={styles.contentFilterBtn}>
          <View style={{ marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>By Date</Text>
          </View>
          <Block row center space="around">
            <FilterButton
              text={this.state.dateStartValue === '' ? 'Start date' : this.state.dateStartValue}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => this.handleOpenDatePicker(true)}
            />
            <FilterButton
              text={this.state.dateEndValue === '' ? 'End date' : this.state.dateEndValue}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => this.handleOpenDatePicker(false)}
            />
          </Block>
        </Block>
        <DateTimePicker
          isVisible={this.state.showDatePicker}
          onConfirm={(date) => this.debouncedOnChange('date', date)}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  };

  typeSearch = () => {
    if (this.props.hideFilterType) {
      return null;
    }

    return (
      <Block style={styles.contentFilterBtn}>
        <View styletypeSearch={{ marginRight: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>By Type</Text>
        </View>
        <FlatList
          horizontal={true}
          data={this.state.optionsType}
          renderItem={({item})=> (
            <FilterButton
              text={item.label}
              onPress={() => null}
            />
          )}
          keyExtractor={(_, index)=> `button-filters${index}`}
        />
      </Block>
    );
  };

  btnClearFilter = () => {
    return (
      <Block style={styles.contentFilterBtn}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Search</Text>
        </View>
        <Block>
          <View style={styles.cleanFilter}>
            <Button
              mode="outlined"
              onPress={() => this.debouncedOnChange()}
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

  render() {
    return (
        <View style={styles.container}>
          {this.btnClearFilter()}
          {this.rangeDate()}
          {this.typeSearch()}
          <Search
            inputStyle={styles.inputStyle}
            placeholder="By description or invoice number"
            onChangeText={(text) => this.debouncedOnChange('text', text)}
          />
        </View>
    );
  }
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
