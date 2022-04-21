import React from 'react';
import { ScrollView, Dimensions } from 'react-native';

import { Block } from 'galio-framework';

import { nowTheme } from '@constants';
import Switch from '@custom-elements/Switch';
import { ProductCart } from '@core/services/product-cart.service';
import { connect } from 'react-redux';
import { updateProducts, changeClientFriendly } from '@core/module/store/cart/cart';
import { CategoriesProducts } from '@custom-sections/CategoriesProducts'

const { width } = Dimensions.get('screen');
class TProducts extends React.Component {
  constructor(props) {
    super(props);

    this.productCart = ProductCart.getInstance(props.cartProducts);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartProducts !== prevProps.cartProducts || !this.productCart) {
      this.productCart = ProductCart.getInstance(this.props.cartProducts);
    }
  }

  componentWillUnmount() {
    this.productCart = undefined;
  }


  handleChangeSwitch = (value) => {
    this.props.changeClientFriendly(!value)
    this.productCart.changePrice(!value, this.props.updateProducts);
  };

  render() {
    return (
      <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          <Block style={{ padding: 15 }}>
            <Switch
              card={true}
              title="Client Friendly Mode"
              onChange={(value) => this.handleChangeSwitch(value)}
            />
          </Block>

          <CategoriesProducts/>
        </ScrollView>
      </Block>
    );
  }
}



const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts, changeClientFriendly };

export default connect(mapStateToProps, mapDispatchToProps)(TProducts);
