import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Restricted = ({size}) => (
  <View style={styles.container}>
    <Text>
      Forbidden: You do not have permission to view Burdens information Please contact your company administrator to request access.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  }
});

export default Restricted;
