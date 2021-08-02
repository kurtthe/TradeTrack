import React, { createRef } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View, 
  FlatList,
  ScrollView,
  Platform
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from '../components/Icon';
import { Button } from "../components";
import { Block, Text, theme, Input } from "galio-framework";

import categories from "../constants/categories1";
import { nowTheme } from "../constants";
import FilterButton from "../components/FilterButton";

const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 *0.87;
const cardHeight = height * 0.59;
const sizeConstant = (Platform.OS === 'ios') 
  ? ((Dimensions.get('window').height < 670) ? 12 : 14) 
  : (Dimensions.get('window').height < 870) ? 11.5 : 15
const actionSheetRef = createRef();
const actionSheetRef2 = createRef();

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

const radioButtonsData2 = [
  {
    id: '1',
    label: 'All Sub Categories',
    value: 'All Sub Categories',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '2',
    label: 'Bathroom Cabinets',
    value: 'Bathroom Cabinets',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '3',
    label: 'Bathroom Vanities',
    value: 'Bathroom Vanities',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
  {
    id: '4',
    label: 'Mirrors & Shaving ',
    value: 'Cabinets',
    color: nowTheme.COLORS.INFO,
    labelStyle: {fontWeight: 'bold'}
  },
]

export default class Category extends React.Component {

  state = {
    radioButtons: radioButtonsData,
    radioButtons2:radioButtonsData2
  };

  onPressRadioButton2() {
    actionSheetRef2.current?.setModalVisible(false);
  }

  onPressRadioButton() {
    actionSheetRef.current?.setModalVisible(false);
  }

  renderCard = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Block key={`Card-${item.title}`} style={styles.Card}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Product', {product: item, headerTitle: 'Bathroom'})}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.image}
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
            {item.title}
          </Text>
          <Block row style={{width: '100%'}}>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>Price: </Text>
              <Text style={styles.price}>{item.price} </Text>
            </Block>
            <View  style={{borderWidth: 0.5, marginHorizontal: 10, height: '100%', borderColor: nowTheme.COLORS.LIGHTGRAY}}></View>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                My Price
              </Text>
              <Text style={styles.price}>{item.myPrice} </Text>
            </Block>
          </Block>
        </Block>
        <Block center>
          <Button
            color="warning"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
            style={styles.buttonAdd}
            onPress={() => navigation.navigate("Cart")}
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
        {/* <Block row width={width*0.9} style={{ height: 50, alignItems: 'center', justifyContent: Platform.OS == 'android' ? 'space-between' : 'space-evenly', marginLeft: '-3%' }}>
          <Text>
            {`Product`}
          </Text>
          <Text>
            {`>`}
          </Text>
          <Text numberOfLines={1} color={nowTheme.COLORS.INFO} style={{width: 250}}>
            {categoryTitle} Products
          </Text>
        </Block> */}
        <Block row width={width*0.9} style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%'}}>
          <Block row space={'evenly'} width={'90%'} style={{justifyContent: 'space-evenly', marginLeft: '-3%'}}>
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
              onPress={() => {
                actionSheetRef2.current?.setModalVisible();
              }}
            />
          </Block>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <FlatList
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            numColumns={2}
            data={category}
            renderItem={(item) => this.renderCard(item)}
            keyExtractor={item => item.id}
          />
          <Block center backgroundColor={nowTheme.COLORS.BACKGROUND}>
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
        <Input
          right
          color="black"
          style={styles.search}
          placeholder="Search"
          placeholderTextColor={'#8898AA'}
          // onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
          iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" />
          }
        />
        <Block left style={{height: 250, padding: 5, paddingBottom: 40}}>
          <RadioGroup 
            radioButtons={this.state.radioButtons}
            color={nowTheme.COLORS.INFO} 
            onPress={() => this.onPressRadioButton()} 
          />
        </Block>
      </ActionSheet>
      <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
        <Block left style={{height: 180, padding: 5, paddingBottom: 40}}>
          <RadioGroup 
            radioButtons={this.state.radioButtons2}
            color={nowTheme.COLORS.INFO} 
            onPress={() => this.onPressRadioButton2()} 
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
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  }
});
