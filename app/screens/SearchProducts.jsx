import React from "react";
import {
  View,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { articles, categories, nowTheme } from "@constants/";
import { Icon, Card, Input } from "@components";
import { Searchbar } from 'react-native-paper';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from "@components";

import { connect } from 'react-redux';

import { getProducts, searchProducts } from "../../services/ProductServices";
import { updateProducts } from '@core/module/store/cart/cart';



const { width, height } = Dimensions.get("screen");
const sizeConstant = (Platform.OS === 'ios') 
  ? ((Dimensions.get('window').height < 670) ? 12 : 14) 
  : (Dimensions.get('window').height < 870) ? 11.5 : 15
  const cardWidth = width / 2 *0.87;
const cardHeight = height * 0.59;



const suggestions = [
  { id: "NAME", title: "NAME" },
  { id: "SKU", title: "SKU" },
];

class SearchHome extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      results: [],
      data: [],
      search: "",
      active: false,
      loading: false,
      hideMyPrice: true,
    };
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    try{
      let res = await getProducts()
      this.setState({
        hideMyPrice: this.props.route.params.myPrice,
        data: res, 
        loading: false
      })
    } catch(e) {
      console.log('err', e)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  animatedValue = new Animated.Value(0);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  handleSearchChange = (search) => {
    const results = articles.filter(
      (item) => search && item.title.toLowerCase().includes(search)
    );
    this.setState({ results, search });
    this.animate();
  };


  onProductPressed(item) {
    this.props.navigation.navigate('Product', 
      {
        hideMyPrice: this.state.hideMyPrice, 
        product: item, 
        headerTitle: 'Product'
      })
  }

  onAddPressed(item) {
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
          quantity: this.props.cartProducts[index].quantity + 1,
          price: price
        },
        ...this.props.cartProducts.slice(index+1)
      ]) 
    } else {
      this.props.updateProducts([...this.props.cartProducts, itemQ])
    }
  }

  numberWithDecimals(number) {
    return `$${(Math.round(number * 100) / 100).toFixed(2)}`
  }

  onPressRadioButton2() {
    actionSheetRef2.current?.setModalVisible(false);
  }

  onPressRadioButton() {
    this.setState({ categoryActive: true })
    actionSheetRef.current?.setModalVisible(false);
  }

  renderCard = ({ item }) => {
    return (
      <Block key={`Card-${item.name}`} style={styles.Card}>
        <TouchableWithoutFeedback onPress={() => this.onProductPressed(item)}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: item.image}}
          />
        </TouchableWithoutFeedback>
        <Block flex space='between' style={{ paddingBottom: 7}}>
          <Block row >
            <Text color={nowTheme.COLORS.LIGHTGRAY} size={sizeConstant}>
              SKU
            </Text>
            <Text color={nowTheme.COLORS.INFO} size={sizeConstant}>
              {` ${item.sku}`}
            </Text>
          </Block>
          <Text style={{ fontFamily: 'montserrat-regular', marginRight: 5, paddingVertical: 10 }} size={15} >
            {item.name}
          </Text>
          <Block row style={{width: '100%'}}>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>Price: </Text>
              <Text style={styles.price}> 
                {this.numberWithDecimals(item.rrp)}
              </Text>
            </Block>
            {!this.state.hideMyPrice && 
              <>
                <View  style={{borderWidth: 0.5, marginHorizontal: 10, height: '100%', borderColor: nowTheme.COLORS.LIGHTGRAY}}></View>
                  <Block flex >
                    <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                      My Price
                    </Text>
                    <Text style={styles.price}>
                      {this.numberWithDecimals(item.cost_price)}
                    </Text>
                </Block>
              </>
            }
          </Block>
        </Block>
        <Block center>
          <Button
            color="warning"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
            style={styles.buttonAdd}
            onPress={() => this.onAddPressed(item)}
          >
            Add
          </Button>
        </Block>               
      </Block>
    );
  };

  onChangeSearch = async (query) => {
    try {
      let searchResult = await searchProducts(query);
      this.setState({
        data: searchResult || []
      })
    } catch (e) {
      console.log('search error', e)
    }
  }

  renderSearch = () => {
    return (
      <Searchbar
        placeholder="What are you looking for?"
        onChangeText={this.onChangeSearch}
        style={styles.search}
        inputStyle={styles.searchInput}
      />
    );
  };

  renderNotFound = () => {
    return (
      <Block style={styles.notfound}>
        <Text
          style={{ fontFamily: "montserrat-regular" }}
          size={18}
          color={nowTheme.COLORS.TEXT}
        >
          No results were found
        </Text>
      </Block>
    );
  };

  render() {
    return (
      <View>
        <Block flex  style={styles.searchContainer}>
          <Block center style={styles.header}>
            {this.renderSearch()}
          </Block>
        </Block>
        <Block style={{top:60}}>
          <Block row backgroundColor={nowTheme.COLORS.BACKGROUND} width={width} style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%'}}>
            <FlatList
              contentContainerStyle={{alignItems: 'center'}}
              numColumns={2}
              data={this.state.data}
              renderItem={(item) => this.renderCard(item)}
              keyExtractor={item => item.id}
              ListEmptyComponent={this.renderNotFound()}
            /> 
          </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    backgroundColor: 'white',
    width: cardWidth,
    marginHorizontal: '2%',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 10,
    paddingVertical: theme.SIZES.BASE,
    borderRadius:5,
    marginBottom: '5%'
  },
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE,
  },
  searchInput: {
    color: 'black',
    fontSize: 16
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 2,
    zIndex: 2,
  },
  notfound: {
    marginVertical: theme.SIZES.BASE * 2,
  },
  suggestion: {
    height: theme.SIZES.BASE * 1.5,
    marginBottom: theme.SIZES.BASE,
  },
  result: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0,
  },
  resultTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  resultDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  image: {
    width: cardWidth*0.90,
    height: cardHeight*0.30
  },
  dealsContainer: {
    justifyContent: "center",
    paddingTop: theme.SIZES.BASE,
  },
  deals: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0,
  },
  dealsTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  dealsDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  price: {
    fontFamily: 'montserrat-bold',
    fontSize: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 12 :14) :  (Dimensions.get('window').height < 870) ? 11.5: 15,
    color: nowTheme.COLORS.ORANGE
  },
});

const mapStateToProps = (state) => ({
  token_login: state.loginReducer.api_key,
  cartProducts: state.productsReducer.products
});

const mapDispatchToProps = { updateProducts };

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome);