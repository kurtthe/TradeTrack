import React, { useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Portal } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import Icon from '@components/Icon';
import { DownloadFile } from '@core/services/download-file.service';
import * as Sharing from 'expo-sharing';
import Loading from '@custom-elements/Loading';

const downloadFile = DownloadFile.getInstance();

const BottomModal = (props) => {
  const [loadingShared, setLoadingShared] = useState(false);

  if (!props.show) {
    return null;
  }

  const downloadInfo = async ({ url }) => {
    let newUrl = url;

    if (url.includes('?base64=true')) {
      const oldUrl = url.split('?base64=true');
      newUrl = oldUrl[0];
    }

    const responseDownload = await downloadFile.download(newUrl, 'pdf');
    return responseDownload;
  };

  const handleShared = async () => {
    if (!!props.downloadShared) {
      setLoadingShared(true);
      const urlFile = await downloadInfo(props.downloadShared);
      sharedFiles(urlFile);

      return;
    }

    if (!!props.sharedMessage) {
      sharedText();
    }
  };

  const sharedFiles = async (urlFile) => {
    setLoadingShared(false);

    if (!(await Sharing.isAvailableAsync())) {
      alert(`Sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync(urlFile);
  };

  const sharedText = async () => {
    await Share.share({
      message: props.sharedMessage || '',
    });
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
              {loadingShared ? (
                <Loading />
              ) : (
                <Ionicons name="share-outline" color={'#0E3A90'} size={28} />
              )}
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
    top: hp('6%'),
    height: hp('100%'),
    width: wp('100%'),
    shadowColor: '#000',
    elevation: 8,
  },
  body: {
    height: hp('100%'),
    width: wp('100%'),
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
    paddingHorizontal: 15,
  },
});
export default BottomModal;
