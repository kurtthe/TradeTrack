import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { nowTheme } from '@constants/';
import { Searchbar } from 'react-native-paper';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListProducts from '@custom-sections/ListProducts';

const { width } = Dimensions.get('screen');

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listProducts: [],
      myPriceActive: false,
      notFound: false,
      noShowInit: true,
      textSearch: '',
    };

    this.getDataPetition = GetDataPetitionService.getInstance();
    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    this.setState({
      myPriceActive: this.props.route.params.myPrice,
    });
  }

  getProducts = async (textSearch = '') => {
    await this.getDataPetition.getInfo(
      `${endPoints.searchProducts}?search=${textSearch}`,
      this.loadData,
      1,
      10,
    );
  };

  loadData = (data) => {
    if (data.length > 0) {
      this.setState({
        listProducts: data,
        notFound: false,
        noShowInit: false,
      });
    } else {
      this.setState({
        notFound: true,
        noShowInit: false,
      });
    }
  };

  changeSearchText = async (value) => {
    this.setState({
      textSearch: value,
    });

    if (value === '') {
      await this.getProducts();
      return
    }

    if (value.length > 5) {
      await this.getProducts(value);
    }
  };

  handleSearchProduct = async () => {
    await this.getProducts(this.state.textSearch);
  };

  renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          No results found for search options selected.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Searchbar
          placeholder="What are you looking for?"
          onChangeText={(text) => this.changeSearchText(text)}
          style={styles.search}
          inputStyle={styles.searchInput}
          onIconPress={() => this.handleSearchProduct()}
        />

        {!this.state.noShowInit ? (
          <Block style={styles.content}>
            {!this.state.notFound ? (
              <ListProducts data={this.state.listProducts} myPrice={this.state.myPriceActive} />
            ) : (
              <>{this.renderNotFound()}</>
            )}
          </Block>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  search: {
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  },
  content: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    paddingTop: 15,
    paddingBottom: 120,
  },
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
});

export default SearchProduct;
