import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Block} from 'galio-framework';
import {useSelector, useDispatch} from 'react-redux';
import {FormatMoneyService} from '@core/services/format-money.service';
import {ProductCart as ProductCartService} from '@core/services/product-cart.service';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Tabs from '@custom-elements/Tabs';
import {AlertService} from '@core/services/alert.service';
import ListCart from '@custom-sections/ListCart';
import ListOrders from '@custom-sections/ListOrders';
import ListTemplates from '@custom-sections/ListTemplates';
import {getOrders} from '@core/module/store/orders/orders';
import {GetDataPetitionService} from '@core/services/get-data-petition.service';
import {endPoints} from '@shared/dictionaries/end-points';
import Restricted from '@custom-elements/Restricted';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const Cart = ({navigation}) => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [myPrice, setMyPrice] = useState(false);
  const [restricted, setRestricted] = useState(false);

  const cartProducts = useSelector(state => state.productsReducer.products);
  const dispatch = useDispatch();
  const route = useRoute();

  const alertService = new AlertService();
  const formatMoney = FormatMoneyService.getInstance();
  const getDataPetition = GetDataPetitionService.getInstance();

  const productCartService = ProductCartService.getInstance(cartProducts);

  useEffect(() => {
    (async () => {
      setCustomStyleIndex(route.params?.indexSelectedTap ?? 0);
    })();
  }, [route.params?.indexSelectedTap]);

  const fetchOrdersData = useCallback(async () => {
    const response = await getDataPetition.getInfo(endPoints.orders, () =>
      dispatch(getOrders()),
    );
    setRestricted(response.restricted || false);
  }, [dispatch, getDataPetition]);

  useEffect(() => {
    if (cartProducts[0]?.myPrice !== undefined) {
      setMyPrice(cartProducts[0]?.myPrice);
    }
    fetchOrdersData();
  }, [cartProducts, fetchOrdersData]);

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

  const orderTotal = useCallback(() => {
    const total = productCartService.totalOrder();
    return formatMoney.format(total);
  }, [productCartService, formatMoney]);

  const renderDataList = useCallback(() => {
    if (restricted) return <Restricted />;

    const listHeight = Platform.OS === 'ios' ? hp('59%') : hp('76%');

    switch (customStyleIndex) {
      case 1:
        return (
          <Block style={{height: listHeight}}>
            <ListOrders />
          </Block>
        );
      case 2:
        return (
          <Block style={{height: listHeight}}>
            <ListTemplates />
          </Block>
        );
      default:
        return (
          <ListCart
            onCheckoutPressed={onCheckoutPressed}
            orderTotal={orderTotal}
          />
        );
    }
  }, [customStyleIndex, restricted, onCheckoutPressed, orderTotal]);

  return (
    <Block style={styles.container}>
      <Tabs
        optionsTabsRender={[
          {labelTab: 'Cart', component: renderDataList()},
          {labelTab: 'Online Orders', component: renderDataList()},
          {labelTab: 'Templates', component: renderDataList()},
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
