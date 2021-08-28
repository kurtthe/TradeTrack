import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';

import Statement from '@custom-elements/Statement';
import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';

const { width } = Dimensions.get('screen');

const ListStatement = (props) => {
  const renderStatements = () => {
    if (props.statements.length === 0) {
      return (
        <>
          <InvoicesSkeleton />
          <InvoicesSkeleton />
          <InvoicesSkeleton />
        </>
      );
    }

    return props.statements.map((item, index) => <Statement key={index} statement={item} />);
  };

  return (
    <>
      <Block style={styles.newStatementsTitle}>
        <Text
          size={18}
          style={{ fontFamily: 'montserrat-bold', marginLeft: '1%' }}
          color={'#363C4A'}
        >
          All Statements
        </Text>
      </Block>
      <Block center style={{ paddingBottom: '5%',  }}>{renderStatements()}</Block>
    </>
  );
};

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginLeft: -15,
    width: width,
  },
});

export default ListStatement;
