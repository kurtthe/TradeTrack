import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import ArButton from './Button';

import nowTheme from '../constants/Theme';

class FilterButton extends React.Component {
    render() {
        const { color, text, icon, style, ...props } = this.props;

        return (
            <ArButton
                small
                color={'white'}
                style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 5, paddingHorizontal: 10}}
            >
                {icon && 
                <Image
                    style={{margin: 5}}
                    source={icon}
                />}
                <Text style={styles.text}>
                    {text}
                </Text>
            </ArButton>
        );
    }
}

    const styles = StyleSheet.create({
    text: {
        color: nowTheme.COLORS.LIGHTGRAYTEXT
    }

});

export default FilterButton;
