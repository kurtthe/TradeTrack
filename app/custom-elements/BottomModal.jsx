import React from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Portal } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.modal}>
        <View style={styles.modalDialog}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.btnClose}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>{props.children}</View>
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalDialog: {
    backgroundColor: 'white',
    height: hp('95%'),
    width: wp('100%'),
    shadowColor: '#000',
    elevation: 8,
  },
  body: {},
  header: {
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  btnClose:{
    padding: 8
  }
});
export default BottomModal;
