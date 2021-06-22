import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View, 
  FlatList
} from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import ArButton from '../components/Button';

import categories from "../constants/categories1";
import { nowTheme } from "../constants";
import FilterButton from "../components/FilterButton";

const { width, height } = Dimensions.get("window");
const cardWidth = width / 2 *0.87;
const cardHeight = height * 0.45;

export default class Category extends React.Component {

  renderCard = ({ item }) => {
    return (
      <Block key={`Card-${item.title}`} height={cardHeight} style={styles.Card}>
        <TouchableWithoutFeedback>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.image}
          />
        </TouchableWithoutFeedback>
        <Block flex space='between' style={{paddingTop: 10, paddingBottom: 15}}>
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
        <TouchableWithoutFeedback style={{margin: 10}} >
          <Block middle style={styles.addButton}>
            <Text style={{color: nowTheme.COLORS.INFO, fontFamily:'montserrat-bold', fontSize: 20}}>Add</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  };

  render() {
    const { navigation, route } = this.props;
    const category = categories;
    return (
      <Block color={nowTheme.COLORS.BACKGROUND}>
        <Block row style={{ padding: 5}}>
          <FilterButton
            text={'Filters'}
            icon={require('../assets/nuk-icons/png/2x/filter.png')}
          />
          <FilterButton
            text={'Category'}
          />
          <FilterButton
            text={'Sub Category'}
          />
        </Block>
        <FlatList
          style={{margin: -5}}
          numColumns={2}
          data={category.products}
          renderItem={(item) => this.renderCard(item)}
          keyExtractor={item => item.id}
        />
      </Block>
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
    padding: 10
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
    fontSize: 15,
    color: nowTheme.COLORS.ORANGE
  },
  addButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5
  }
});
