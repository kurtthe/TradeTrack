import React from 'react';

import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomModal from '@custom-elements/BottomModal';
import WebView from '@custom-elements/WebView';

const ModalBottomPaymentBalance = ({showModal, setShowModal, urlPayment})=> {

  return <BottomModal show={showModal} close={() => setShowModal(false)}>
    <View style={{ height: hp('80%') }}>
      <WebView url={urlPayment} />
    </View>
  </BottomModal>
}

export default ModalBottomPaymentBalance;
