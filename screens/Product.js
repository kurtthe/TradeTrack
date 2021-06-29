import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
  View
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import { Icon } from "../components";
import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

export default class Product extends React.Component {
  state = {
    selectedSize: null
  };

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
            // onPress={() =>
            //    navigation.navigate("Gallery", { images: productImages, index })
            // }
          >
            <Image
              resizeMode="contain"
              source={image}
              style={{ width: width*0.95, height: width *0.8 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };

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
      product.description.map((d) => {
        return <Text style={{paddingBottom: 5}}>- {d}</Text>
      })
    )
  }
  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    const product = route.params?.product;

    return (
      <Block flex style={styles.product}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <Block row flex style={{backgroundColor: nowTheme.COLORS.BACKGROUND, height: 50, alignItems: 'center', justifyContent: Platform.OS == 'android' ? 'space-between' : 'space-evenly'}}>
            <Text style={{marginLeft: 15}}>
              {`Bathroom Furnitures`}
            </Text>
            <Text>
              {` > `}
            </Text>
            <Text numberOfLines={1} color={nowTheme.COLORS.INFO} style={{width: '55%',  }}>
              {product.title}
            </Text>
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
                paddingTop: theme.SIZES.BASE * 2
              }}
            >
              <Text size={24} style={{ paddingBottom: 24, fontWeight: '500' }} >
                {product.title}
              </Text>
              <Block row style={{width: '100%'}}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}> The Price: </Text>
                  <Text color={nowTheme.COLORS.ORANGE} size={25}> {product.price} </Text>
                </Block>
                <View  style={{borderWidth: 1, marginHorizontal: 10, height: '100%', borderColor: nowTheme.COLORS.LIGHTGRAY}}></View>
                <Block flex right >
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    My Price: 
                  </Text>
                  <Text color={nowTheme.COLORS.ORANGE} size={25}> {product.myPrice} </Text>
                </Block>
              </Block>
            </Block>


            <Block style={{ padding: theme.SIZES.BASE }}>
              <Text style={{paddingBottom: 15}} size={16} >Details Product</Text>
              <Block row style={{paddingBottom: 15}}>
                <Block flex>
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}> SKU: </Text>
                  <Text color={nowTheme.COLORS.INFO} size={18}> {product.sku} </Text>
                </Block>
                <Block flex >
                  <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                    Type: 
                  </Text>
                  <Text color={nowTheme.COLORS.INFO} size={18}> {product.type} </Text>
                </Block>
              </Block>

              <Block flex>
                
               <TouchableOpacity style={{
                 backgroundColor:'#f5f6fa', 
                 width: wp('85%') ,
                 height: hp('8%') ,
                 borderRadius:7.5,
                 }}>

                <Block row style={{paddingBottom: 15}}>

                  <Block flex center >
                  <Image style={{marginLeft:20, width: 30, height: 30, resizeMode: 'contain',}}


                  source={require('../assets/imgs/img/file-sheet.png')}
                />
                  </Block>

                  <Block flex={4}>
                    <Text style={{fontFamily: 'montserrat-regular', padding:9}} size={14}  > Catalog Details.pdf: </Text> 
                    <Text style={{fontFamily: 'montserrat-regular', paddingLeft:10, top:-9.5 }} size={12}  > 2mb </Text> 
                  </Block>

                  <Block flex center >
                  <Image style={styles.image_temp}


                  source={require('../assets/imgs/img/download-circle.png')}
                />
                  </Block>

                </Block>

               </TouchableOpacity>
              </Block>
              <Block>
                <Text style={{paddingVertical: 20}} size={16}>
                  Description
                </Text>
                {this.renderDescription(product)}
                <Text center color={nowTheme.COLORS.ORANGE} style={{paddingTop: 10}}>
                  *Refer to manufacturer for full Warranty Details
                </Text>
              </Block>
            </Block>
          </Block>
          </ScrollView>
          <View style={styles.quantityBar}>
              <Button
                shadowless
                style={styles.quantityButtons}
                color={'#f0f0f0'}
              >
                <Text style={styles.quantityTexts}>
                  -
                </Text>
              </Button>
              <Text style={{marginHorizontal: 10}}>
                1
              </Text>
              <Button 
                shadowless 
                style={styles.quantityButtons}
                color={nowTheme.COLORS.ORANGE}
              >
                <Text color={'white'} style={styles.quantityTexts}>
                  +
                </Text>
              </Button>
              <Button
                shadowless
                style={styles.addToCart}
                color={nowTheme.COLORS.INFO}
                onPress={() => navigation.navigate("Cart")}
              >
                <Text size={18} color={nowTheme.COLORS.WHITE}>Add to Cart</Text>
              </Button>
          </View>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    //marginTop: Platform.OS === "android" ? -HeaderHeight : 0
    marginTop: 0
  },
  priceGrayText: {
    paddingLeft: 2,
    fontSize: 13
  },
  options: {
    position: "relative",
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
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
  quantityButtons: {
    width: 40,
    height: 40
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20
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
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    borderTopColor: 'black',
  }
});
