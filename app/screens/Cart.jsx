import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Block} from 'galio-framework';
import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { ProductCart as ProductCartService } from '@core/services/product-cart.service';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Tabs from '@custom-elements/Tabs';
import { AlertService } from '@core/services/alert.service';
import Order from '@custom-elements/Order';

import ListCart from '@custom-sections/ListCart'
import { getOrders } from '@core/module/store/orders/orders';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListData from '@custom-sections/ListData';
import { ORDERS } from '@shared/dictionaries/typeDataSerialize'
import Restricted from '@custom-elements/Restricted';

const { width } = Dimensions.get('screen');
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customStyleIndex: 0,
      deleteAction: false,
      myPrice: false,
      restricted: false,
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

    const response = await this.getDataPetition.getInfo(endPoints.orders, this.props.getOrders);
    if(response.restricted) {
      this.setState({restricted: true})
      return
    }
    this.setState({restricted: false})
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
    this.props.navigation.navigate('PlaceOrders', {nameRouteGoing: 'Cart'});
  }

  orderTotal = () => {
    const total = this.productCartService.totalOrder();
    return `${this.formatMoney.format(total)}`;
  };

  renderItemsPrevious = ({ item }) => (
    <Order item={item} />
  )

  renderPreviousOrder = () => (
    <Block style={{ height: Platform.OS === 'ios' ? hp('59%') : hp('76%') }}>
      {this.state.restricted ?
          <Restricted /> :
        <ListData
          endpoint={endPoints.orders}
          renderItems={this.renderItemsPrevious}
          typeData={ORDERS}
        />
      }
    </Block>
  );

  render() {
    return (
      <Block style={styles.container}>
        <Tabs
          optionsTabsRender={[
            {
              labelTab: 'Cart',
              component: (<ListCart
                onCheckoutPressed={() => this.onCheckoutPressed()}
                orderTotal={() => this.orderTotal()}
              />),
            },
            {
              labelTab: 'History',
              component: this.renderPreviousOrder(),
            },
          ]}
          tabIndexSelected={this.state.customStyleIndex}
          changeIndexSelected={(index) => this.setState({ customStyleIndex: index })}
        />
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
    height: 60,
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
