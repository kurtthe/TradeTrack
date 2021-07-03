import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from "galio-framework";
import { nowTheme } from "../constants/";

const QuantityCounter = props => {

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
        if (quantity == 6) setDisabledPlus(true)
        else setDisabledPlus(false)
    }, [quantity])

    const plusCounter = () => {
        const quantity1 = quantity
        if (quantity1 != 6) {
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
        <Block row>
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
            <Text style={{marginHorizontal: 10, top:12}}>
                {quantity}
            </Text>
            {
                !noButtons && 
                <Button 
                    shadowless 
                    style={styles.quantityButtons}
                    color={nowTheme.COLORS.INFO}
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
        width: 25,
        height: 25
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

export default QuantityCounter;