import React from 'react'
import { Block, Input, Text } from 'galio-framework';
import { Dimensions, StyleSheet } from 'react-native';
import {useGetValidationsField} from '@core/hooks/PlaceOrders/validationsField'
import { nowTheme } from '@constants/index';

const { width } = Dimensions.get('screen');
import Loading from '@custom-elements/Loading';
import debounce from "lodash.debounce";

const OrderValidationFields = ({onChanges})=>{

  const {data: fields, isLoading} = useGetValidationsField();
  const [fieldsValue, setFieldsValue] = React.useState([])


  console.log("=>", fields)

  if(!fields ||isLoading){
    return <Loading />
  }

  const onChangeValue = (idField, newValue)=>{
    const newValuesField = fieldsValue.map((item)=>{
      if(item.index === idField){
        return {
          ...item,
          value: newValue
        }
      }

      return item
    })

    setFieldsValue(newValuesField)
    onChanges && onChanges(newValuesField)
  }

  const debounceChange = debounce((indexField, newValue)=> onChangeValue(indexField, newValue), 300)
  const renderInputs = () => {
    return fields.map((item)=>{

      const mapFields = {
        index:item.index,
        value: item.default
      }
      const newFields = [...fieldsValue, mapFields]
      setFieldsValue(newFields)
      return (
        <>
          <Block row>
            <Text style={styles.text}>{item.prompt}</Text>
            <Text style={styles.errorText}> * </Text>
          </Block>
          <Input
            left
            color="black"
            style={styles.orderName}
            placeholder={item.mask}
            onChangeText={(t) => debounceChange(item.index, t)}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
          />
        </>
      )
    })
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
      <Text style={[styles.textTitle, { fontWeight: 'bold' }]}>Order validations field</Text>
      {renderInputs()}
    </Block>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 14,
    paddingVertical: 10,
  },
  text: {
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
    textTransform: 'capitalize'
  },
  errorText: {
    paddingTop: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
})

export default OrderValidationFields;