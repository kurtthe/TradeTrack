import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateProducts, getProducts } from '@core/module/store/cart/cart';
import { FormatMoneyService } from '@core/services/format-money.service';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Tabs from '@custom-elements/Tabs';
import ProductCart from '@custom-elements/ProductCart';

const { width } = Dimensions.get('screen');
class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customStyleIndex: 0,
      deleteAction: false,
    };

    this.formatMoney = FormatMoneyService.getInstance();
  }

  handleDelete = (id) => {
    const updatedCart = this.props.cartProducts.filter((product) => product.id !== id);
    this.props.updateProducts(updatedCart);
  };

  onCheckoutPressed() {
    this.props.navigation.navigate('PlaceOrders');
  }

  orderTotal() {
    let prices = this.props.cartProducts.map((p) => {
      return p.price * p.quantity;
    });
    const reducer = (accumulator, curr) => accumulator + curr;
    return `${this.formatMoney.format(prices.reduce(reducer, 0))}`;
  }

  renderEmpty() {
    return (
      <Block style={styles.container_empty}>
        <Ionicons name="cart" color={'#828489'} size={60} />
        <Text style={{ fontFamily: 'montserrat-regular', fontSize: 24 }} color={'#000'}>
          Your cart is empty!
        </Text>
      </Block>
    );
  }

  renderProducts = ({ item }) => <ProductCart product={item} myPrice={this.state.myPrice} />;

  renderCurrentOrder = () => (
    <FlatList
      data={this.props.cartProducts}
      renderItem={this.renderProducts}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      ListEmptyComponent={this.renderEmpty()}
      style={{ width: width }}
    />
  );

  renderPreviousOrder = () => (
    <FlatList
      data={this.state.productsPreviousCart}
      renderItem={this.renderProducts}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      ListEmptyComponent={this.renderEmpty()}
      style={{ width: width }}
    />
  );

  renderFoother = () => {
    if (!this.props.cartProducts || this.props.cartProducts.length === 0) {
      return null;
    }

    return (
      <TouchableWithoutFeedback style={{ position: 'relative', bottom: 0 }}>
        <Block row style={styles.detailOrders}>
          <Text style={{ fontWeight: 'bold' }}>{`Order total: ${this.orderTotal()}`}</Text>
          <Button
            shadowless
            style={(styles.addToCart, { left: 10 })}
            color={nowTheme.COLORS.INFO}
            onPress={() => this.onCheckoutPressed()}
          >
            <Text size={18} color={nowTheme.COLORS.WHITE}>
              Checkout
            </Text>
          </Button>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <Block style={styles.container}>
        <Tabs
          optionsTabsRender={[
            {
              labelTab: 'Current orders',
              component: this.renderCurrentOrder(),
            },
            {
              labelTab: 'Previous orders',
              component: this.renderPreviousOrder(),
            },
          ]}
          tabIndexSelected={this.state.customStyleIndex}
          changeIndexSelected={(index) => this.setState({ customStyleIndex: index })}
        />
        {this.renderFoother()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
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

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts, getProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
