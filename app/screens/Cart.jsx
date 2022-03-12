import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { ProductCart as ProductCartService } from '@core/services/product-cart.service';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Tabs from '@custom-elements/Tabs';
import { AlertService } from '@core/services/alert.service';
import PreviousOrder from '@custom-sections/PreviousOrder'
import ListCart from '@custom-sections/ListCart'
import { getOrders } from '@core/module/store/orders/orders';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListData from '@custom-sections/ListData';


const { width } = Dimensions.get('screen');
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customStyleIndex: 0,
      deleteAction: false,
      myPrice: false,
    };

    this.alertService = new AlertService();
    this.formatMoney = FormatMoneyService.getInstance();
    this.productCartService = ProductCartService.getInstance(props.cartProducts);
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    if (!!this.props.cartProducts[0]?.myPrice) {
      this.setState({
        myPrice: this.props.cartProducts[0]?.myPrice,
      });
    }

    await this.getDataPetition.getInfo(endPoints.orders, this.props.getOrders);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.cartProducts) !== JSON.stringify(prevProps.cartProducts)) {
      this.productCartService = ProductCartService.getInstance(this.props.cartProducts);

      if (
        !!this.props.cartProducts[0]?.myPrice ||
        this.props.cartProducts[0]?.myPrice !== prevProps.cartProducts[0]?.myPrice
      ) {
        this.setState({
          myPrice: this.props.cartProducts[0]?.myPrice,
        });
      }
    }
  }

  onCheckoutPressed() {
    if (this.state.myPrice) {
      this.alertService.show('Alert!', 'Cannot checkout in client mode, please disable');
      return;
    }
    this.props.navigation.navigate('PlaceOrders');
  }

  orderTotal = () => {
    const total = this.productCartService.totalOrder();
    return `${this.formatMoney.format(total)}`;
  };

  renderCurrentOrder = () => (
    <ListCart cartProducts={this.props.cartProducts} />
  );

  renderPreviousOrder = () => (
    <Block style={{height: hp('70%')}}>
      <ListData
        endpoint={endPoints.orders}
        children={<PreviousOrder data={this.props.orders} />}
      />
    </Block>
  );

  renderFooter = () => {
    if (!this.props.cartProducts || this.props.cartProducts.length === 0) {
      return null;
    }

    const titleOrder = this.state.myPrice ? 'Total RRP (ex-GST) ' : 'Total (ex-GST)';

    return (
      <TouchableWithoutFeedback style={{ position: 'absolute', top: hp('80%') }}>
        <Block row style={styles.detailOrders}>
          <Text style={{ fontWeight: 'bold' }}>{`${titleOrder}: ${this.orderTotal()}`}</Text>

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
              labelTab: 'Current order',
              component: this.renderCurrentOrder(),
            },
            {
              labelTab: 'Previous order',
              component: this.renderPreviousOrder(),
            },
          ]}
          tabIndexSelected={this.state.customStyleIndex}
          changeIndexSelected={(index) => this.setState({ customStyleIndex: index })}
        />
        {this.renderFooter()}
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
  orders: state.ordersReducer.orders
});

const mapDispatchToProps = { getOrders };


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
