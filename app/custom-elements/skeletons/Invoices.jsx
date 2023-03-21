import React from 'react';
import { StyleSheet, View } from 'react-native';
import { nowTheme } from '@constants';
import LoadingComponent from '@custom-elements/Loading';

const Invoices = () => {
  return (
    <View style={styles.container}>
      <LoadingComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    zIndex: 2,
    height: 'auto',
    borderRadius: 3,
    marginBottom: 5,
  },
});
export default Invoices;
