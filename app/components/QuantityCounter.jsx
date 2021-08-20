import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Button } from "galio-framework";
import { nowTheme } from "@constants/";

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
        if (quantity == 0) {
            setDisabledMinus(true);
            deleteItem()
        } else setDisabledMinus(false)
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
        if (quantity1 != 0) {
        const minus = quantity1 - 1 
        setQuantity(minus)
        //props.personsHandler(minus)
        }
    }

    const deleteItem = () => {
        props.delete()
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