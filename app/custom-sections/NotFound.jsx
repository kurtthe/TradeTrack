import React from 'react';
import {StyleSheet, View} from 'react-native';
import {nowTheme} from '@constants/index';
import {theme} from 'galio-framework';
import {Text} from 'galio-framework';

const NotFound = () => {
  return (
    <View style={styles.notfound}>
      <Text
        style={{fontFamily: 'montserrat-regular'}}
        size={18}
        color={nowTheme.COLORS.TEXT}>
        No results found for search options selected.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
});

export default NotFound;
