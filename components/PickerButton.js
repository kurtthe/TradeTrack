import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Block } from "galio-framework";

import nowTheme from '../constants/Theme';

class PickerButton extends React.Component {
  render() {
    const {style, fontSize, placeholder, text, ...props } = this.props;

    const buttonStyles = [
        styles.button,
        {...style}
    ];

    return (
        <>
            <Text size={14} style={styles.text}>
                {text}
            </Text>
            <TouchableWithoutFeedback
                style={buttonStyles}
                textStyle={{ fontSize: fontSize || 12, fontWeight: '700' }}
                {...props}
            >
                <Block row>
                    <Text>
                        {placeholder}
                    </Text>
                    <MaterialIcons name="expand-less" color={'gray'} size={30} />
                </Block>
            </TouchableWithoutFeedback>
        </>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    },
    button: {
        width: 'auto',
        height: 28,
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    }
});

export default PickerButton;
