import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  View,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';

import { Block, Text, Button, theme } from 'galio-framework';
import QuantityCounterWithInput from '@components/QuantityCounterWithInput';
import nowTheme from '@constants/Theme';
import { connect } from 'react-redux';
import { updateProducts } from '@core/module/store/cart/cart';
import { ProductCart } from '@core/services/product-cart.service';
import { FormatMoneyService } from '@core/services/format-money.service';
import LoadingComponent from '@custom-elements/Loading';

const { height, width } = Dimensions.get('window');
const sizeConstantSmall =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 14
      : 16
    : Dimensions.get('window').height < 870
    ? 14
    : 16;
const sizeConstantBig =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 20
      : 24
    : Dimensions.get('window').height < 870
    ? 20
    : 24;

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: null,
      hideMyPrice: false,
      productDetail: null,
      cantProduct: 1,
    };

    this.productCart = ProductCart.getInstance(props?.cartProducts);
    this.formatMoney = FormatMoneyService.getInstance();
  }

  componentDidMount() {
    this.setState({
      hideMyPrice: this.props.route?.params?.hideMyPrice,
      productDetail: this.props.route?.params?.product,
    });
  }

  renderProgress = () => {
    const { productDetail } = this.state;

    const productImages = [productDetail?.image, productDetail?.image];
    const position = Animated.divide(this.scrollX, width);

    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return <Animated.View key={i} style={[styles.dots, { opacity }]} />;
        })}
      </Block>
    );
  };

  renderGallery = () => {
    const { productDetail } = this.state;
    const productImages = [productDetail?.image, productDetail?.image];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback key={`product-image-${index}`}>
            <Image
              resizeMode="contain"
              source={{ uri: productDetail.image }}
              style={{ width: width * 0.95, height: width * 0.8 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };

  onAddCartPressed = (productItem) => {
    const priceProduct = this.state.hideMyPrice ? productItem.rrp : productItem.cost_price;

    const addProduct = {
      ...productItem,
      quantity: this.state.cantProduct,
      price: priceProduct,
      cantSend: this.state.cantProduct > 1,
    };
    this.productCart.addCart(addProduct, this.props.updateProducts);
  };

  render() {
    const { productDetail } = this.state;

    if (!productDetail || productDetail == undefined || productDetail === undefined) {
      return <LoadingComponent />;
    }

    return (
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={120} style={styles.product}>
        <ScrollView>
          <Block
            row
            flex
            style={{
              backgroundColor: nowTheme.COLORS.BACKGROUND,
              height: 25,
              alignItems: 'center',
              justifyContent: Platform.OS == 'android' ? 'space-between' : 'space-evenly',
            }}
          ></Block>

          <Block flex>{this.renderGallery()}</Block>
          <Block flex style={styles.options}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE,
              }}
            >
              <Text
                size={
                  Platform.OS === 'ios'
                    ? Dimensions.get('window').height < 670
                      ? 20
                      : 23
                    : Dimensions.get('window').height < 870
                    ? 20
                    : 23
                }
                style={{ paddingBottom: 24, fontWeight: '500' }}
              >
                {productDetail?.name}
              </Text>
              <Block row style={{ width: '100%' }}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                     Price
                  </Text>
                  <Text
                    style={{ fontFamily: 'montserrat-bold' }}
                    color={nowTheme.COLORS.ORANGE}
                    size={sizeConstantBig}
                  >
                    {this.formatMoney.format(productDetail?.rrp)}
                  </Text>
                </Block>
                {!this.state.hideMyPrice && (
                  <>
                    <View
                      style={{
                        borderWidth: 0.5,
                        marginHorizontal: 10,
                        height: '100%',
                        borderColor: nowTheme.COLORS.LIGHTGRAY,
                      }}
                    ></View>
                    <Block flex right>
                      <Text
                        color={nowTheme.COLORS.LIGHTGRAY}
                        style={(styles.priceGrayText, { right: 5 })}
                      >
                        My Price
                      </Text>
                      <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        color={nowTheme.COLORS.ORANGE}
                        size={sizeConstantBig}
                      >
                        {this.formatMoney.format(productDetail?.cost_price)}
                      </Text>
                    </Block>
                  </>
                )}
              </Block>
            </Block>
            <View style={styles.grayLine} />
            <Block style={{ padding: theme.SIZES.BASE }}>
              <Text style={{ paddingBottom: 15 }} size={16}>
                Details Product
              </Text>
              <Block row style={{ paddingBottom: 15 }}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    {' '}
                    SKU{' '}
                  </Text>

                  <Text color={nowTheme.COLORS.INFO} size={sizeConstantSmall}>
                    {' '}
                    {productDetail?.sku}{' '}
                  </Text>
                </Block>
                {/* <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    Type
                  </Text>

                  <Text
                    color={nowTheme.COLORS.INFO}
                    size={
                      Platform.OS === 'ios'
                        ? Dimensions.get('window').height < 670
                          ? 14
                          : 16
                        : Dimensions.get('window').height < 870
                        ? 14
                        : 16
                    }
                  >
                    {' '}
                    {productDetail?.type}{' '}
                  </Text>
                </Block> */}
              </Block>
            </Block>
          </Block>
        </ScrollView>
        <View style={styles.quantityBar}>
          <QuantityCounterWithInput
            product
            quantity={productDetail?.quantity ? productDetail?.quantity : this.state.cantProduct}
            quantityHandler={(cant) => this.setState({ cantProduct: cant })}
          />
          <Button
            shadowless
            style={styles.addToCart}
            color={nowTheme.COLORS.INFO}
            onPress={() => this.onAddCartPressed(productDetail)}
          >
            <Text size={18} color={nowTheme.COLORS.WHITE}>
              Add to Cart
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0
  },
  productDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  grayLine: {
    marginTop: '5%',
    height: 4,
    width: width,
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    marginHorizontal: -theme.SIZES.BASE,
  },
  grayDescriptionLine: {
    height: 1,
    width: '100%',
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    alignSelf: 'center',
    marginVertical: 15,
  },
  priceGrayText: {
    paddingLeft: 2,
    fontSize: 14,
  },
  priceOrange: {
    fontWeight: 'bold',
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE * 0.6,
    marginTop: -theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  galleryImage: {
    width: width,
    height: 'auto',
  },
  dots: {
    borderRadius: 20,
    height: 7,
    width: 7,
    margin: 5,
    backgroundColor: 'black',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 20,
  },
  addToCart: {
    width: width * 0.5,
  },
  image_temp: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  quantityBar: {
    paddingTop: Platform.OS == 'ios' ? 0 : 3,
    backgroundColor: Platform.OS == 'ios' ? 'white' : 'transparent',
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderTopColor: 'black',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { updateProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Product);
