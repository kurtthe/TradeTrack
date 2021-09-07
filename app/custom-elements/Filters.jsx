import React, { Component, createRef } from 'react';
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
import { Button } from 'react-native-paper';

const iconSearch = (
  <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
);
const { width } = Dimensions.get('screen');
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

  changeValuesFilters = (whoChange = false, value) => {
    if (whoChange === 'type') {
      this.setState({
        type: value,
      });
      actionSheetRef.current?.setModalVisible(false);
    }
    if (whoChange === 'date') {
      this.handleDatePicked(value);
    }
    if (whoChange === 'text') {
      this.setState({ textSearch: value });
    }
    if (!whoChange) {
      this.setState({
        dateStartValue: '',
        dateEndValue: '',
        type: '',
        textSearch: '',
      });
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

  onPressRadioButton = () => {
    actionSheetRef.current?.setModalVisible();
  };

  selectedOptionRadio = (options) => {
    const optionSelected = options.filter((item) => item.selected);
    const valueOption = optionSelected[0].value;
    this.changeValuesFilters('type', valueOption);
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
          onConfirm={(date) => this.changeValuesFilters('date', date)}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  };

  typeSearch = () => {
    return (
      <>
        <Block style={styles.contentFilterBtn}>
          <View style={{ marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>By Type</Text>
          </View>
          <Block>
            <FilterButton text={'Select'} onPress={() => this.onPressRadioButton()} />
          </Block>
        </Block>
        <ActionSheet ref={actionSheetRef}>
          <Block style={{ padding: 15, paddingBottom: 30 }}>
            <RadioGroup
              radioButtons={radioButtonsHour}
              color={nowTheme.COLORS.INFO}
              onPress={(option) => this.selectedOptionRadio(option)}
            />
          </Block>
        </ActionSheet>
      </>
    );
  };

  inputText = () => {
    return (
      <Input
        right
        color="black"
        autoFocus={false}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        style={styles.search}
        placeholder="By description or invoice number"
        onChangeText={(text) => changeValuesFilters('text', text)}
      />
    );
  };

  btnClearFilter = () => {
    return (
      <View style={styles.cleanFilter}>
        <Button
          mode="outlined"
          onPress={() => this.changeValuesFilters()}
          labelStyle={styles.labelCleanFilter}
          style={styles.btnClean}
        >
          Clear filter
        </Button>
      </View>
    );
  };

  render() {
    return (
      <>
        <Block style={styles.container}>
          {this.rangeDate()}
          {this.typeSearch()}
          {this.inputText()}
          {this.btnClearFilter()}
        </Block>
      </>
    );
  }
}

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
  cleanFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
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
