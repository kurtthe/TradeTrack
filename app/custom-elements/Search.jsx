import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Block, theme } from 'galio-framework';
import { Icon, Input } from '@components';

const { width } = Dimensions.get('screen');

class Search extends React.Component {
  render() {
    const {
      placeholder = 'Search', 
      onChangeText, 
      style, 
      inputStyle, 
    } = this.props;
    return (
      <Block flex center style={[styles.searchContainer, style]}>
          <Input
            {...this.props}
            right
            color="black"
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize="none"
            iconContent={
                <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
            }
            style={[styles.search, inputStyle]}
            placeholder={placeholder}
            onChangeText={(text) => onChangeText(text)}
          />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    borderRadius: 30,
  },
});

export default Search;
