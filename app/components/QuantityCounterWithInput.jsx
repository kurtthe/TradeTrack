import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/';

const sizeConstant =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 30
      : 40
    : Dimensions.get('window').height < 870
      ? 30
      : 40;

const QuantityCounterWithInput = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);

  useEffect(() => {
    setQuantity(props.quantity)
  }, [props.quantity]);

  useEffect(() => {
    if (quantity == 0 && !props.product && !props.bought) {
      Alert.alert(
        'Are you sure you want to remove the product for your cart?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => setQuantity(1),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              deleteItem();
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }

  }, [quantity]);

  const plusCounter = () => {
    const quantity1 = quantity;
    if (quantity1 != 100) {
      const plus = quantity1 + 1;
      setQuantity(plus);
      props.quantityHandler(plus);
    }
  };

  const minusCounter = () => {

    const quantity1 = quantity;
    const minVal = props.product ? 1 : 0;
    if (quantity1 != minVal) {
      const minus = quantity1 - 1;

      setQuantity((props.bought && minus === 0) ? 1 : minus);
      props.quantityHandler(minus);
    }
  };

  const deleteItem = () => {
    props.delete();
  };

  const handleChangeText = (cantProducts) => {

    if(cantProducts === ''){
      return
    }

    const cantValue = parseInt(cantProducts)
    setQuantity(cantValue)
    props.quantityHandler(cantValue);
  }

  return (
    <Block row center>
      <Button shadowless style={styles.quantityButtons} color={'#f0f0f0'} onPress={minusCounter}>
        <Text style={styles.quantityTexts}>-</Text>
      </Button>
      <TextInput
        textAlign="center"
        keyboardType="number-pad"
        value={quantity?.toString()}
        onChangeText={(q) => handleChangeText(q)}
      />
      <Button
        shadowless
        style={styles.quantityButtons}
        color={props.product ? nowTheme.COLORS.ORANGE : nowTheme.COLORS.INFO}
        onPress={plusCounter}
      >
        <Text color={'white'} style={styles.quantityTexts}>
          +
        </Text>
      </Button>
    </Block>
  );
};

var styles = StyleSheet.create({
  quantityButtons: {
    width: sizeConstant,
    height: sizeConstant,
    marginLeft:20,
    marginRight:10
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default QuantityCounterWithInput;
