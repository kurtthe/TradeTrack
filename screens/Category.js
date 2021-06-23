import React, { createRef } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View, 
  FlatList,
  ScrollView
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioGroup from 'react-native-radio-buttons-group';

import { Card, Button } from "../components";
import { Block, Text, theme } from "galio-framework";
import ArButton from '../components/Button';


import categories from "../constants/categories1";
import { nowTheme } from "../constants";
import FilterButton from "../components/FilterButton";

const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 *0.87;
const cardHeight = height * 0.51;
const actionSheetRef = createRef();

const radioButtonsData = [
  {
    id: '1',
    label: 'Bathroom Products',
    value: 'Bathroom Products',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '2',
    label: 'Bathroom Furniture',
    value: 'Bathroom Furniture',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '3',
    label: 'Showers',
    value: 'Showers',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '4',
    label: 'Bathroom Tapware',
    value: 'Bathroom Tapware',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '5',
    label: "Baths & Spa's",
    value: "Baths & Spa's",
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '6',
    label: "Toilets",
    value: "Toilets",
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '7',
    label: "Basins",
    value: "Basins",
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
]

export default class Category extends React.Component {

  
  state = {
    radioButtons: radioButtonsData
  };

  onPressRadioButton(radioButtonsArray) {
    this.setState({
      radioButtons: radioButtonsArray
    })
  }

  renderCard = ({ item }) => {
    return (
      <Block key={`Card-${item.title}`} height={cardHeight} style={styles.Card}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Product', {product: item, headerTitle: 'Bathroom'})}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.image}
          />
        </TouchableWithoutFeedback>
        <Block flex space='between' style={{ paddingBottom: 15}}>
          <Block row >
            <Text color={nowTheme.COLORS.LIGHTGRAY}>
              SKU:
            </Text>
            <Text color={nowTheme.COLORS.INFO}>
              {` ${item.sku}`}
            </Text>
          </Block>
          <Text style={{ fontFamily: 'montserrat-regular', marginRight: 5 }} size={15} >
            {item.title}
          </Text>
          <Block row style={{width: '100%'}}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}> Price: </Text>
              <Text style={styles.price}> {item.price} </Text>
            </Block>
            <View  style={{borderWidth: 1, marginHorizontal: 10, height: '100%', borderColor: nowTheme.COLORS.LIGHTGRAY}}></View>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                My Price: 
              </Text>
              <Text style={styles.price}> {item.myPrice} </Text>
            </Block>
          </Block>
        </Block>
        <Block center>
          <Button
            color="warning"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
            style={styles.buttonAdd}
            //onPress={() => navigation.navigate("Login")}
                            
            >
            Add
            </Button>
        </Block>               
      </Block>
    );
  };

  render() {
    const { navigation, route } = this.props;
    const category = categories;
  
    return (
      <>
      <Block flex backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <Block row style={{ height: 50, alignItems: 'center'}}>
          <Text style={{marginLeft: 15}}>
            {`Product > `}
          </Text>
          <Text numberOfLines={1} color={nowTheme.COLORS.INFO} style={{width: 250}}>
            Bathroom Products
          </Text>
        </Block>
        <Block row style={{ padding: 5}}>
          <FilterButton
            text={'Filters'}
            icon={require('../assets/nuk-icons/png/2x/filter.png')}
          />
          <FilterButton
            text={'Category'}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}
          />
          <FilterButton
            text={'Sub Category'}
          />
        </Block>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <FlatList
          style={{margin: -5,}}
          numColumns={2}
          data={category.Laundry}
          renderItem={(item) => this.renderCard(item)}
          keyExtractor={item => item.id}
        />
        <Block center  style={{top:10}}  backgroundColor={nowTheme.COLORS.BACKGROUND} >
          <Button
            color="info"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
            style={styles.button}
            // onPress={() => navigation.navigate("App")}
          >
            Load more...
          </Button>
        </Block>
      </ScrollView>
      
      </Block>
      <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
        <Block left style={{height: 250, padding: 5, paddingBottom: 40}}>
          <RadioGroup 
            radioButtons={this.state.radioButtons}
            color={nowTheme.COLORS.INFO} 
            //onPress={() => this.onPressRadioButton()} 
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
    marginHorizontal: nowTheme.SIZES.BASE,
    marginTop: nowTheme.SIZES.BASE * 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius:5,
    marginBottom:10
  },
  image: {
    width: cardWidth*0.90,
    height: cardHeight*0.45
  },
  priceGrayText: {
    paddingLeft: 2,
    fontSize: 13
  },
  price: {
    fontFamily: 'montserrat-bold',
    fontSize:  14,
    //fontSize:  (Platform.OS === 'ios') ? ( (Dimensions.get('window').width < 670) ? hp('10%') : hp('40%')) :  (Dimensions.get('window').width < 870) ? hp('29%') : hp('40%'),

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
    width: width - theme.SIZES.BASE * 1,
    
  },

  buttonAdd: {
   
    width: width - 240,
    
  },
});
