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


import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from "@components";

import { connect } from 'react-redux';

import { getCategories, getProducts, loadMoreProducts } from "../../services/ProductServices";
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
      loading: false
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
    this.props.updateProducts([...this.props.cartProducts, item])
    alert(`${item.name} added to cart`)
    //this.props.navigation.navigate("Cart")
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

  renderSearch = () => {
    const { search } = this.state;
    const iconSearch = search ? (
      <TouchableWithoutFeedback onPress={() => this.setState({ search: "" })}>
        <Icon
          size={16}
          color={theme.COLORS.MUTED}
          name="magnifying-glass"
          family="entypo"
        />
      </TouchableWithoutFeedback>
    ) : (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="magnifying-glass"
        family="entypo"
      />
    );

    return (
      <Input
        right
        color="black"
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        defaultValue={search}
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => this.setState({ active: true })}
        onBlur={() => this.setState({ active: false })}
        //onChangeText={this.handleSearchChange}
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
          We didn’t find "<Text bold>{this.state.search}</Text>" in the Data Base.
        </Text>

        <Text
          size={18}
          style={{
            marginTop: theme.SIZES.BASE,
            fontFamily: "montserrat-regular",
          }}
          color={nowTheme.COLORS.TEXT}
        >
          You can see more products in Products / Filter / Category.
        </Text>
      </Block>
    );
  };

  renderSuggestions = () => {
    const { navigation } = this.props;

    return (
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => navigation.navigate("Category", { ...item })}
          >
            <Block flex row middle space="between">
              <Text
                style={{ fontFamily: "montserrat-regular" }}
                size={14}
                color={nowTheme.COLORS.TEXT}
              >
                {item.title}
              </Text>
              <Icon
                name="chevron-right"
                family="evilicon"
                style={{ paddingRight: 5 }}
              />
            </Block>
          </TouchableOpacity>
        )}
      />
    );
  };

  renderDeals = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dealsContainer}
      >
        <Block flex>
        <Text>put the search result here</Text>
        </Block>
      </ScrollView>
    );
  };

  renderResult = (result) => {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{ width: width - theme.SIZES.BASE * 2, opacity }}
        key={`result-${result.title}`}
      >
        <Card item={result} horizontal />
      </Animated.View>
    );
  };

  renderResults = () => {
    const { results, search } = this.state;

    if (results.length != 0 && search) {
      return (
        <Block style={{ width: width - 40 }}>
          {this.renderNotFound()}
          {this.renderSuggestions()}
          <Text
            style={{ fontFamily: "montserrat-regular" }}
            size={18}
            color={nowTheme.COLORS.TEXT}
          >
            Daily Deals
          </Text>
          {this.renderDeals()}
        </Block>
      );
    }

    return (
      <ScrollView>
        <Block style={{ paddingTop: theme.SIZES.BASE * 2 }}>
          {results.map((result) => this.renderResult(result))}
        </Block>
      </ScrollView>
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

        <ScrollView >

       {this.renderResults()} 
       

       <Block row backgroundColor={nowTheme.COLORS.BACKGROUND} width={width} style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%'}}>

            <FlatList
                contentContainerStyle={{alignItems: 'center'}}
                numColumns={2}
                data={this.state.data}
                renderItem={(item) => this.renderCard(item)}
                keyExtractor={item => item.id}
              
              /> 
           
            </Block>
       
        </ScrollView>
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