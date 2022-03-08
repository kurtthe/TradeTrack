import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';

import Order from '@custom-elements/Order';
import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';

const PreviousOrder = (props) => {

  const renderContent = ({ item }) => (
    <Order item={item} />
  )

  const loadingData = () => (
    <>
      <InvoicesSkeleton />
      <InvoicesSkeleton />
      <InvoicesSkeleton />
    </>
  )

  return (
    <FlatList
      data={props.data}
      renderItem={renderContent}
      listEmptyComponent={loadingData}
    />
  );
};

export default PreviousOrder;
