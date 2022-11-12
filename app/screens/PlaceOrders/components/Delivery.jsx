import { Block, Input, Text } from 'galio-framework';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { useEffect, useState } from 'react';
import PickerButton from '@custom-elements/PickerButton';
import { nowTheme } from '@constants/index';
import { Dimensions, StyleSheet } from 'react-native';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';

import {useDispatch, useSelector} from 'react-redux'
import {setUpDelivery} from '@core/module/store/placeOrders/placeOrders'

const { width } = Dimensions.get('screen');


const Delivery = () => {
  const dispatch = useDispatch()
  const {first_name, last_name, phone_number} = useSelector((state)=> state.loginReducer)
  
  const [optionDeliveries, setOptionsDeliveries] = useState()
  const [optionHours, setOptionsHours] = useState()
  const [optionDeliverySelected, setOptionDeliverySelected] = useState()
  const [optionHourSelected, setOptionHourSelected] = useState()
  const [deliveryText, setDeliveryText] = useState()
  const [locationSelected, setLocationSelected] = useState()
  const [dateSelected, setDateSelected] = useState()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [contactPhone, setContactPhone] = useState()
  const [contactName, setContactName] = useState()

  useEffect(()=>{
    setOptionsDeliveries(radioButtonsDelivery)
    setOptionsHours(radioButtonsHour)
    setContactPhone(phone_number)
    setContactName(first_name + ' ' + last_name)
  },[])

  useEffect(()=>{
    const dataDelivery = {
      delivery: optionDeliverySelected?.value,
      location: locationSelected,
      date: dateSelected,
      time: optionHourSelected,
      contact_number: contactPhone,
      contact_name: contactName
    }

    dispatch(setUpDelivery(dataDelivery))
  },[optionHourSelected, locationSelected, optionHourSelected, optionDeliverySelected, dateSelected, contactName, contactPhone])

  const handleChangeDelivery = (optionSelected) => {
    setOptionDeliverySelected(optionSelected)
    setDeliveryText(optionSelected?.label)
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
      <PickerButton
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
      {optionDeliverySelected?.value === 'delivery' && (
        <>
          <Block row>
            <Text style={styles.text}>Contact Name</Text>
            <Text style={styles.errorText}> * </Text>
          </Block>
          <Input
            left
            color="black"
            style={styles.orderName}
            value={contactName}
            placeholder="Enter your name"
            onChangeText={(t) => setContactName(t)}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
          />
          <Block row>
            <Text style={styles.text}>Contact Phone</Text>
            <Text style={styles.errorText}> * </Text>
          </Block>
          <Input
            left
            color="black"
            style={styles.orderName}
            value={contactPhone}
            placeholder="Enter your phone"
            onChangeText={(t) => setContactPhone(t)}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
          />
        </>
      )}
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