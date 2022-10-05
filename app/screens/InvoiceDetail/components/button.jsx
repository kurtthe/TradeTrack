import React from 'react';
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';


export const ButtonInvoice = ({ iconName= false, text, onPress }) => {
    const styles = makeStyles()

    return (
            <Button 
                icon={iconName}
                iconFamily="ionicon" 
                iconSize={22} 
                color={nowTheme.COLORS.INFO} 
                iconColor={'#ffff'} 
                size="small"
                shadowless
                onPress={() => onPress()}
                style={styles.button}
            >
                {text}
            </Button>
    )
};