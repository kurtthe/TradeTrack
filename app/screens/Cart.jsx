import React, { createRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { nowTheme } from "@constants/index";
import { cart } from "@constants";
import FilterButton from "@components/FilterButton";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import SegmentedControlTab from 'react-native-segmented-control-tab'
import ActionSheet from "react-native-actions-sheet";
import QuantityCounter from "@components/QuantityCounter";
import { connect  } from 'react-redux';
import { updateProducts, getProducts } from '@core/module/store/cart/cart';

const { width } = Dimensions.get("screen");
const actionSheetRef = createRef();

class Cart extends React.Component {
  state = {
    customStyleIndex: 0,
    deleteAction: false
  };

  handleCustomIndexSelect = (index) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
  }

  handleQuantity = (id, qty) => {
    const { cartProducts } = this.props;

    const updatedCart = cart.map(product => {
      if (product.id === id) product.qty = qty;
      return product;
    });

    this.setState({ cart: updatedCart });
  };

  handleDelete = id => {
    const updatedCart = this.props.cartProducts.filter(product => product.id !== id);
    this.props.updateProducts(updatedCart)
  };

  handleAdd = item => {
    const { cart } = this.state;

    cart.push({
      ...item,
      id: cart.length + 1,
      stock: true,
      qty: 1
    });

    this.setState({ cart });
  };

  numberWithDecimals(number) {
    return `$${(Math.round(number * 100) / 100).toFixed(2)}`
  }

  onCheckoutPressed() {
    this.props.navigation.navigate("PlaceOrders")
  }

  orderTotal() {
    let prices = this.props.cartProducts.map((p) => {
      return p.cost_price
    })
    const reducer = (accumulator, curr) => accumulator + curr;
    return `$${prices.reduce(reducer, 0)}`
  }

  renderProduct = ({ item }) => {
    const { navigation } = this.props;

    return (
      <Block card shadow style={styles.product}>
        <Block flex row>
          <TouchableWithoutFeedback
            //  onPress={() => navigation.navigate("Product", { product: item })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.imageHorizontal}
            />
          </TouchableWithoutFeedback>
          <Block flex style={styles.productDescription}>
            <Block row>
              <Text color={nowTheme.COLORS.LIGHTGRAY}>
                {`SKU `}
              </Text>
              <Text color={nowTheme.COLORS.INFO}>
                {item.sku}
              </Text>
            </Block>
            <TouchableWithoutFeedback
              //onPress={() =>  navigation.navigate("Product", { product: item }) }
            >
              <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
                {item.name}
              </Text>
            </TouchableWithoutFeedback>
            <Block row style={{paddingBottom:5}}>
              <Block flex left row space="between">
                <Text
                  style={{ marginTop:10, fontWeight:'bold'}}
                  color={nowTheme.COLORS.ORANGE} size={20}
                >
                  {this.numberWithDecimals(item.cost_price)}
                </Text>
              </Block>
              <QuantityCounter 
                delete={() => this.handleDelete(item.id)} 
                quantity={1}
              />
              {/* <TouchableOpacity  onPress={() => this.handleDelete(item.id)} style={{padding:10}} >
                <Ionicons name="trash-sharp" color={'red'}  size={20} />
              </TouchableOpacity> */}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderProduct2 = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Block card shadow style={styles.product}>
        <Block flex row>
          <TouchableWithoutFeedback
            //  onPress={() => navigation.navigate("Product", { product: item })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.imageHorizontal}
            />
          </TouchableWithoutFeedback>
          <Block flex style={styles.productDescription}>
            <Block row>
              <Text color={nowTheme.COLORS.LIGHTGRAY}>
                {`SKU `}  
              </Text>
              <Text color={nowTheme.COLORS.INFO}>
                FIE228106B
              </Text>
            </Block>
            <TouchableWithoutFeedback
              //onPress={() =>  navigation.navigate("Product", { product: item }) }
            >
              <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
                {item.title}
              </Text>
            </TouchableWithoutFeedback>
            <Block flex left row space="between">
              <Text
                style={{ fontWeight: 'bold', marginTop:10}}
                color={nowTheme.COLORS.ORANGE} size={20}
              >
                ${item.price * item.qty}
              </Text>
              <Button
                color="warning"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 14, color:'#0E3A90' }}
                style={styles.buttonOrder}
                //onPress={() => navigation.navigate("Login")}
              >
                Re-Order
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };


  renderASHeader = () => {
    return (
      <Block row style={{paddingHorizontal: 20, paddingTop: 10, alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{ fontWeight: 'bold'}}>
          Detail Orders
        </Text>
        <MaterialIcons name="expand-more" color={'gray'} size={30} />
      </Block>
    )
  }

  renderHeader = () => {
    const { navigation } = this.props;
    const { cart } = this.state;

    return (
      <Block width={width} style={{ alignItems: 'center', paddingVertical: 8, marginBottom: -5 }}>
       {/*  <Block row space={'evenly'} width={'70%'} style={{ justifyContent: 'space-evenly', marginLeft: -width*0.26}}>
            <FilterButton
              text={'Bathroom'}
            />
            <FilterButton
              text={'Kitchen'}
            />
            <FilterButton
              text={'Laundry'}
            />
        </Block> */}
      </Block>
    );
  };

  renderDetailOrdersAS = () => {
    const orders = [
      {
        title: '1x Kaya Basin/Bath Wall Mixer 160mm..',
        price: '$375'
      },
      {
        title: '1x Di Lusso 60cm Th601Ss Telescopi..',
        price: '$244.99'
      },
      {
        title: '1x Lillian Basin Set 1/4 Turn Ceramic..',
        price: '$225.99'
      }
    ]

    return orders.map((orders) => {
      return (
        <Block keyExtractor={(i) => {index: i}} row style={{ justifyContent: 'space-between', paddingBottom: 7}}>
          <Text style={styles.receiptText}>
            {orders.title}
          </Text>
          <Text style={styles.receiptPrice}>
            {orders.price}
          </Text>
        </Block>
      )
    })
  }

  renderEmpty() {
    return <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.ERROR}>The cart is empty</Text>;
  }

  render() {
    const { customStyleIndex } = this.state
    return (
      <Block flex center style={styles.cart}>
        <SegmentedControlTab
            values={['Current Order', 'Previous Orders']}
            selectedIndex={customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderColor: 'transparent', borderBottomWidth: 2, borderBottomColor: '#D2D2D2' }}
            activeTabStyle={{ backgroundColor: nowTheme.COLORS.BACKGROUND, marginTop: 2, borderBottomWidth: 2, borderBottomColor: nowTheme.COLORS.INFO}}
            tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
            activeTabTextStyle={{ color: nowTheme.COLORS.INFO }}
          />
          {customStyleIndex === 0
                    && <FlatList
                          data={this.props.cartProducts}
                          renderItem={this.renderProduct}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item, index) => `${index}-${item.sku}`}
                          ListEmptyComponent={this.renderEmpty()}
                          ListHeaderComponent={this.renderHeader()}
                          style={{width: width}}
                        />}
          {customStyleIndex === 1
                    && <FlatList
                          data={this.state.cart2}
                          renderItem={this.renderProduct2}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item, index) => `${index}-${item.title}`}
                          ListEmptyComponent={this.renderEmpty()}
                          ListHeaderComponent={this.renderHeader()}
                      />}
          {/* Detail Orders ActionSheet Workaround */}
          {/*   <TouchableWithoutFeedback 
              onPress={() => actionSheetRef.current?.setModalVisible()}
              style={{position: 'relative', bottom: 0}}
            >
              <Block row style={styles.detailOrders}>
                <Text style={{ fontWeight: 'bold'}}>
                  Detail Orders
                </Text>
                <MaterialIcons name="expand-less" color={'gray'} size={30} />
              </Block>
            </TouchableWithoutFeedback> */}

            <TouchableWithoutFeedback
              style={{position: 'relative', bottom: 0}}
            >
              <Block row style={styles.detailOrders}>
                <Text style={{fontWeight: 'bold'}}>
                  {`Order total: ${this.orderTotal()}`}
                </Text>
                <Button
                  shadowless
                  style={styles.addToCart, {left:10}}
                  color={nowTheme.COLORS.INFO}
                  onPress={() => this.onCheckoutPressed()}
                >
                <Text size={18} color={nowTheme.COLORS.WHITE}>Checkout</Text>
              </Button>
              </Block>
            </TouchableWithoutFeedback>

          {/* End of Detail Orders ActionSheet Workaround */}
          <ActionSheet ref={actionSheetRef} headerAlwaysVisible CustomHeaderComponent={this.renderASHeader()}>
            <Block style={{height: 'auto', padding: 20}}>
              {this.renderDetailOrdersAS()}
              <View style={{borderWidth: 0.7, marginVertical: 5, backgroundColor:'#E8E8E8', borderColor:'#E8E8E8'}}/>
              <Block row style={{ justifyContent: 'space-between', paddingBottom: 15}}>
                <Text size={14}>
                  Total Orders
                </Text>
                <Text size={16} color={nowTheme.COLORS.ORANGE} style={{fontWeight: Platform.OS == 'android' ? 'bold' : '600'}}>
                  $224.99
                </Text>
              </Block>
              <Button
                color="info"
                textStyle={{ fontWeight: 'bold', fontSize: 16, borderWidth: 1 }}
                style={styles.button}
                onPress={() => this.props.navigation.navigate("PlaceOrders")}
              >
                Place Order
              </Button>
            </Block>
          </ActionSheet>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  // cart: {
  //   width: width,
  //   backgroundColor: nowTheme.COLORS.BACKGROUND
  // },
  header: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE
  },
  products: {
    minHeight: "100%"
  },
  product: {
    width: width * 0.92,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 3
  },
  productTitle: {
    fontFamily: 'montserrat-regular',
    flex: 1,
    flexWrap: "wrap",
    marginTop:10
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: 0
  },
  imageHorizontal: {
    height: nowTheme.SIZES.BASE * 5,
    width: nowTheme.SIZES.BASE * 5,
    margin: nowTheme.SIZES.BASE / 2
  },
  qty: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: theme.SIZES.BASE * 6.25,
    backgroundColor: nowTheme.COLORS.INPUT,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1
  },
  checkout: {
    height: theme.SIZES.BASE * 3,
    fontSize: 14,
    width: width - theme.SIZES.BASE * 4
  },
  quantityButtons: {
    width: 25,
    height: 25
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20
  },  
  button: {
    borderRadius: 8,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },
  detailOrders: {
    backgroundColor: 'white',
    paddingHorizontal: 20, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: width, 
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  buttonOrder: {
    width: '35%',
    height: 30
  },
  receiptText: {
    fontSize: 13,
    width: '60%'
  }, 
  receiptPrice: {
    fontSize: 14,
    color: nowTheme.COLORS.INFO,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500'
  },
  addButton: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5
  },
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products
});

const mapDispatchToProps = { updateProducts, getProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);