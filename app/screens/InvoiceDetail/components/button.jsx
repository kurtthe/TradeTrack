import React from 'react';
import { makeStyles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';


export const ButtonInvoice = ({ iconName= false, text, onPress, disabled = false }) => {
    const styles = makeStyles()

    return (
            <Button 
                disabled={disabled}
                icon={iconName}
                iconFamily="ionicon" 
                iconSize={20} 
                color={disabled ? nowTheme.COLORS.LIGHTGRAY : nowTheme.COLORS.INFO} 
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