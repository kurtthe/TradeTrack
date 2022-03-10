import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';

import Order from '@custom-elements/Order';
import { useSelector } from 'react-redux'

const PreviousOrder = () => {
  const { orders } = useSelector((state) => state.ordersReducer)

  const renderContent = ({ item }) => (
    <Order item={item} />
  )

  return (
    <Block style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderContent}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%'
  }
})

export default PreviousOrder;
