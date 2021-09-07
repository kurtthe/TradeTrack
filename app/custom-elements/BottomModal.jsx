import React from 'react';

import { View, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Portal } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from '@components/Icon';

const BottomModal = (props) => {
  if (!props.show) {
    return null;
  }

  const handleShared = async () => {
    if (!props.sharedMessage) {
      return;
    }

    const result = await Share.share({
      message: props.sharedMessage,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };

  return (
    <Portal>
      <View style={styles.modal}>
        <View style={styles.modalDialog}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => props.close()} style={styles.btnClose}>
              <Icon name="chevron-left" family="evilicon" size={35} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleShared()} style={styles.btnClose}>
              <Icon name="share" family="evilicon" size={30} />
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
    height: '100%',
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
  },
});
export default BottomModal;
