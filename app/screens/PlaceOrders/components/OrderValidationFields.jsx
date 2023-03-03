import React from 'react';
import { Block, Input, Text } from 'galio-framework';
import { Dimensions, StyleSheet } from 'react-native';
import { useGetValidationsField } from '@core/hooks/PlaceOrders/validationsField/useGetValidationsField';
import { nowTheme } from '@constants/index';

const { width } = Dimensions.get('screen');
import Loading from '@custom-elements/Loading';

const OrderValidationFields = ({ onChanges }) => {
  const { data: fields, isLoading } = useGetValidationsField();
  const [fieldsValue, setFieldsValue] = React.useState([]);

  React.useEffect(() => {
    if (!fields) return;

    const valuesFields = fields.map((item) => ({ index: item.index, value: item.default }));
    setFieldsValue(valuesFields);
  }, [fields]);

  if (!fields || isLoading) {
    return <Loading />;
  }

  const onChangeValue = (idField, newValue) => {
    const newValuesField = fieldsValue.map((item) => {
      if (item.index === idField) {
        return {
          ...item,
          value: newValue,
        };
      }

      return item;
    });

    setFieldsValue(newValuesField);
    onChanges && onChanges(newValuesField);
  };

  const renderInputs = () => {
    return fields.map((item) => (
      <React.Fragment key={`field-validation${item.id}`}>
        <Block row>
          <Text style={styles.text}>{item.prompt}</Text>
          <Text style={styles.errorText}> * </Text>
        </Block>
        <Input
          left
          color="black"
          style={styles.orderName}
          placeholder={item.mask}
          onChangeText={(t) => onChangeValue(item.index, t)}
          placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
          value={fieldsValue.find((field) => field.index === item.index)?.value}
          textInputStyle={{ flex: 1 }}
          
        />
      </React.Fragment>
    ));
  };

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
      <Text style={[styles.textTitle, { fontWeight: 'bold' }]}>Order Validations</Text>
      {renderInputs()}
    </Block>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 14,
    paddingVertical: 10,
  },
  text: {
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
    textTransform: 'capitalize',
  },
  errorText: {
    paddingTop: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
});

export default OrderValidationFields;
