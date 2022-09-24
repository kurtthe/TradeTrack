import { Block, Input, Text } from 'galio-framework';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { useEffect, useState } from 'react';
import PickerButton from '@custom-elements/PickerButton';
import PickerButtonDelivery from '@custom-elements/PickerButton';
import { nowTheme } from '@constants/index';
import { Dimensions, StyleSheet } from 'react-native';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';

import {useDispatch} from 'react-redux'
import {setUpDelivery} from '@core/module/store/placeOrders/placeOrders'

const { width } = Dimensions.get('screen');


const Delivery = ({onChangeDelivery}) => {
  const dispatch = useDispatch()

  const [optionDeliveries, setOptionsDeliveries] = useState()
  const [optionHours, setOptionsHours] = useState()
  const [optionDeliverySelected, setOptionDeliverySelected] = useState()
  const [optionHourSelected, setOptionHourSelected] = useState()
  const [deliveryText, setDeliveryText] = useState()
  const [locationSelected, setLocationSelected] = useState()
  const [dateSelected, setDateSelected] = useState()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  useEffect(()=>{
    setOptionsDeliveries(radioButtonsDelivery)
    setOptionsHours(radioButtonsHour)
  },[])

  useEffect(()=>{
    const dataDelivery = {
      delivery: optionDeliverySelected,
      location: locationSelected,
      date: dateSelected,
      time: optionHourSelected
    }

    dispatch(setUpDelivery(dataDelivery))
  },[optionHourSelected, locationSelected, optionHourSelected, optionDeliverySelected, dateSelected])

  const handleChangeDelivery = (optionSelected) => {
    setOptionDeliverySelected(optionSelected)
    setDeliveryText(optionSelected?.label)
    onChangeDelivery && onChangeDelivery(optionSelected?.label)
  }

  const handleDatePicked = (date) => {
    setDateSelected({
      label: date.toDateString(),
      value: date.toISOString('2015-05-14').slice(0, 10),
    })
    setIsDatePickerVisible(false)
  }

  return (
    <Block
      card
      backgroundColor={'white'}
      width={width}
      paddingTop={10}
      paddingHorizontal={20}
      paddingBottom={20}
      marginBottom={20}
    >
      <PickerButtonDelivery
        label="Delivery Options"
        text="Delivery Type"
        error
        placeholder={deliveryText || 'Select delivery type'}
        icon
        renderOptions={optionDeliveries}
        onChangeOption={(option) => handleChangeDelivery(option)}
      />
      {optionDeliverySelected?.value === 'delivery' && (
        <>
          <Block row>
            <Text style={styles.text}>Address</Text>
            <Text style={styles.errorText}> * </Text>
          </Block>
          <Input
            left
            color="black"
            style={styles.orderName}
            placeholder="Enter your address"
            onChangeText={(t) => setLocationSelected(t)}
            value={locationSelected}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
          />
        </>
      )}
      <>
        <PickerButton
          text={`${deliveryText || ''} Date`}
          placeholder={ !!dateSelected ? dateSelected?.label : "Select date"}
          pickDate={!!dateSelected}
          icon
          error
          iconName={'calendar-today'}
          size={25}
          onPress={()=>setIsDatePickerVisible(true)}
        />

        <DateTimePicker
          mode="date"
          isVisible={isDatePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={()=>setIsDatePickerVisible(false)}
        />
      </>
      <PickerButton
        text={`${deliveryText || ''} Time`}
        placeholder={!optionHourSelected? 'Select time': optionHourSelected?.label}
        icon
        error
        iconName={'lock-clock'}
        size={25}
        renderOptions={optionHours}
        onChangeOption={(option) => setOptionHourSelected(option)}
      />
    </Block>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  errorText: {
    paddingTop: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
})

export default Delivery;