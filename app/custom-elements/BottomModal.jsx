import React from 'react';

import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import { Portal } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Icon from '@components/Icon';

const BottomModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.modal}>
        <View style={styles.modalDialog}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => props.close()} style={styles.btnClose}>
              <Icon name="chevron-left" family="evilicon" size={35} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.close()} style={styles.btnClose}>
            <Ionicons name="share-outline" color={'#0E3A90'} size={28} />
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
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalDialog: {
    backgroundColor: '#f3f2f7',
    top: hp('5%'),
    height: hp('85%'),
    width: wp('100%'),
    shadowColor: '#000',
    elevation: 8,
  },
  body: {
    backgroundColor: 'red',
    height: '100%'
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    
  },
  btnClose: {
    padding: 8,
    paddingHorizontal:15
  },
});
export default BottomModal;
