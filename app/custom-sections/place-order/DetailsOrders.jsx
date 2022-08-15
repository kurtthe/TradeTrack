import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import DetailOrder from '@custom-elements/DetailOrder';
import { FormatMoneyService } from '@core/services/format-money.service';

const { width } = Dimensions.get('screen');
const formatMoney = FormatMoneyService.getInstance();

const DetailsOrders = (props) => {
  const [loading, setLoading] = useState(false);

  const orderTotal = () => {
    let prices = props.cartProducts.map((p) => {
      const price = p.myPrice ? p.rrp : p.cost_price;
      return price * p.quantity;
    });
    const reducer = (accumulator, curr) => accumulator + curr;
    return `${formatMoney.format(prices.reduce(reducer, 0))}`;
  };

  const placeOrderHandler = async () => {
    setLoading(true);
    props.orderHandler && (await props.orderHandler());
    setLoading(false);
  };

  const renderOrder = ({ item }) => (
    <DetailOrder order={item} />
  )


  return (
    <Block card backgroundColor={'white'} width={width}>
      <Block style={styles.detailOrdersBlock}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 15, paddingVertical: 25 }}>Detail Orders</Text>
        <View style={{ flex: 1 }}>
          {
            props.cartProducts.length > 0 && (
              <FlatList
                data={props.cartProducts}
                renderItem={renderOrder}
                keyExtractor={(item, index) => `${item.id}-${index}`}

              />
            )
          }
        </View>
        <View
          style={{
            borderWidth: 0.7,
            marginVertical: 5,
            backgroundColor: '#E8E8E8',
            borderColor: '#E8E8E8',
          }}
        />
        <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top: 10 }}>
          <Text size={14}>Total (ex-GST)</Text>
          <Text
            size={16}
            color={nowTheme.COLORS.ORANGE}
            style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
          >
            {orderTotal()}
          </Text>
        </Block>
        <Block center style={{ position: 'relative', bottom: 5, paddingHorizontal: 20, paddingVertical: 14 }}>
          <Button
            color="info"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
            style={styles.button}
            onPress={() => placeOrderHandler()}
            loading={loading}
          >
            Place Order
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 3.1,
    marginTop: theme.SIZES.BASE,
  },
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '5%',
    marginVertical: theme.SIZES.BASE * 0.9,
  },
  buttonOrder: {
    width: Platform.OS === 'ios' ? width - 240 : width - 300,
  },
  detailOrdersBlock: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
});

export default DetailsOrders;
