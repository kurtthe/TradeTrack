import React from 'react';
import { StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { ProductCart } from '@core/services/product-cart.service';
import { FormatMoneyService } from '@core/services/format-money.service';
import { updateProducts } from '@core/module/store/cart/cart';
import QuantityCounterWithInput from '@components/QuantityCounterWithInput';
import { updatePreOrder } from '@core/module/store/cart/preCart';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('screen');
const formatMoney = FormatMoneyService.getInstance();

const ProductCartComponent = ({ product, bought }) => {

  const productsInCart = useSelector((state) => {
    if (!bought) {
      return state.productsReducer.products
    }
    return state.preCartReducer.products
  });

  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);

  const handleUpdateQuantity = (newCant) => {
    const newArrayCant = productCart.updateCant(product.sku, newCant);
    if (!bought) {
      dispatch(updateProducts(newArrayCant));
      return
    }
    dispatch(updatePreOrder(newArrayCant));
  };

  const getPriceProduct = () => {
    const price = product.myPrice ? product.rrp : product.cost_price;
    const totalPrice = parseFloat(price) * parseFloat(product.quantity);

    return formatMoney.format(totalPrice);
  };

  const handleDelete = (id) => {
    const updatedCart = productsInCart.filter((product) => product.id !== id);
    dispatch(updateProducts(updatedCart));
  };

  const renderRightActions = () => {
    return (
      <Block card style={styles.delButton}>
        <MaterialCommunityIcons
          name='trash-can-outline'
          size={26}
          color='crimson'
          onPress={() => handleDelete(product.id)}
        />
      </Block>
    );
  };
  

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Block card shadow style={styles.product}>
        <Block flex row>
          <Image source={{ uri: product.cover_image }} style={styles.imageHorizontal} />
          <Block flex style={styles.productDescription}>
            <Block row>
              <Text color={nowTheme.COLORS.LIGHTGRAY}>{`SKU `}</Text>
              <Text color={nowTheme.COLORS.INFO}>{product.sku}</Text>
            </Block>

            <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
              {product.name}
            </Text>
            <Block style={(!bought ? styles.productCart : styles.productBought)}>
              {
                (!bought) && (
                  <Text
                    style={{ fontWeight: 'bold', marginTop: 10 }}
                    color={nowTheme.COLORS.ORANGE}
                    size={20}
                  >
                    {getPriceProduct()}
                  </Text>
                )
              }
              <QuantityCounterWithInput
                delete={() => handleDelete(product.id)}
                quantity={product.quantity}
                quantityHandler={(cant) => handleUpdateQuantity(cant)}
                bought={bought}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </Swipeable>
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
  productCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  productBought: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  delButton: {
    width: width * 0.15,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginRight: theme.SIZES.BASE,
    marginLeft: -theme.SIZES.BASE,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: theme.COLORS.WHITE,
    justifyContent: 'center', 
    alignItems:'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default ProductCartComponent;
