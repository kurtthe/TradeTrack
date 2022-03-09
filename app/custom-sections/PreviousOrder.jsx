import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';

import Order from '@custom-elements/Order';
import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';
import { useSelector } from 'react-redux'

const PreviousOrder = () => {
  const {orders} = useSelector((state) => state.ordersReducer)

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

  console.log(orders)

  return (
    <FlatList
      data={orders}
      renderItem={renderContent}
      listEmptyComponent={loadingData}
    />
  );
};

export default PreviousOrder;
