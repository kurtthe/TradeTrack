import React from 'react';
import { Dimensions, StyleSheet, FlatList } from 'react-native'
import ProductCart from '@custom-elements/ProductCart';
import { Ionicons } from '@expo/vector-icons';
import { Block, Text } from 'galio-framework';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width } = Dimensions.get('screen');

const ListCart = (props) => {
  const renderProducts = ({ item }) => <ProductCart product={item} />;

  const renderEmpty = () => {
    return (
      <Block style={styles.container_empty}>
        <Ionicons name="cart" color={'#828489'} size={60} />
        <Text style={{ fontFamily: 'montserrat-regular', fontSize: 24 }} color={'#000'}>
          {props.messageCartEmpty || 'Your cart is empty!'}
        </Text>
      </Block>
    );
  }

  return (
    <FlatList
      data={props.cartProducts}
      renderItem={renderProducts}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      ListEmptyComponent={renderEmpty}
      style={{ width: width }}
    />
  )
}

const styles = StyleSheet.create({

  container_empty: {
    height: hp('60%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailOrders: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});

export default ListCart