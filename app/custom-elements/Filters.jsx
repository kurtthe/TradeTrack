import React, { useState } from 'react';
import { Block } from 'galio-framework';
import FilterButton from '@components/FilterButton';
import DateTimePicker from 'react-native-modal-datetime-picker';

const Filters = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    hideDateTimePicker();
  };

  const hideDateTimePicker = () => {
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <>
      <Block
        row
        space={'evenly'}
        width={'60%'}
        style={{ justifyContent: 'space-evenly', marginLeft: '-2%' }}
      >
        <FilterButton
          text={'By Date'}
          icon={require('@assets/imgs/img/calendar.png')}
          onPress={handleOpenDatePicker}
        />
      </Block>

      <DateTimePicker
        isVisible={showDatePicker}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
    </>
  );
};

export default Filters;
