import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '@constants/';
import { Searchbar } from 'react-native-paper';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListData from '@custom-sections/ListData';
import LoadingComponent from '@custom-elements/Loading';
import ListProducts from '@custom-sections/ListProducts';

const { width, height } = Dimensions.get('screen');
const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;
class SearchProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlProducts: '',
      listProducts: [],
      myPriceActive: false,
      loading: true,
    };

    this.getDataPetition = GetDataPetitionService.getInstance();
    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
    const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);

    console.log("=>this.props.route.params.myPrice",this.props.route.params.myPrice)
    
    this.setState({
      urlProducts: newUrl,
      myPriceActive: this.props.route.params.myPrice,
    });

    await this.getProducts();
  }

  getProducts = async (textSearch = '') => {
    console.log("==>get get products")
    await this.getDataPetition.getInfo(this.state.urlProducts, this.loadData, 10, {
      search: textSearch,
    });
  };

  loadData = (data) => {
    console.log("==>loadData loadData products")

    this.setState({
      listProducts: data,
      loading: false,
    });
  };

  changeSearchText = (value) => {
    this.setState({
      loading: true,
    });

    setTimeout(async () => {
      await this.getProducts(value);
    }, 500);
  };

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
        />

        <Block style={styles.content}>
          <ListData
            dataRender={this.state.listProducts}
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
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  },
  content: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    paddingVertical: 5
  }
});

export default SearchProduct;
