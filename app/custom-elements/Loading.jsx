import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({size}) => (
  <ActivityIndicator color="#009688" size={size} style={styles.ActivityIndicatorStyle} />
);

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    justifyContent: 'center',
  }
});

export default Loading;
