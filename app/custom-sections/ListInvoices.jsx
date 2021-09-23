import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '@constants';
import Invoice from '@custom-elements/Invoice';

import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';
import { withNavigation } from '@react-navigation/compat';

const ListInvoices = (props) => {
  const putContent = () => {
    if (props.data.length === 0) {
      return (
        <>
          <InvoicesSkeleton />
          <InvoicesSkeleton />
          <InvoicesSkeleton />
        </>
      );
    }

    return props.data.map((item, index) => <Invoice key={index} invoice={item} />);
  };

  const handleRedirectAllInvoices = () => {
    props.navigation.navigate('Account', {
      screen: 'AccountDetails',
      params: { tabIndexSelected: 1 },
    });
  };

  return (
    <>
      {props.title && (
        <Block style={styles.cardHeader}>
          <Block row middle space="between" style={{ paddingLeft: 15, top: 10, height: 20 }}>
            <Text size={18} style={{ fontFamily: 'montserrat-bold' }} color={'#363C4A'}>
              Invoices
            </Text>

            <TouchableOpacity onPress={() => handleRedirectAllInvoices()}>
              <Text
                size={15}
                style={{ fontFamily: 'montserrat-regular', right: 15 }}
                color={nowTheme.COLORS.HEADER}
              >
                See all
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      )}

      <Block style={styles.card}>{putContent()}</Block>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: 20,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardHeader: {
    justifyContent: 'center',
    height: '4%',
  },
});

export default withNavigation(ListInvoices);
