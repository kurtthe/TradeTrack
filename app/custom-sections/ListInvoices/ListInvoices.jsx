import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';

import Invoice from '@custom-elements/Invoice';

import { useNavigation } from '@react-navigation/native';
import { makeStyles } from './ListInvoices.styles';
import Restricted from '@custom-elements/Restricted';

export const ListInvoices = ({ data, title, backAccount, restricted }) => {
  const navigation = useNavigation();
  const styles = makeStyles();

  const handleRedirectAllInvoices = () => {
    navigation.navigate('Account', {
      screen: 'AccountDetails',
      params: { tabIndexSelected: 1 },
    });
  };

  const renderItem = (item, index) => (
    <Invoice key={`component-list${index}`} invoice={item} isAccount={backAccount} />
  );
  const renderListData = () => {
    return data.map(renderItem);
  };

  return (
    <>
      {title && (
        <Block style={styles.cardHeader}>
          <Block style={styles.cardContent} row middle space="between">
            <Text style={styles.textTransactions}>Transactions</Text>

            <TouchableOpacity onPress={() => handleRedirectAllInvoices()}>
              <Text style={styles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      )}

      <Block style={styles.card}>
        {restricted ? <Restricted horizontal /> : <>{renderListData()}</>}
      </Block>
    </>
  );
};
