import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Button } from '@components';
import { nowTheme } from '@constants';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import { BottomSheet } from 'react-native-sheet';
import { FormatMoneyService } from '@core/services/format-money.service';
import { pickerOptions } from '@shared/dictionaries/options-payment-balance';
import { TextInputMask } from 'react-native-masked-text';
import PickerButton from '@custom-elements/PickerButton';
import ModalBottomPaymentBalance from '../components/BottomModal';

const formatMoney = FormatMoneyService.getInstance();
const generalRequestService = GeneralRequestService.getInstance();
const { width } = Dimensions.get('screen');

const PaymentBalance = ({ show, onShow, ...props }) => {
  const actionSheetRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [urlPayment, setUrlPayment] = useState('');
  const [valueAmount, setValueAmount] = useState('');
  const [optionBalanceSelected, setOptionBalanceSelected] = useState(null)
  const [optionsBalances, setOptionsBalances] = useState([])

  useEffect(()=>{
    setOptionsBalances(pickerOptions)
  }, [])

  useEffect(() => {
    if (show) {
      actionSheetRef.current?.show();
    } else actionSheetRef.current?.hide();
  }, [show]);

  const handleShowMethodPayment = async () => {
    const getValue = formatMoney.clearFormat(valueAmount);
    const { url } = await generalRequestService.get(`${endPoints.payment}?amount=${getValue}`);
    actionSheetRef.current?.hide();
    setUrlPayment(url);
    setShowModal(true);
  };

  const changeOptionBalancePay = (option) => {
    const optionValue = option.value;
    setOptionBalanceSelected(option)

    if (optionValue === 'now') {
      return setValueAmount(formatMoney.format(props.balance?.thirty_day));
    }
    if (optionValue === 'overdue') {
      return setValueAmount(formatMoney.format(props.balance?.overdue));
    }

    const totalSum = props.balance?.thirty_day + props.balance?.overdue;
    setValueAmount(formatMoney.format(totalSum));
  };

  return (
    <>
      <BottomSheet height={500} ref={actionSheetRef} backdropClosesSheet={false} draggable={false} >
        <Block style={{ height: 'auto', padding: 15, paddingBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, paddingBottom: 10 }}>
            Balance to Pay
          </Text>

      <PickerButton
          placeholder={!optionBalanceSelected?'Select an option': optionBalanceSelected.label}
          renderOptions={optionsBalances}
          onChangeOption={(option) =>  changeOptionBalancePay(option)}
          icon={true}
          errorLabel
        />

          <Text style={{ fontWeight: 'bold', paddingBottom: 3, paddingTop: 10 }}>Amount</Text>
          <TextInputMask
            placeholder="$0.00"
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '',
            }}
            value={valueAmount}
            onChangeText={(text) => setValueAmount(text)}
            style={styles.search}
            keyboardType="numeric"
          />
          <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top: 10 }}>
            <Text size={15}>Your Balance</Text>
            <Text
              size={16}
              color={nowTheme.COLORS.INFO}
              style={{ fontWeight: Platform.OS === 'android' ? 'bold' : '600' }}
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
              onPress={()=> onShow(false)}
              color="#eeeee4"
              textStyle={{
                color: nowTheme.COLORS.LIGHTGRAY,
                fontFamily: 'montserrat-bold',
                fontSize: 16,
              }}
              style={styles.buttonAS}
            >
              Cancel
            </Button>
          </View>
        </Block>
      </BottomSheet>

      <ModalBottomPaymentBalance
        setShowModal={setShowModal}
        showModal={showModal}
        urlPayment={urlPayment}
      />
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
  search: {
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    height: 45,
  },
  pickerText: {
    color: nowTheme.COLORS.BLACK,
  },
});

export default PaymentBalance;
