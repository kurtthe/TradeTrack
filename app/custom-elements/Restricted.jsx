import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Restricted = ( {horizontal = false} ) => {
  if (horizontal) {
    return (
      <View style={styles.containerHorizontal}>
        <Icon
          name={'lock-closed'}
          size={40}
          color={'#828489'}
        />
        <View style={styles.containerColumn}>
          <Text style={{ fontFamily: 'montserrat-regular', fontSize: 16, textAlign: 'left' }}>
            Forbidden: You do not have permission to view Burdens information
          </Text>
          <Text style={{ fontFamily: 'montserrat-regular', fontSize: 10, textAlign: 'left' }}>
            Please contact your company administrator to request access.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    <Icon
      name={'lock-closed'}
      size={50}
      color={'#828489'}
      style={{marginBottom: 10}}
    />
    <Text style={{ fontFamily: 'montserrat-regular', fontSize: 18, textAlign:'center' }}>
      Forbidden: You do not have permission to view Burdens information
    </Text>
    <Text style={{ fontFamily: 'montserrat-regular', fontSize: 10, textAlign:'center' }}>
      Please contact your company administrator to request access.
    </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  containerColumn:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})

export default Restricted;
