import React from 'react';
import { StyleSheet } from 'react-native'
import SimpleButton from '@components/SimpleButton';
import { Ionicons } from '@expo/vector-icons';
import { Block, Text } from 'galio-framework';

import {
  selectedCategory,
} from '@core/module/store/filter/filter';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const EmptyCart = ({ messageCartEmpty }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const handleBrowseProducts = () => {
    dispatch(selectedCategory(''))
    navigation.navigate('Products', {
      screen: 'Category'
    })
  }

  return (
    <Block style={styles.container_empty}>
      <Ionicons name="cart" color={'#828489'} size={60} />
      <Text style={{ fontFamily: 'montserrat-regular', fontSize: 24 }} color={'#000'}>
        {messageCartEmpty || 'Your cart is empty!'}
      </Text>
      <Block style={{ top: 100 }} middle >
        <SimpleButton onPress={() => handleBrowseProducts()}>
          Browse products
        </SimpleButton>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container_empty: {
    height: hp('60%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})