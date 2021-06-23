import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme ,  Button} from "galio-framework";
import { Card, Select } from "../components/";
import { nowTheme } from "../constants/";
import { cart } from "../constants";
import FilterButton from "../components/FilterButton";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

export default class Cart extends React.Component {
  state = {
    cart: cart.products
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
      <Block>
        <Block card shadow style={styles.product}>
          <Block flex row>
            <TouchableWithoutFeedback
             //  onPress={() => navigation.navigate("Product", { product: item })}
            >
              <Block style={styles.imageHorizontal}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: nowTheme.SIZES.BASE * 5
                  }}
                />
              </Block>
            </TouchableWithoutFeedback>
            <Block flex style={styles.productDescription}>

            <Block row >
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
              <Block flex row space="between">
               
                <Block bottom>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' , marginTop:10}}
                    color={nowTheme.COLORS.ORANGE} size={20}
                  >
                    ${item.price * item.qty}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
          <Block flex right style={styles.options}>
            <TouchableOpacity  onPress={() => this.handleDelete(item.id)}  >
              <Ionicons name="trash-sharp" color={'red'}  size={20} />
                </TouchableOpacity>
           
          </Block>
          <Block flex right style={styles.options}>
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
      </Block>
    );
  };

  renderHorizontalProduct = ({ item }) => {
    const buttonStyles = {
      ...styles.optionsButton,
      marginTop: 5
  };
    return (
      <Block style={{ marginRight: theme.SIZES.BASE }}>
        <Card
          item={item}
          imageStyle={{ width: "auto", height: 94 }}
          style={{ width: width / 2.88, borderRadius: 3 }}
        />
       
        <Button
          center
          shadowless
          color="active"
          style={buttonStyles}
          textStyle={[styles.optionsButtonText, { color: "white" }]}
          onPress={() => this.handleAdd(item)}
        >
          ADD TO CART
        </Button>
      </Block>
    );
  };



  renderHeader = () => {
    const { navigation } = this.props;
    const { cart } = this.state;
    const productsQty = cart.length;
    const total =
      cart &&
      cart.reduce((prev, product) => prev + product.price * product.qty, 0);

    return (
      <Block flex style={styles.header}>
        
        <Block row >
          <FilterButton
            text={'Bathroom'}
          />
          <FilterButton
            text={'Kitcehn'}
           
          />
          <FilterButton
            text={'Laundry'}
           
          />
        </Block>

        <Block style={{ marginHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.TEXT}>
            Cart subtotal ({productsQty} items):{" "}
            <Text style={{ fontFamily: 'montserrat-regular', fontWeight: '500' }} color={nowTheme.COLORS.ERROR}>
              ${total}
            </Text>
          </Text>
        </Block>

      </Block>
    );
  };



  renderEmpty() {
    return <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.ERROR}>The cart is empty</Text>;
  }

  renderCheckoutButton() {
    const { navigation } = this.props;
    return (
      <Block center>
        <Button
          flex
          center
          style={styles.checkout}
          color="active"
          onPress={() => navigation.navigate("Account")}
        >
          PROCEED TO CHECKOUT
        </Button>
      </Block>
    );
  }

  render() {
    return (
      <Block flex center style={styles.cart}>
        <FlatList
          data={this.state.cart}
          renderItem={this.renderProduct}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          ListEmptyComponent={this.renderEmpty()}
          ListHeaderComponent={this.renderHeader()}
      
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  cart: {
    width: width
  },
  header: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE
  },
  footer: {
    marginBottom: theme.SIZES.BASE * 2
  },
  divider: {
    height: 1,
    backgroundColor: nowTheme.COLORS.INPUT,
    marginVertical: theme.SIZES.BASE
  },
  checkoutWrapper: {
    paddingTop: theme.SIZES.BASE * 2,
    margin: theme.SIZES.BASE,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: nowTheme.COLORS.INPUT
  },
  products: {
    minHeight: "100%"
  },
  product: {
    width: width * 0.9,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 1.5,
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
  optionsButtonText: {
    fontFamily: 'montserrat-regular',
    fontSize: theme.SIZES.BASE * 0.75,
    color: theme.COLORS.WHITE,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29
  },
  optionsButton: {
    width: "auto",
    height: 34,
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
  similarTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE / 6
  },
  productVertical: {
    height: theme.SIZES.BASE * 10.75,
    width: theme.SIZES.BASE * 8.125,
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 3,
    marginBottom: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 1
  },
  quantityButtons: {
    width: 25,
    height: 25
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20
  },  
});
