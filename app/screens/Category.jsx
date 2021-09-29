import React, { createRef } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View, 
  FlatList,
  ScrollView,
  Platform,
  ActivityIndicator
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioGroup from 'react-native-radio-buttons-group';
import { Button } from "@components";
import { Block, Text, theme } from "galio-framework";
import { Searchbar } from 'react-native-paper';

import categories from "@constants/categories1";
import { nowTheme } from "@constants";
import FilterButton from "@components/FilterButton";
import { getCategories, getProducts, loadMoreProducts, searchCategories } from "../../services/ProductServices";
import { connect } from 'react-redux';
import { updateProducts } from '@core/module/store/cart/cart';
import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 *0.87;
const cardHeight = height * 0.59;
const sizeConstant = (Platform.OS === 'ios') 
  ? ((Dimensions.get('window').height < 670) ? 12 : 14) 
  : (Dimensions.get('window').height < 870) ? 11.5 : 15
const actionSheetRef = createRef();
const actionSheetRef2 = createRef();

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.formatMoney = FormatMoneyService.getInstance();
    this.generalRequest = GeneralRequestService.getInstance();
    this.state = {
      radioButtons: [],
      radioButtons2: [],
      data: this.props.products,
      categoryActive: false, 
      loadingMoreData: false,
      hideMyPrice: true,
      ppage: 40,
      searchValue: '', 
      loading: false,
      selectedCategory: {},
      loadingCategories: false,
      noCategoriesFound: false
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      loadingCategories: true,
    })
    try{
      this.props.getProducts()
      let rawCategories = await getCategories()
      let categories = this.setCategories(rawCategories)
      this.setState({ 
        radioButtons: categories, 
        hideMyPrice: this.props.route.params.myPrice,
        loading: false
      })
    } catch(e) {
      console.log('err', e)
    } finally {
      this.setState({
        loading: false,
        loadingCategories: false,
      })
    }
  }

  setCategories(categories) {
    let radioCategories = categories.map(c => ({
      ...c, 
      color: nowTheme.COLORS.INFO,
      labelStyle: {fontWeight: 'bold'},
      label: c.name,
      value: c.name
    })).filter(c => c.products.length !== 0)
    return radioCategories;
  }

  async loadMore() {
    try {
      if (this.state.ppage === 100){
        return
      }
      this.setState({ loadingMoreData: true })
      let results = await loadMoreProducts(this.state.ppage)
      this.setState({ loadingMoreData: false })
      this.setState({ data: results, ppage: this.state.ppage + 20 })
    } catch (err) {
      console.log('errrrrorrr', err)
    }
  }

  onPressRadioButton2(pick) {
    const selected = pick.filter(o => o.selected)
    this.setState({ 
      data: selected[0]?.products,
    })
    actionSheetRef2.current?.setModalVisible(false);
  }

  async onPressRadioButton(pick) {
    const selected = pick.filter(o => o.selected) 
    let data = {
      params: {
        parent_category_id: selected.id,
        expand: 'products'
      }
    }
    let subcategoriesRaw = await this.generalRequest.get(endPoints.subcategories, data);
    let subcategories = this.setCategories(subcategoriesRaw)
    this.setState({ 
      categoryActive: true,
      selectedCategory: selected,
      data: selected[0]?.products,
      radioButtons2: subcategories,
    })
    actionSheetRef.current?.setModalVisible(false);
  }

  onChangeSearch = async (query) => {
    this.setState({
      loadingCategories: true,
    })
    try {
      let searchResult = await searchCategories(query);
      if (searchResult.length !== 0){
        let categories = this.setCategories(searchResult);
        this.setState({
          noCategoriesFound: false,
          radioButtons: categories
        })
      } else {
        this.setState({
          noCategoriesFound: true
        })
      }
    } catch (e) {
      console.log('search error', e)
    } finally {
      this.setState({
        loadingCategories: false,
      })
    }
  }

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
    //this.props.navigation.navigate("Cart")
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
                {this.formatMoney.format(item.rrp)}
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
                      {this.formatMoney.format(item.cost_price)}
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

  render() {
    const { navigation, route } = this.props;
    const categoryTitle = route.params.headerTitle;
    const category = categories[route.params.headerTitle];
  
    return (
      <>
      <Block style={{width: width}} flex center backgroundColor={nowTheme.COLORS.BACKGROUND} >
        <Block row width={width*0.9} style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%'}}>
          <Block row space={'evenly'} width={this.state.categoryActive ? '90%' : '60%'} style={{justifyContent: 'space-evenly', marginLeft: '-3%'}}>
            <FilterButton
              text={'Filters'}
              icon={require('@assets/nuk-icons/png/2x/filter.png')}
            />
            <FilterButton
              text={'Category'}
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}
              isActive={this.state.categoryActive}
            />
            {
              this.state.categoryActive &&
              <FilterButton
                text={'Sub Category'}
                onPress={() => {
                  actionSheetRef2.current?.setModalVisible();
                }}
              />
            }
          </Block>
        </Block>
          {this.state.loading && this.state.data.length === 0
            ? <ActivityIndicator/>
            : <FlatList
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                numColumns={2}
                data={this.state.data}
                renderItem={(item) => this.renderCard(item)}
                keyExtractor={item => item.id}
                ListFooterComponent={
                  <Block center backgroundColor={nowTheme.COLORS.BACKGROUND}>
                    {this.state.loadingMoreData 
                      ? <ActivityIndicator/>
                      : <Button
                          color="info"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                          style={styles.button}
                          onPress={() => this.loadMore()}
                        >
                          Load more...
                        </Button>
                    }
                  </Block>}
              /> 
          }
      </Block>
      <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          style={styles.search}
          inputStyle={styles.searchInput}
        />
        <Block style={{height: 250, padding: 5, paddingBottom: 40}}>
          {this.state.loadingCategories 
            ? <ActivityIndicator/>
            : this.state.noCategoriesFound 
              ? <Text> No categories found </Text>
              : <ScrollView style={{width: width}}>
                  <RadioGroup 
                    radioButtons={this.state.radioButtons}
                    color={nowTheme.COLORS.INFO} 
                    onPress={(pick) => this.onPressRadioButton(pick)}
                    containerStyle={{alignItems: 'left'}}
                  />
                </ScrollView>
          }
        </Block>
      </ActionSheet>
      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <Block left style={{height: 180, padding: 5, paddingBottom: 40}}>
          <RadioGroup 
            radioButtons={this.state.radioButtons2}
            color={nowTheme.COLORS.INFO} 
            onPress={(pick) => this.onPressRadioButton2(pick)}
            containerStyle={{alignItems: 'left'}}
          />
        </Block>
      </ActionSheet>
    </>
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
  image: {
    width: cardWidth*0.90,
    height: cardHeight*0.30
  },
  priceGrayText: {
    // paddingLeft: 2,
    fontSize: 13
  },
  price: {
    fontFamily: 'montserrat-bold',
    fontSize: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 12 :14) :  (Dimensions.get('window').height < 870) ? 11.5: 15,
    color: nowTheme.COLORS.ORANGE
  },
  addButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width*0.9,
  },
  buttonAdd: {
    width:  (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? width - 240 :width - 265)  : (Dimensions.get('window').height < 870) ? width - 220 : width - 300, 
    top:10
  },
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    elevation: 0
  },
  searchInput: {
    color: 'black',
    fontSize: 16
  }
});

const mapStateToProps = (state) => ({
  products: state.productsReducer.allProducts,
  cartProducts: state.productsReducer.products
});

const mapDispatchToProps = { updateProducts, getProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Category);