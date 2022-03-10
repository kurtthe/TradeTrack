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
    if (quantity == 0 && !props.product) {
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
    }
    props.quantityHandler(quantity);
  }, [quantity]);

  const plusCounter = () => {
    console.log('PLUS', quantity);
    const quantity1 = quantity;
    if (quantity1 != 100) {
      const plus = quantity1 + 1;
      setQuantity(plus);
      props.quantityHandler(plus);
    }
  };

  const minusCounter = () => {
    console.log('MINUS', quantity);
    const quantity1 = quantity;
    const minVal = props.product ? 1 : 0;
    if (quantity1 != minVal) {
      const minus = quantity1 - 1;
      setQuantity(minus);
      props.quantityHandler(minus);
    }
  };

  const deleteItem = () => {
    props.delete();
  };

  return (
    <Block row center>
      <Button shadowless style={styles.quantityButtons} color={'#f0f0f0'} onPress={minusCounter}>
        <Text style={styles.quantityTexts}>-</Text>
      </Button>
      <TextInput
        textAlign="center"
        style={styles.quantityButtons}
        keyboardType="number-pad"
        value={quantity.toString()}
        onChangeText={(q) => setQuantity(Number(q))}
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
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  disabled: {
    borderColor: 'gray',
    shadowColor: 'gray',
  },
});

export default QuantityCounterWithInput;
