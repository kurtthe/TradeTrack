import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'galio-framework';
import LoadingComponent from '@custom-elements/Loading';

const News = () => {
  return (
    <View style={styles.container}>
      <LoadingComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    width: '100%',
    marginHorizontal: 5,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
export default News;
