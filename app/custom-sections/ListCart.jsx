import React from 'react';
import { Dimensions, StyleSheet, FlatList, Platform } from 'react-native'
import ProductCart from '@custom-elements/ProductCart';
import SimpleButton from '@components/SimpleButton';
import { Ionicons } from '@expo/vector-icons';
import { Block, Text } from 'galio-framework';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {cardInfo} from './CategoriesProducts/CategoriesProducts.model'
const { width } = Dimensions.get('screen');

const ListCart = (props) => {
  const renderProducts = ({ item }) => <ProductCart product={item} bought={props.bought} />;

  const renderEmpty = () => {
    return (
      <Block style={styles.container_empty}>
        <Ionicons name="cart" color={'#828489'} size={60} />
        <Text style={{ fontFamily: 'montserrat-regular', fontSize: 24 }} color={'#000'}>
          {props.messageCartEmpty || 'Your cart is empty!'}
        </Text>
        <Block style={{ top: 100 }} middle >
          <SimpleButton onPress={() => props.navigation.navigate('Products', {
              screen: 'Category',
              params: {
                headerTitle: cardInfo.name,
                allProducts: true,
                item:cardInfo
              },
            })}>
            Browse products
          </SimpleButton>
        </Block>
      </Block>
    );
  }

  return (
    <FlatList
      data={props.cartProducts}
      renderItem={renderProducts}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      ListEmptyComponent={renderEmpty}
      style={{ width: width, height: Platform.OS == 'ios' ? '80%' : '84%'}}
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