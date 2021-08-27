import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => (
  <ActivityIndicator color="#009688" size="large" style={styles.ActivityIndicatorStyle} />
);

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default Loading;
