import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { Block } from 'galio-framework';

import { nowTheme } from '@constants';
import Switch from '@custom-elements/Switch';
import { ProductCart } from '@core/services/product-cart.service';
import { connect } from 'react-redux';
import { updateProducts, changeClientFriendly } from '@core/module/store/cart/cart';
import { CategoriesProducts } from '@custom-sections/CategoriesProducts'
import { makeStyles } from './TProducts.styles'

const TProducts = ({ cartProducts, changeClientFriendly, updateProducts }) => {
  const [productCart, setProductCart] = useState();
  const styles = makeStyles()

  useEffect(() => {
    const initServices = () => {
      const cartService = ProductCart.getInstance(cartProducts);
      setProductCart(cartService)
    }

    initServices()
  }, [cartProducts])

  const handleChangeSwitch = (value) => {
    changeClientFriendly(!value)
    productCart.changePrice(!value, updateProducts);
  };

  return (
    <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Block style={styles.content}>
          <Switch
            card={true}
            title="Client Friendly Mode"
            onChange={(value) => handleChangeSwitch(value)}
          />
          <CategoriesProducts />
        </Block>

      </ScrollView>
    </Block>
  );
}



const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts, changeClientFriendly };

export default connect(mapStateToProps, mapDispatchToProps)(TProducts);
