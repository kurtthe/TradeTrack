import React, { useEffect, useState } from 'react';
import { nowTheme } from '@constants/index';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';
import { useGetJobs, useGetPreferredStore, useGetStores } from '@core/hooks/PlaceOrders';
import { Block } from 'galio-framework';
import {styles} from './PlaceOrders.styles'
import {useSelector, useDispatch} from 'react-redux';
import { clearProducts } from '@core/module/store/cart/cart';

const PlaceOrders = () => {
  const {data: jobs} = useGetJobs();
  const {data: preferredStore} = useGetPreferredStore();
  const {data: stores } = useGetStores();

  const dispatch = useDispatch()
  const cartProducts = useSelector((state)=> state.productsReducer.products)
  const userEmail = useSelector((state)=> state.loginReducer.email)

  const [optionsSelectJobs, setOptionsSelectJobs] = useState()
  const [optionsSelectStores, setOptionsSelectStores] = useState()
  const [optionDeliveries, setOptionsDeliveries] = useState()
  const [optionHours, setOptionsHours] = useState()
  const [store, setStore] = useState()
  const [emailStore, setEmailStore] = useState()

  const setRadioButtons = (data, toSame) => {
    data.sort(function (a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return data.map((c) => ({
      ...c,
      color: nowTheme.COLORS.INFO,
      labelStyle: { fontWeight: 'bold' },
      label: c.name,
      value: c.name,
      selected: toSame && c.name === toSame.name && c.id === toSame.id,
    }));
  };

  useEffect(()=>{
    setOptionsDeliveries(radioButtonsDelivery)
    setOptionsHours(radioButtonsHour)
  },[])

  useEffect(()=>{
    if(!preferredStore){
      return
    }

    setStore(preferredStore.name)
    setEmailStore(preferredStore.email)
  },[preferredStore])

  useEffect(()=>{
    if(!jobs){
      return
    }

    const jobsAsRadioButton = setRadioButtons(jobs)
    setOptionsSelectJobs(jobsAsRadioButton)
  },[jobs])

  useEffect(()=>{
    if(!stores){
      return
    }

    const storesAsRadioButton = setRadioButtons(stores, preferredStore)
    setOptionsSelectStores(storesAsRadioButton)
  },[stores, preferredStore])

  return (
    <Block flex center style={styles.cart}>

    </Block>
  );
}

export default PlaceOrders;
