import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { ProductCart as ProductCartService } from '@core/services/product-cart.service';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Tabs from '@custom-elements/Tabs';
import ProductCart from '@custom-elements/ProductCart';
import { AlertService } from '@core/services/alert.service';


const { width } = Dimensions.get('screen');
class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customStyleIndex: 0,
      deleteAction: false,
      myPrice: false
    };

    this.alertService = new AlertService();
    this.formatMoney = FormatMoneyService.getInstance();
    this.productCartService = ProductCartService.getInstance(props.cartProducts);
  }

  componentDidMount(){
    this.setState({
      myPrice: this.props.cartProducts[0].myPrice
    })
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.cartProducts) !== JSON.stringify(prevProps.cartProducts)) {
      this.productCartService = ProductCartService.getInstance(this.props.cartProducts);

      this.setState({
        myPrice: this.props.cartProducts[0].myPrice
      })

      this.orderTotal()
    }
  }

  onCheckoutPressed() {

    if(this.state.myPrice){
      this.alertService.show('Alert!', 'Cannot checkout in client mode, please disable');
      return;
    }
    this.props.navigation.navigate('PlaceOrders');
  }

  orderTotal = () => {
    const total = this.productCartService.totalOrder();
    return `${this.formatMoney.format(total)}`;
  };

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

  renderProducts = ({ item }) => <ProductCart product={item} />;

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
      <TouchableWithoutFeedback style={{ position: 'absolute', top: hp('80%') }}>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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

export default connect(mapStateToProps)(Cart);
