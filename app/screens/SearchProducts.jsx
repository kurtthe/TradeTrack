import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { nowTheme } from '@constants/';
import { Searchbar } from 'react-native-paper';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListProducts from '@custom-sections/ListProducts';
import LoadingComponent from '@custom-elements/Loading';
import ListData from '@custom-sections/ListData';

const { width } = Dimensions.get('screen');

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myPriceActive: false,
      textSearch: '',
      urlProducts: '',
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
    const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);

    this.setState({
      urlProducts: newUrl,
      myPriceActive: this.props.route.params.myPrice,
    });
  }

  changeSearchText = async (value = '') => {
    if (value === '') {
      this.setState({
        textSearch: value,
      });
      return;
    }

    if (value.length > 3) {
      this.setState({
        textSearch: value,
      });
    }
  };

  handleSearchProduct = ()=> {
    
  }

  render() {
    if (this.state.urlProducts === '') {
      return <LoadingComponent />;
    }

    return (
      <View>
        <Searchbar
          placeholder="What are you looking for?"
          onChangeText={(text) => this.changeSearchText(text)}
          style={styles.search}
          inputStyle={styles.searchInput}
          onIconPress={() => this.handleSearchProduct()}
        />

        <Block style={styles.content}>
          <ListData
            perPage={20}
            endpoint={`${this.state.urlProducts}&search=${this.state.textSearch}`}
            children={<ListProducts myPrice={this.state.myPriceActive} />}
          />
        </Block>
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
    paddingBottom: 150,
  },
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
});

export default SearchProduct;
