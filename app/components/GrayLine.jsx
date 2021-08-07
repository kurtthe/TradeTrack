import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from "galio-framework";
import nowTheme from "@constants/Theme";

const { height, width } = Dimensions.get("window");

export default function GrayLine(props) {
    
    return (
        <View style={[styles.grayLine, props.style]}/>
    )
}

const styles = StyleSheet.create({
    grayLine: {
        marginTop: '5%', 
        height: 4, 
        width: width, 
        backgroundColor: nowTheme.COLORS.BACKGROUND, 
        marginHorizontal: -theme.SIZES.BASE
    }
})