import React, {useState, useEffect} from 'react';
import { Block, Input, Text } from 'galio-framework';
import PickerButton from '@custom-elements/PickerButton';
import { nowTheme } from '@constants/index';
import { setOptionsPicker } from '../utils';
import { useGetJobs } from '@core/hooks/PlaceOrders';
import { Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import {useDispatch} from 'react-redux'
import {setUpOrder} from '@core/module/store/placeOrders/placeOrders'
import Restricted from '../../../custom-elements/Restricted';

const { width } = Dimensions.get('screen');


const Jobs = () => {
  const dispatch = useDispatch()
  const [textSearchJob, setTextSearchJob] = useState('')
  const [page, setPage] = useState(1)
  const [orderName, setOrderName] = useState()
  const {data: jobs, refetch, isLoading} = useGetJobs(textSearchJob, page);
  const [jobSelected, setJobSelected] = useState()
  const [optionsSelectJobs, setOptionsSelectJobs] = useState()

  useEffect(()=>{
    setTimeout(()=>refetch(), 500)
  },[textSearchJob,page])

  useEffect(()=>{
    if(!jobs){
      return
    }

    if(jobs?.restricted){
      return
    }

    const jobsAsRadioButton = setOptionsPicker(jobs)
    setOptionsSelectJobs(jobsAsRadioButton)
  },[jobs])

  useEffect(()=>{
    const dataOrder ={
      name: orderName,
      job: jobSelected?.id,
    }
    dispatch(setUpOrder(dataOrder))
  }, [orderName, jobSelected])

  const handleSearch = (page) => {
    setPage(page + 1)
  };

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
    {isLoading && <ActivityIndicator/> }
      {jobs?.restricted ? <Restricted horizontal /> :
      <>
        <PickerButton
          label="Detail Order"
          text="Select Job"
          placeholder={jobSelected?.value || 'Select or search job'}
          renderOptions={optionsSelectJobs}
          onChangeOption={(option) => setJobSelected(option)}
          handleSearch={(page) => handleSearch(page)}
          changeSearchText={(text) => setTextSearchJob(text)}
          search={true}
          icon={true}
          page={page}
          textSearch={textSearchJob}
          deleteOption
        />
        <Block row>
          <Text style={styles.text}>Job/Order Number</Text>
          <Text style={styles.errorText}> * </Text>
        </Block>
        <Input
          left
          color="black"
          style={styles.orderName}
          placeholder="Enter your order name"
          onChangeText={(t) => setOrderName(t)}
          value={orderName}
          placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
          textInputStyle={{ flex: 1 }}
        />
      </>
      }
    </Block>
  )
}

const styles= StyleSheet.create({
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

export default Jobs;