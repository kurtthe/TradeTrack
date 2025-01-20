import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Block} from 'galio-framework';
import {useSelector, useDispatch} from 'react-redux';
import {FormatMoneyService} from '@core/services/format-money.service';
import {ProductCart as ProductCartService} from '@core/services/product-cart.service';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Tabs from '@custom-elements/Tabs';
import {AlertService} from '@core/services/alert.service';
import Order from '@custom-elements/Order';
import TemplateOrder from '@custom-elements/TemplateOrder';
import ListCart from '@custom-sections/ListCart';
import {getOrders} from '@core/module/store/orders/orders';
import {GetDataPetitionService} from '@core/services/get-data-petition.service';
import {endPoints} from '@shared/dictionaries/end-points';
import ListData from '@custom-sections/ListData';
import {ORDERS} from '@shared/dictionaries/typeDataSerialize';
import Restricted from '@custom-elements/Restricted';

const {width} = Dimensions.get('screen');

const Cart = ({navigation}) => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [myPrice, setMyPrice] = useState(false);
  const [restricted, setRestricted] = useState(false);

  const cartProducts = useSelector(state => state.productsReducer.products);
  const dispatch = useDispatch();

  const alertService = new AlertService();
  const formatMoney = FormatMoneyService.getInstance();
  let productCartService = ProductCartService.getInstance(cartProducts);
  const getDataPetition = GetDataPetitionService.getInstance();

  useEffect(() => {
    const initialize = async () => {
      if (cartProducts[0]?.myPrice) {
        setMyPrice(cartProducts[0]?.myPrice);
      }

      const response = await getDataPetition.getInfo(endPoints.orders, () =>
        dispatch(getOrders()),
      );
      if (response.restricted) {
        setRestricted(true);
      } else {
        setRestricted(false);
      }
    };

    initialize();
  }, [cartProducts, dispatch]);

  useEffect(() => {
    productCartService = ProductCartService.getInstance(cartProducts);

    if (cartProducts[0]?.myPrice) {
      setMyPrice(cartProducts[0]?.myPrice);
    }
  }, [cartProducts]);

  const onCheckoutPressed = () => {
    if (myPrice) {
      alertService.show(
        'Alert!',
        'Cannot checkout in client mode, please disable',
      );
      return;
    }
    navigation.navigate('PlaceOrders', {nameRouteGoing: 'Cart'});
  };

  const orderTotal = () => {
    const total = productCartService.totalOrder();
    return `${formatMoney.format(total)}`;
  };

  const renderItemsPrevious = ({item}) => <Order item={item} />;

  const renderItemsTemplates = ({item}) => (
    <TemplateOrder key={`template-${Math.random()}`} item={item} />
  );

  const renderPreviousOrder = () => (
    <Block style={{height: Platform.OS === 'ios' ? hp('59%') : hp('76%')}}>
      {restricted ? (
        <Restricted />
      ) : (
        <ListData
          endpoint={endPoints.orders}
          renderItems={renderItemsPrevious}
          typeData={ORDERS}
        />
      )}
    </Block>
  );

  const renderTemplatesForProducts = () => (
    <Block style={{height: Platform.OS === 'ios' ? hp('59%') : hp('76%')}}>
      {restricted ? (
        <Restricted />
      ) : (
        <ListData
          endpoint={endPoints.templates}
          renderItems={renderItemsTemplates}
          typeData={ORDERS}
        />
      )}
    </Block>
  );

  return (
    <Block style={styles.container}>
      <Tabs
        optionsTabsRender={[
          {
            labelTab: 'Cart',
            component: (
              <ListCart
                onCheckoutPressed={onCheckoutPressed}
                orderTotal={orderTotal}
              />
            ),
          },
          {
            labelTab: 'Templates',
            component: renderTemplatesForProducts(),
          },
          {
            labelTab: 'History',
            component: renderPreviousOrder(),
          },
        ]}
        tabIndexSelected={customStyleIndex}
        changeIndexSelected={setCustomStyleIndex}
      />
    </Block>
  );
};

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
    shadowOffset: {width: 0, height: 7},
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});

export default Cart;
