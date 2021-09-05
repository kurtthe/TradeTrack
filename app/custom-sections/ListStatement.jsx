import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';

import Statement from '@custom-elements/Statement';
import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';

const { width } = Dimensions.get('screen');

const ListStatement = (props) => {
  const renderStatements = () => {
    if (props.data.length === 0) {
      return (
        <>
          <InvoicesSkeleton />
          <InvoicesSkeleton />
          <InvoicesSkeleton />
        </>
      );
    }
    return props.data.map((item, index) => <Statement key={index} statement={item} />);
  };

  return (
    <Block style={styles.container}>
      <Block style={styles.newStatementsTitle}>
        <Text size={18} style={{ fontFamily: 'montserrat-bold' }} color={'#363C4A'}>
          All Statements
        </Text>
      </Block>
      <Block center>{renderStatements()}</Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    paddingHorizontal: 15,
    width: width,
    paddingVertical: '4%',
  },
});

export default ListStatement;