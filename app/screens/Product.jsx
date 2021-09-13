import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
  View,
  KeyboardAvoidingView
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import QuantityCounterWithInput from "@components/QuantityCounterWithInput";
import nowTheme from "@constants/Theme";
import { connect  } from 'react-redux';
import { updateProducts } from '@core/module/store/cart/cart';

const { height, width } = Dimensions.get("window");
const sizeConstantSmall = (Platform.OS === 'ios') 
  ? ((Dimensions.get('window').height < 670) ? 14 : 16 ) 
  : (Dimensions.get('window').height < 870) ? 14 : 16;
const sizeConstantBig = (Platform.OS === 'ios') 
  ? ((Dimensions.get('window').height < 670) ? 20 :24) 
  : (Dimensions.get('window').height < 870) ? 20 : 24;

class Product extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedSize: null,
      hideMyPrice: !this.props.route.params.hideMyPrice
    };
  }

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const product = params.product;
    const product = route.params?.product;
    const productImages = [
      product.image,
      product.image
    ];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: this.scrollX } } }],
          {useNativeDriver: false}
          )}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`product-image-${index}`}
          >
            <Image
              resizeMode="contain"
              source={{uri: product.image}}
              style={{ width: width*0.95, height: width *0.8 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };

  numberWithDecimals(number) {
    return `$${(Math.round(number * 100) / 100).toFixed(2)}`
  }

  handleUpdateQuantity = (item, q) => {
    let price = this.state.hideMyPrice ? item.rrp : item.cost_price
    let itemQ = ({...item, quantity: 1, price: price})
    const index = this.props.cartProducts.findIndex((element) => (
      element.id === item.id
    ))
    if (index !== -1) {
      this.props.updateProducts([
        ...this.props.cartProducts.slice(0, index),
        {
          ...this.props.cartProducts[index],
          quantity: q,
          price: price
        },
        ...this.props.cartProducts.slice(index+1)
      ])
    } else {
      this.props.updateProducts([...this.props.cartProducts, itemQ])
    }
  }

  onAddCartPressed(product) {
    let price = this.state.hideMyPrice ? product.rrp : product.cost_price
    let itemQ = ({...product, quantity: 1, price: price})
    const index = this.props.cartProducts.findIndex((element) => (
      element.id === product.id
    ))
    if (index !== -1) {
      this.props.updateProducts([
        ...this.props.cartProducts.slice(0, index),
        {
          ...this.props.cartProducts[index],
          quantity: this.props.cartProducts[index].quantity + 1,
          price: price
        },
        ...this.props.cartProducts.slice(index+1)
      ]) 
    } else {
      this.props.updateProducts([...this.props.cartProducts, itemQ])
    }
  }

  renderProgress = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    const product = route.params?.product;
    const productImages = [
      product.image,
      product.image
    ];

    const position = Animated.divide(this.scrollX, width);

    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp"
          });

          return (
            <Animated.View key={i} style={[styles.dots, { opacity }]} />
          );
        })}
      </Block>
    );
  };

  renderDescription = (product) => {
    return (
      product.description?.map((d) => {
        return <Text style={{paddingBottom: 5}}>- {d}</Text>
      })
    )
  }
  render() {
    const { navigation, route } = this.props;
    const product = route.params?.product;

    return (
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={120} style={styles.product}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <Block row flex style={{backgroundColor: nowTheme.COLORS.BACKGROUND, height: 25, alignItems: 'center', justifyContent: Platform.OS == 'android' ? 'space-between' : 'space-evenly'}}>
           
          </Block>
          <Block flex>
            {this.renderGallery()}
            <Block center style={styles.dotsContainer}>
              {this.renderProgress()}
            </Block>
          </Block>
          <Block flex style={styles.options}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE
              }}
            >

              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 20 :23) :  (Dimensions.get('window').height < 870) ? 20: 23} style={{ paddingBottom: 24, fontWeight: '500' }} >

                {product.name}
              </Text>
              <Block row style={{width: '100%'}}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}> 
                    The Price 
                  </Text>
                  <Text style={{ fontFamily: 'montserrat-bold',}} color={nowTheme.COLORS.ORANGE} size={sizeConstantBig}> 
                    {this.numberWithDecimals(product.rrp)} 
                  </Text>
                </Block>
                {this.state.hideMyPrice &&
                  <>
                    <View  style={{borderWidth: 0.5, marginHorizontal: 10, height: '100%', borderColor: nowTheme.COLORS.LIGHTGRAY}}></View>
                    <Block flex right >
                      <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText, {right:5}}>
                        My Price 
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-bold',}} color={nowTheme.COLORS.ORANGE} size={sizeConstantBig}> 
                        {this.numberWithDecimals(product.cost_price)} 
                      </Text>
                    </Block>
                  </>
                }
              </Block>
            </Block>
            <View style={styles.grayLine}/>
            <Block style={{ padding: theme.SIZES.BASE }}>
              <Text style={{paddingBottom: 15}} size={16} >Details Product</Text>
              <Block row style={{paddingBottom: 15}}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}> SKU </Text>

                  <Text  color={nowTheme.COLORS.INFO} size={sizeConstantSmall}> {product.sku} </Text>

                </Block>
                <Block flex >
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    Type
                  </Text>

                  <Text color={nowTheme.COLORS.INFO} size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}> {product.type} </Text>

                </Block>
              </Block>

            </Block> 
          </Block> 
          </ScrollView>
          <View style={styles.quantityBar}>
            <QuantityCounterWithInput 
              product
              quantity={product.quantity ? product.quantity : 1}
              quantityHandler={(q) => this.handleUpdateQuantity(product, q)}
            />
              <Button
                shadowless
                style={styles.addToCart}
                color={nowTheme.COLORS.INFO}
                onPress={() => this.onAddCartPressed(product)}
              >
                <Text size={18} color={nowTheme.COLORS.WHITE}>Add to Cart</Text>
              </Button>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    flex: 1,
    marginTop: 0
  },
  grayLine: {
    marginTop: '5%', 
    height: 4, 
    width: width, 
    backgroundColor: nowTheme.COLORS.BACKGROUND, 
    marginHorizontal: -theme.SIZES.BASE
  },
  grayDescriptionLine: {
    height: 1, 
    width: '100%', 
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    alignSelf: 'center',
    marginVertical: 15
  },
  priceGrayText: {
    paddingLeft: 2,
    fontSize: 14
  },
  priceOrange: {
    fontWeight: 'bold'
  },
  options: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE * 0.6,
    marginTop: -theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE
  },
  galleryImage: {
    width: width,
    height: "auto"
  },
  dots: {
    borderRadius: 20,
    height: 7,
    width: 7,
    margin: 5,
    backgroundColor: 'black'
  },
  dotsContainer: {
    position: "absolute",
    bottom: theme.SIZES.BASE,
    left: 0,
    right: 0,
    bottom: height / 20
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
    backgroundColor: Platform.OS == 'ios' ? 'white': 'transparent',
    flexDirection: 'row',
    position: 'relative',
    bottom: Platform.OS == 'ios' ? '5%' : '10%',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderTopColor: 'black',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  }
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products
});

const mapDispatchToProps = { updateProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Product);