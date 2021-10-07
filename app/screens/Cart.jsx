import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateProducts, getProducts } from '@core/module/store/cart/cart';
import { FormatMoneyService } from '@core/services/format-money.service';
import { ProductCart } from '@core/services/product-cart.service';

import Tabs from '@custom-elements/Tabs';

const { width } = Dimensions.get('screen');
class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customStyleIndex: 0,
      deleteAction: false,
      myPrice: true,
    };

    this.productCart = new ProductCart(props?.cartProducts);
    this.formatMoney = FormatMoneyService.getInstance();
  }

  componentDidMount() {
    this.setState({
      myPrice: this.props.route?.params?.myPrice,
    });
  }

  handleDelete = (id) => {
    const updatedCart = this.props.cartProducts.filter((product) => product.id !== id);
    this.props.updateProducts(updatedCart);
  };

  handleUpdateQuantity = (product, newCant) => {
    this.productCart.updateCant(product.id, newCant, this.props.updateProducts);
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

  renderCurrentOrder = () => {
    return (
      <>
        <Text> current</Text>
      </>
    );
  };

  renderPreviousOrder = () => {
    return (
      <>
        <Text> previous</Text>
      </>
    );
  };

  render() {
    return (
      <>
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  container_empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
  },
  products: {
    minHeight: '100%',
  },
  product: {
    width: width * 0.92,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 3,
  },
  productTitle: {
    fontFamily: 'montserrat-regular',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: 0,
  },
  imageHorizontal: {
    height: nowTheme.SIZES.BASE * 5,
    width: nowTheme.SIZES.BASE * 5,
    margin: nowTheme.SIZES.BASE / 2,
  },
  qty: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: theme.SIZES.BASE * 6.25,
    backgroundColor: nowTheme.COLORS.INPUT,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  checkout: {
    height: theme.SIZES.BASE * 3,
    fontSize: 14,
    width: width - theme.SIZES.BASE * 4,
  },
  quantityButtons: {
    width: 25,
    height: 25,
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    borderRadius: 8,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
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
  buttonOrder: {
    width: '35%',
    height: 30,
  },
  receiptText: {
    fontSize: 13,
    width: '60%',
  },
  receiptPrice: {
    fontSize: 14,
    color: nowTheme.COLORS.INFO,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
  },
  addButton: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts, getProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
