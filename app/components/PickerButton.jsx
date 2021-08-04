import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Block } from "galio-framework";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import nowTheme from '@constants/Theme';
import { color } from 'react-native-reanimated';

class PickerButton extends React.Component {
  render() {
    const {style, placeholder, text, icon, iconName, size, ...props } = this.props;

    const buttonStyles = [
        styles.button,
        {...style}
    ];

    return (
        <View style={styles.wholeContainer}>
            <Text size={14} style={styles.text}>
                {text}
            </Text>
            <TouchableWithoutFeedback
                style={buttonStyles}
                {...props}
            >
                <Block row space={'between'} style={styles.container}>
                    <Text style={styles.placeholder}>
                        {placeholder}
                    </Text>
                    {icon && 
                        <MaterialIcons 
                            name={iconName || "expand-more"} 
                            color={nowTheme.COLORS.ICONPICKER} 
                            size={size || 40} 
                        />
                    }
                </Block>
            </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    wholeContainer:{
        color: 'red'
    },
    text: {
        fontSize: 14,
        paddingVertical: 10,
        color: nowTheme.COLORS.PRETEXT
    },
    placeholder: {
        color: nowTheme.COLORS.PICKERTEXT
    },
    button: {
        width: 'auto',
       
    },
    container: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: nowTheme.COLORS.PICKERTEXT,
        padding: 5,
        borderRadius: 5,
        paddingLeft: 10,
        height: 45
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    }
});

export default PickerButton;
