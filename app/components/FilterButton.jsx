import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import ArButton from './Button';

import nowTheme from '@constants/Theme';

class FilterButton extends React.Component {
    render() {
        const { color, text, icon, style, onPress, isActive, ...props } = this.props;

        return (
            <ArButton
                small
                color={'white'}
                style={styles.button}
                onPress={onPress}
            >
                {icon && 
                <Image
                    style={{margin: 5}}
                    source={icon}
                />}
                {
                    isActive &&
                    <Image
                        style={styles.image}
                        source={require('../../assets/category.png')}
                    />
                }
                <Text style={styles.text}>
                    {text}
                </Text>
            </ArButton>
        );
    }
}

    const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        padding: 5, 
        paddingHorizontal: 10, 
        marginHorizontal: 0 
    },
    image: {
        marginRight: 5, 
        height: 18, 
        width: 18
    },
    text: {
        color: nowTheme.COLORS.LIGHTGRAYTEXT
    }

});

export default FilterButton;