import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import InvoicesSkeleton from '@custom-elements/skeletons/Invoices';

import Order from '@custom-elements/Order';

const PreviousOrder = (props) => {
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

    return props.data.map((item, index) => <Order key={index} item={item} />);
  };

  return (
    <ScrollView style={{ bottom: 10 }}>

      {putContent()}
    </ScrollView>
  )
};



export default PreviousOrder;
