import React, { Component, createRef } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';
import FilterButton from '@components/FilterButton';
import { Searchbar } from 'react-native-paper';
import { nowTheme } from '@constants';
import RadioGroup from 'react-native-radio-buttons-group';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';
import { AlertService } from '@core/services/alert.service';

const { width, height } = Dimensions.get('window');

const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;

const actionSheetRef = createRef();
const actionSheetRef2 = createRef();

class FilterProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioButtonsCategories: [],
      radioButtonsSubCategories: [],
      categoryActive: false,
      searchValue: '',
      selectedCategory: {},
      loadingCategories: true,
      noCategoriesFound: false,
      noSubCategoriesFound: false,
    };

    this.alertService = new AlertService();
    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    await this.getCategories();
  }

  getCategories = async (nameCategory="") => {
    const getCategories = await this.generalRequest.get(
      `${endPoints.categories}&search=${nameCategory}`,
    );
    const getOptionsCategories = this.categoriesToRadioButton(getCategories);

    this.setState({
      radioButtonsCategories: getOptionsCategories,
      loadingCategories: false,
      noCategoriesFound: getOptionsCategories?.length === 0,
    });
  };

  categoriesToRadioButton = (categories) => {
    return categories
      .filter((category) => category.products.length !== 0)
      .map((category) => ({
        ...category,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: category.name,
        value: category.name,
        containerStyle: styles.styleRadio,
      }));
  };

  onPressRadioButtonCategory = async (options) => {
    const optionSelected = options.find((option) => option.selected);
    const url = endPoints.subcategories.replace(':codeCategoryId', optionSelected?.id);

    const getSubCategories = await this.generalRequest.get(url);
    const subcategories = this.categoriesToRadioButton(getSubCategories);

    this.setState({
      categoryActive: true,
      selectedCategory: optionSelected,
      radioButtonsSubCategories: subcategories,
      noSubCategoriesFound: getSubCategories.length === 0,
    });
    this.props.getProducts && this.props.getProducts(optionSelected?.products);
    actionSheetRef.current?.setModalVisible(false);
  };

  onPressRadioButtonSubCategory = (options) => {
    const optionSelected = options.find((option) => option.selected);
    this.props.getProducts && this.props.getProducts(optionSelected?.products);
    actionSheetRef2.current?.setModalVisible(false);
  };

  onChangeSearchCategory = (value)=>{
    this.setState({
      loadingCategories:true
    })
    setTimeout(()=>{
      this.getCategories(value)
    },500)
  }

  render() {
    return (
      <>
        <Block
          row
          width={width * 0.9}
          style={{ alignItems: 'center', paddingBottom: '3%', paddingTop: '3%', paddingLeft: 9}}
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
                  if (this.state.noSubCategoriesFound) {
                    this.alertService.show('Alert!', 'No sub categories found');
                    return;
                  }
                  actionSheetRef2.current?.setModalVisible();
                }}
              />
            )}
          </Block>
        </Block>

        <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
          <Searchbar
            placeholder="Search"
            onChangeText={(text)=>this.onChangeSearchCategory(text)}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
          <Block style={{ height: 250, padding: 5, paddingBottom: 40 }}>
            {this.state.loadingCategories ? (
              <LoadingComponent />
            ) : this.state.noCategoriesFound ? (
              <Text> No categories found </Text>
            ) : (
              <ScrollView style={{ width: width }}>
                <RadioGroup
                  radioButtons={this.state.radioButtonsCategories}
                  color={nowTheme.COLORS.INFO}
                  onPress={(pick) => this.onPressRadioButtonCategory(pick)}
                />
              </ScrollView>
            )}
          </Block>
        </ActionSheet>

        <ActionSheet ref={actionSheetRef2} headerAlwaysVisible>
          <Block style={{ height: 250, padding: 5, paddingBottom: 40 }}>
            {this.state.noSubCategoriesFound ? (
              <Text> No subcategories found </Text>
            ) : (
              <ScrollView style={{ width: width }}>
                <RadioGroup
                  radioButtons={this.state.radioButtonsSubCategories}
                  color={nowTheme.COLORS.INFO}
                  onPress={(pick) => this.onPressRadioButtonSubCategory(pick)}
                />
              </ScrollView>
            )}
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
  styleRadio: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FilterProducts;
