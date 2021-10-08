import React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCart } from '@core/services/product-cart.service';
import { FormatMoneyService } from '@core/services/format-money.service';
import { updateProducts } from '@core/module/store/cart/cart';
import QuantityCounterWithInput from '@components/QuantityCounterWithInput';

const { width } = Dimensions.get('screen');
const formatMoney = FormatMoneyService.getInstance();

const ProductCartComponent = (props) => {
  const productsInCart = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);

  const handleUpdateQuantity = (newCant) => {
    const newArrayCant = productCart.updateCant(props.product.id, newCant);
    dispatch(updateProducts(newArrayCant));
  };

  const getPriceProduct = () => {
    const price = props.product.myPrice ? props.product.rrp : props.product.cost_price;
    const totalPrice = parseFloat(price) * parseFloat(props.product.quantity);

    return formatMoney.format(totalPrice);
  };

  const handleDelete = (id) => {
    const updatedCart = productsInCart.filter((product) => product.id !== id);
    dispatch(updateProducts(updatedCart));
  };

  return (
    <Block card shadow style={styles.product}>
      <Block flex row>
        <Image source={{ uri: props.product.image }} style={styles.imageHorizontal} />
        <Block flex style={styles.productDescription}>
          <Block row>
            <Text color={nowTheme.COLORS.LIGHTGRAY}>{`SKU `}</Text>
            <Text color={nowTheme.COLORS.INFO}>FIE228106B</Text>
          </Block>

          <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
            {props.product.title}
          </Text>
          <Block flex left row space="between">
            <Text
              style={{ fontWeight: 'bold', marginTop: 10 }}
              color={nowTheme.COLORS.ORANGE}
              size={20}
            >
              {getPriceProduct()}
            </Text>
            {props.previusProduct ? (
              <Button
                color="warning"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 14, color: '#0E3A90' }}
                style={styles.buttonOrder}
              >
                Re-Order
              </Button>
            ) : (
              <QuantityCounterWithInput
                delete={() => handleDelete(props.product.id)}
                quantity={props.product.quantity}
                quantityHandler={(cant) => handleUpdateQuantity(cant)}
              />
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
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

  buttonOrder: {
    width: '35%',
    height: 30,
  },
});

export default ProductCartComponent;