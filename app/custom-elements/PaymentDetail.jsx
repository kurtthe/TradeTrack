import React, { createRef } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Clipboard } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Button } from '@components';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import GrayLine from '@components/GrayLine';

import { useSelector } from 'react-redux';

const actionSheetRef = createRef();
const { width } = Dimensions.get('screen');

const PaymentDetail = (props) => {
  const balanceLive = useSelector((state) => state.liveBalanceReducer);

  const setBsbClipboard = async () => {
    await Clipboard.setString('083125');
  };

  const setAccountClipboard = async () => {
    await Clipboard.setString('048284743');
  };

  const setReferenceClipboard = async () => {
    await Clipboard.setString('63673');
  };

  return (
    <Block style={{ padding: theme.SIZES.BASE, top:10 }}>
      <Text style={{ marginBottom: 15,  }} size={16}>
        Payment Details
      </Text>
      <Block row style={{ paddingBottom: 15 }}>
        <Block row flex center justifyContent={'space-between'}>
          <Block>
            <Text color={nowTheme.COLORS.LIGHTGRAY}>BSB</Text>
            <Text >
              083-125
            </Text>
          </Block>
          <Block center flex>
            <TouchableOpacity onPress={setBsbClipboard}>
              <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
            </TouchableOpacity>
          </Block>
        </Block>
        <Block row flex center justifyContent={'space-between'}>
          <Block>
            <Text color={nowTheme.COLORS.LIGHTGRAY}>Account</Text>
            <Text>
              04-828-4743
            </Text>
          </Block>
          <Block>
            <TouchableOpacity onPress={setAccountClipboard}>
              <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block row style={{ paddingBottom: 15 }}>
          <Block row flex center justifyContent={'space-between'}>
            <Block>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Reference
              </Text>
              <Text
                size={
                  Platform.OS === 'ios'
                    ? Dimensions.get('window').height < 670
                      ? 14
                      : 16
                    : Dimensions.get('window').height < 870
                    ? 14
                    : 16
                }
              >
                  {balanceLive.client_number}
              </Text>
            </Block>
            <Block center flex>
              <TouchableOpacity onPress={setReferenceClipboard}>
                <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
              </TouchableOpacity>
            </Block>
          </Block>
          <Block row flex center justifyContent={'space-between'}>
            <Block>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
               
              </Text>
              <Text
                size={
                  Platform.OS === 'ios'
                    ? Dimensions.get('window').height < 670
                      ? 14
                      : 16
                    : Dimensions.get('window').height < 870
                    ? 14
                    : 16
                }
              >
                
              </Text>
            </Block>
            <Block>
              
            </Block>
          </Block>
        </Block>
      <Block row style={{ justifyContent: 'center' }}>
        <Button
          color="info"
          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
          style={styles.button}
          onPress={() => actionSheetRef.current?.setModalVisible()}
        >
          Pay via Credit Card
        </Button>
      </Block>
      <GrayLine style={{ width: '100%', alignSelf: 'center' , bottom:15}} />

      
    </Block>

    
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
});

export default PaymentDetail;
