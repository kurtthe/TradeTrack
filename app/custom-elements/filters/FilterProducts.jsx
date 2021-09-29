import React, { Component, createRef } from 'react';
import { Dimensions, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { Searchbar } from 'react-native-paper';
import { nowTheme } from '@constants';
import RadioGroup from 'react-native-radio-buttons-group';

const { width, height } = Dimensions.get('window');

const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;

const actionSheetRef = createRef();
const actionSheetRef2 = createRef();

class FilterProducts extends Component {
  constructor(props) {
    super(props);

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
      noCategoriesFound: false,
    };
  }

  render() {
    return (
      <>
        <Block
          row
          width={width * 0.9}
          style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%' }}
        >
          <Block
            row
            space={'evenly'}
            width={this.state.categoryActive ? '90%' : '60%'}
            style={{ justifyContent: 'space-evenly', marginLeft: '-3%' }}
          >
            <FilterButton text={'Filters'} icon={require('@assets/nuk-icons/png/2x/filter.png')} />
            <FilterButton
              text={'Category'}
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}
              isActive={this.state.categoryActive}
            />
            {this.state.categoryActive && (
              <FilterButton
                text={'Sub Category'}
                onPress={() => {
                  actionSheetRef2.current?.setModalVisible();
                }}
              />
            )}
          </Block>
        </Block>
        <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
          <Searchbar
            placeholder="Search"
            onChangeText={this.onChangeSearch}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
          <Block style={{ height: 250, padding: 5, paddingBottom: 40 }}>
            {this.state.loadingCategories ? (
              <ActivityIndicator />
            ) : this.state.noCategoriesFound ? (
              <Text> No categories found </Text>
            ) : (
              <ScrollView style={{ width: width }}>
                <RadioGroup
                  radioButtons={this.state.radioButtons}
                  color={nowTheme.COLORS.INFO}
                  onPress={(pick) => this.onPressRadioButton(pick)}
                  containerStyle={{ alignItems: 'left' }}
                />
              </ScrollView>
            )}
          </Block>
        </ActionSheet>
        <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
          <Block left style={{ height: 180, padding: 5, paddingBottom: 40 }}>
            <RadioGroup
              radioButtons={this.state.radioButtons2}
              color={nowTheme.COLORS.INFO}
              onPress={(pick) => this.onPressRadioButton2(pick)}
              containerStyle={{ alignItems: 'left' }}
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 10,
    paddingVertical: theme.SIZES.BASE,
    borderRadius: 5,
    marginBottom: '5%',
  },
  image: {
    width: cardWidth * 0.9,
    height: cardHeight * 0.3,
  },
  priceGrayText: {
    // paddingLeft: 2,
    fontSize: 13,
  },
  price: {
    fontFamily: 'montserrat-bold',
    fontSize:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? 12
          : 14
        : Dimensions.get('window').height < 870
        ? 11.5
        : 15,
    color: nowTheme.COLORS.ORANGE,
  },
  addButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width * 0.9,
  },
  buttonAdd: {
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? width - 240
          : width - 265
        : Dimensions.get('window').height < 870
        ? width - 220
        : width - 300,
    top: 10,
  },
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    elevation: 0,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
});

export default FilterProducts;
