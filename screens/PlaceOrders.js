import React, { createRef } from "react";
import {
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View
} from "react-native";
import { Block, Text, theme, Button, Input } from "galio-framework";
import { nowTheme } from "../constants/";
import { cart } from "../constants";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import ActionSheet from "react-native-actions-sheet";
import PickerButton from "../components/PickerButton";


const { width } = Dimensions.get("screen");
const actionSheetRef = createRef();

export default class PlaceOrders extends React.Component {
  state = {
    ordersPlaced: cart.products.slice(0,3), // To only show 3 elements
    deleteAction: false
  };

  handleQuantity = (id, qty) => {
    const { cart } = this.state;

    const updatedCart = cart.map(product => {
      if (product.id === id) product.qty = qty;
      return product;
    });

    this.setState({ cart: updatedCart });
  };

  handleDelete = id => {
    const { cart } = this.state;
    const updatedCart = cart.filter(product => product.id !== id);
    this.setState({ cart: updatedCart });
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
                SKU:
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
                style={{ fontFamily: 'montserrat-regular' , marginTop:10}}
                color={nowTheme.COLORS.ORANGE} size={20}
              >
                ${item.price * item.qty}
              </Text>
            </Block>
          </Block>
        </Block>

          <Block right style={styles.options, {top:-20}}>
            <Block row >
              <Button
                shadowless
                style={styles.quantityButtons}
                color={'rgba(102, 102, 102, 0.1)'}
              >
                <Text style={styles.quantityTexts}>
                  -
                </Text>
              </Button>
              <Text style={{marginHorizontal: 10, top:12}}>
                1
              </Text>
              <Button 
                shadowless 
                style={styles.quantityButtons}
                color={nowTheme.COLORS.INFO}
              >
                <Text color={'white'} style={styles.quantityTexts}>
                  +
                </Text>
              </Button>
            </Block>
          </Block>

      </Block>
    );
  };

  renderDetailOrder = () => {
    return (
        <Block>
            <PickerButton
                text='Select Job'
                placeholder='Select or search job'
            />
        </Block>
    )
  }

  renderDeliveryOptions = () => {

  }

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

  renderEmpty() {
    return <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.ERROR}>The cart is empty</Text>;
  }

  render() {
    const { customStyleIndex } = this.state
    return (
    <Block flex center style={styles.cart}>
        <FlatList
            data={this.state.ordersPlaced}
            renderItem={this.renderProduct}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}-${item.title}`}
            ListEmptyComponent={this.renderEmpty()}
        />
        {this.renderDetailOrder()}
        {this.renderDeliveryOptions()}
        {/* Detail Orders ActionSheet Workaround */}
        <Block
            center
            style={{position: 'relative', bottom: 0, paddingHorizontal: 20}}
        >
            <TouchableWithoutFeedback
                style={{ width: '100%' }}
                onPress={() => actionSheetRef.current?.setModalVisible()}
            >
                <View style={styles.detailOrders}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16}}>
                        Detail Orders
                    </Text>
                    <MaterialIcons name="expand-less" color={'gray'} size={30} />
                </View>
            </TouchableWithoutFeedback>
            <Button 
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.button}
            >
                Place Order
            </Button>
        </Block>
        {/* End of Detail Orders ActionSheet Workaround */}
        <ActionSheet ref={actionSheetRef} headerAlwaysVisible CustomHeaderComponent={this.renderASHeader()}>
            <Block style={{height: 200, padding: 20, paddingBottom: 40}}>
                <Block row style={{ justifyContent: 'space-between', paddingBottom: 5}}>
                    <Text>
                        1x Kaya Basin/Bath Wall Mixer 160mm..
                    </Text>
                    <Text>
                        $375
                    </Text>
                </Block>
                <Block row style={{ justifyContent: 'space-between', paddingBottom: 5}}>
                    <Text>
                        1x Di Lusso 60cm Th601Ss Telescopi..
                    </Text>
                    <Text>
                        $244.99
                    </Text>
                </Block>
                <Block row style={{ justifyContent: 'space-between', paddingBottom: 5}}>
                    <Text>
                        1x Lillian Basin Set 1/4 Turn Ceramic..
                    </Text>
                    <Text>
                        $225.99
                    </Text>
                </Block>
                <View style={{borderWidth: 1, marginVertical: 5}}/>
                <Block row style={{ justifyContent: 'space-between', paddingBottom: 15}}>
                    <Text>
                        Total Orders
                    </Text>
                    <Text>
                        $224.99
                    </Text>
                </Block>
                <Button
                    color="info"
                    textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                    style={styles.button}
                    // onPress={() => navigation.navigate("PlaceOrders")}
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
  cart: {
    width: width,
    backgroundColor: nowTheme.COLORS.BACKGROUND
  },
  header: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE
  },
  products: {
    minHeight: "100%"
  },
  product: {
    width: width * 0.9,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
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
  },
  imageHorizontal: {
    height: nowTheme.SIZES.BASE * 5,
    width: nowTheme.SIZES.BASE * 5,
    margin: nowTheme.SIZES.BASE / 2
  },
  options: {
    padding: theme.SIZES.BASE / 2
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
    width: width - theme.SIZES.BASE * 3,
  },
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: width, 
    height: 40
  },
  buttonOrder: {
    width:  (Platform.OS === 'ios') ? width - 240 : width - 300,
  },

  addButton: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5
  },
});
