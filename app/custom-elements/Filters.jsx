import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import FilterButton from '@components/FilterButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon, Input } from "@components";

const iconSearch = (
  <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
);
const { width } = Dimensions.get("screen");

const Filters = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateStart, setDateStart] = useState(true);

  const handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);

    if (dateStart) {
      console.log('A date start');
    } else {
      console.log('A date end');
    }
    hideDateTimePicker();
  };

  const hideDateTimePicker = () => {
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = (isDateStart) => {
    setDateStart(isDateStart);
    setShowDatePicker(true);
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
              text={'Start date'}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => handleOpenDatePicker(true)}
            />
            <FilterButton
              text={'End date'}
              icon={require('@assets/imgs/img/calendar.png')}
              onPress={() => handleOpenDatePicker(false)}
            />
          </Block>
        </Block>
        <DateTimePicker
          isVisible={showDatePicker}
          onConfirm={handleDatePicked}
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
            <FilterButton text={'Select'} onPress={() => handleOpenDatePicker(true)} />
          </Block>
        </Block>
        <DateTimePicker
          isVisible={showDatePicker}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
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
      onChangeText={()=>null}
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
  search:{
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  }
});

export default Filters;
