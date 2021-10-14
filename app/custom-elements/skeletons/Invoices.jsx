import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { StyleSheet, View } from 'react-native';
import { nowTheme } from '@constants';

const firstLayout = [
  {
    width: 300,
    height: 30,
    marginBottom: 5,
  },
  {
    width: 60,
    height: 20,
    marginBottom: 5,
  },
  {
    width: 350,
    height: 30,
  },
];
const Invoices = () => {
  return (
    <View style={styles.container}>
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        animationDirection="horizontalLeft"
        boneColor="#ECECEC"
        layout={firstLayout}
        isLoading={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
