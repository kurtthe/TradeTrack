import { Block, Input, Text } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native'
import { nowTheme } from '@constants/index';
import PickerButton from '@custom-elements/PickerButton';
import { useGetStores, useGetPreferredStore } from '@core/hooks/PlaceOrders';
import { setOptionsPicker, resetValueSelect } from '../utils';

const Store = () => {
  const [notes, setNotes] = useState()
  const [optionsSelectStores, setOptionsSelectStores] = useState()
  const [storeName, setStoreName] = useState()
  const [emailStore, setEmailStore] = useState()

  const {data: stores } = useGetStores();
  const {data: preferredStore} = useGetPreferredStore();

  useEffect(()=>{
    if(!stores || !preferredStore){
      return
    }

    const storesAsRadioButton = setOptionsPicker(stores, preferredStore)
    setOptionsSelectStores(storesAsRadioButton)
  },[stores, preferredStore])

  useEffect(()=>{
    if(!preferredStore){
      return
    }

    setStoreName(preferredStore.name)
    setEmailStore(preferredStore.email)
  },[preferredStore])

  const handleChangeOptionSelected = (option) => {
    setStoreName(option?.value)
    setEmailStore(option?.email)
  }

  /*const resetOptions = () => {
    const optionsStoreClear = resetValueSelect(optionsSelectStores);
    if(!optionsStoreClear) return;
    setOptionsSelectStores(optionsStoreClear)
  }*/

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
        placeholder={storeName || 'Select store'}
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