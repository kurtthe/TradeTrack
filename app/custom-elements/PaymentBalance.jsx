import React, { useState, createRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Block, theme, Text, Input } from 'galio-framework';
import { Button } from '@components';
import { nowTheme } from '@constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomModal from '@custom-elements/BottomModal';
import WebView from '@custom-elements/WebView';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ActionSheet from 'react-native-actions-sheet';
import { FormatMoneyService } from '@core/services/format-money.service';
import RNPickerSelect from 'react-native-picker-select';
import { pickerOptions } from '@shared/dictionaries/options-payment-balance';

const formatMoney = FormatMoneyService.getInstance();
const generalRequestService = GeneralRequestService.getInstance();
const actionSheetRef = createRef();
const { width } = Dimensions.get('screen');

const PaymentBalance = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [urlPayment, setUrlPayment] = useState('');

  useEffect(() => {
    if (props.show) {
      actionSheetRef.current?.setModalVisible(props.show);
    }
  });

  const handleShowMethodPayment = async () => {
    const { url } = await generalRequestService.get(`${endPoints.payment}?amount=${valueAmount}`);
    actionSheetRef.current?.setModalVisible(false);
    setUrlPayment(url);
    setShowModal(true);
  };

  const handlePaymentClose = () => {
    actionSheetRef.current?.setModalVisible(false);
    props.close && props.close();
  };

  console.log('==>pickerOptions', pickerOptions);

  return (
    <>
      <ActionSheet ref={actionSheetRef} closeOnTouchBackdrop={false}>
        <Block style={{ height: 'auto', padding: 15, paddingBottom: 30 }}>
          <Block center style={{ paddingBottom: 30 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Balance to Pay</Text>
          </Block>

          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={pickerOptions}
            placeholder={{ label: 'Select an option' }}
            textInputProps={{ color: '#8898AA' }}
            style={{
              placeholder: styles.pickerText,
              viewContainer: styles.pickerContainer,
              inputAndroid: { color: nowTheme.COLORS.PICKERTEXT },
            }}
          />

          <Text style={{ fontWeight: 'bold' }}>Amount</Text>
          <Input
            name="nirvana"
            right
            color="black"
            style={styles.search}
            placeholder={'$0.00'}
            placeholderTextColor={'#8898AA'}
            onChangeText={(value) => setValueAmount(value)}
            keyboardType="numeric"
          />
          <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top: 10 }}>
            <Text size={15}>Your Balance</Text>
            <Text
              size={16}
              color={nowTheme.COLORS.INFO}
              style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
            >
              {formatMoney.format(props.balance?.total)}
            </Text>
          </Block>
          <View>
            <Button
              color="info"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
              style={styles.buttonAS}
              onPress={() => handleShowMethodPayment()}
            >
              Continue
            </Button>
            <Button
              onPress={() => handlePaymentClose()}
              color="eeeee4"
              textStyle={{
                color: nowTheme.COLORS.LIGHTGRAY,
                fontFamily: 'montserrat-bold',
                fontSize: 16,
              }}
              style={(styles.buttonGrayAS, styles.buttonAS)}
            >
              Cancel
            </Button>
          </View>
        </Block>
      </ActionSheet>

      <BottomModal show={showModal} close={() => setShowModal(false)}>
        <View style={{ height: hp('80%') }}>
          <WebView url={urlPayment} />
        </View>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  buttonAS: {
    width: width - theme.SIZES.BASE * 2,
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 5
  },
  pickerText: {
    color: nowTheme.COLORS.PICKERTEXT,
  },
});

export default PaymentBalance;
