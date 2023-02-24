import { Block, Input, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { nowTheme } from '@constants/index';
import PickerButton from '@custom-elements/PickerButton';
import { useGetStores, useGetPreferredStore } from '@core/hooks/PlaceOrders';
import { setOptionsPicker, resetValueSelect } from '../utils';
import {useSelector, useDispatch} from 'react-redux';
import {setDataStore} from '@core/module/store/placeOrders/placeOrders'

const { width } = Dimensions.get('screen');

const Store = () => {
  const dispatch = useDispatch()

  const [notes, setNotes] = useState()
  const [optionsSelectStores, setOptionsSelectStores] = useState()
  const nameStore = useSelector((state)=> state.placeOrderReducer.nameStore)


  const {data: stores } = useGetStores();
  const {data: preferredStore} = useGetPreferredStore();

  useEffect(()=>{
    if(!stores?.locations?.length){
      return
    }

    const storesAsRadioButton = setOptionsPicker(stores.locations, preferredStore)
    setOptionsSelectStores(storesAsRadioButton)
  },[stores?.locations, preferredStore])

  useEffect(()=>{
    if(!preferredStore){
      return
    }

    dispatch(setDataStore({...preferredStore, notes }))
  },[preferredStore, notes])

  const handleChangeOptionSelected = (option) => {
    dispatch(setDataStore(option))
  }

  return(
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
        label="Store"
        errorLabel
        placeholder={nameStore || 'Select store'}
        icon
        renderOptions={optionsSelectStores}
        onChangeOption={(option) => handleChangeOptionSelected(option)}
      />
      <Text style={{ fontSize: 14, paddingVertical: 10, color: nowTheme.COLORS.PRETEXT }}>
        Notes
      </Text>
      <Input
        left
        color="black"
        style={styles.notes}
        placeholder="Type notes here"
        value={notes}
        onChangeText={(t) => setNotes(t)}
        placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
        textInputStyle={{ flex: 1 }}
        multiline
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  notes: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    paddingTop: 10,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
})

export default Store;