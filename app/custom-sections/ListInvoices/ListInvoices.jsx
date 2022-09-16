import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Block, Text } from 'galio-framework';

import Invoice from '@custom-elements/Invoice';

import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from './ListInvoices.styles'

export const ListInvoices = ({ data, title, backAccount }) => {
  const navigation = useNavigation();
  const styles = makeStyles()

  const emptyData = () => (
    <>
      <InvoicesSkeleton />
      <InvoicesSkeleton />
      <InvoicesSkeleton />
    </>
  )

  const handleRedirectAllInvoices = () => {
    navigation.navigate('Account', {
      screen: 'AccountDetails',
      params: { tabIndexSelected: 1 },
    });
  };

  const renderItem = ({ item }) => (
    <Invoice invoice={item} isAccount={backAccount} />
  )

  return (
    <>
      {title && (
        <Block style={styles.cardHeader}>
          <Block style={styles.cardContent} row middle space="between">
            <Text style={styles.textTransactions}>
              Transactions
            </Text>

            <TouchableOpacity onPress={() => handleRedirectAllInvoices()}>
              <Text style={styles.textSeeAll}>
                See all
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      )}

      <Block style={styles.card}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListEmptyComponent={emptyData}
        />
      </Block>
    </>
  );
};
