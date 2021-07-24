import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, TextInput } from 'react-native';
import { Block, Text, Button } from "galio-framework";
import { nowTheme } from "../constants/";

const sizeConstant = (Platform.OS === 'ios') 
    ? ((Dimensions.get('window').height < 670) ? 30 :40) 
    : (Dimensions.get('window').height < 870) ? 30: 40

const QuantityCounterWithInput = props => {

    const [quantity, setQuantity] = useState(props.quantity)
    const [noButtons, setNoButtons] = useState(false)
    const [disabledPlus, setDisabledPlus] = useState(false)
    const [disabledMinus, setDisabledMinus] = useState(false)

    useEffect(() => {
        let initialQuantity = props.quantity
        if (initialQuantity != 1) setNoButtons(true)
    }, [])

    useEffect (() => {
        if (quantity == 1) setDisabledMinus(true)
        else setDisabledMinus(false)
        if (quantity == 100) setDisabledPlus(true)
        else setDisabledPlus(false)
    }, [quantity])

    const plusCounter = () => {
        const quantity1 = quantity
        if (quantity1 != 100) {
        const plus = quantity1 + 1 
        setQuantity(plus)
        //props.personsHandler(plus)
        }
    }

    const minusCounter = () => {
        const quantity1 = quantity
        if (quantity1 != 1) {
        const minus = quantity1 - 1 
        setQuantity(minus)
        //props.personsHandler(minus)
        }
    }

    return (
        <Block row center>
            {
                !noButtons &&
                <Button
                    shadowless
                    style={styles.quantityButtons}
                    color={'#f0f0f0'}
                    onPress={minusCounter}
                >
                    <Text style={styles.quantityTexts}>
                        -
                    </Text>
                </Button>
            }
            <TextInput 
                textAlign="center" 
                style={styles.quantityButtons} 
                keyboardType='number-pad'
            >
                {quantity}
            </TextInput>
            {
                !noButtons && 
                <Button 
                    shadowless 
                    style={styles.quantityButtons}
                    color={nowTheme.COLORS.ORANGE}
                    onPress={plusCounter}
                >
                    <Text color={'white'} style={styles.quantityTexts}>
                        +
                    </Text>
                </Button>
            }
        </Block>
    )
};

var styles = StyleSheet.create({
    quantityButtons: {
        width: sizeConstant,
        height: sizeConstant,
    },
    quantityTexts: {
        fontWeight: 'bold',
        fontSize: 20
    },
    disabled: {
        borderColor: 'gray',
        shadowColor: 'gray',
    }
});

export default QuantityCounterWithInput;