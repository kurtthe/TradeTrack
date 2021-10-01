import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
 
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import {  nowTheme } from '@constants/';
import { Searchbar } from 'react-native-paper';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';

import ListData from '@custom-sections/ListData';
import LoadingComponent from '@custom-elements/Loading';

const { width, height } = Dimensions.get('screen');
const sizeConstant =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height < 670
      ? 12
      : 14
    : Dimensions.get('window').height < 870
    ? 11.5
    : 15;
const cardWidth = (width / 2) * 0.87;
const cardHeight = height * 0.59;
class SearchProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlProducts: '',
      listProducts: [],
      myPriceActive: false
    };
    
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
    const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);

    this.setState({
      urlProducts: newUrl,
      myPriceActive: this.props.route.params.myPrice
    });

    await this.getProducts();
  }

  getProducts = async (textSearch="")=>{
    await this.getDataPetition.getInfo(urlProducts, this.loadData, 50, {
      search: textSearch
    });
  }

  loadData = (data) => {
    this.setState({
      listProducts: data,
    });
  };

  render() {
    if (this.state.urlProducts === '') {
      return <LoadingComponent />;
    }
    
    return (
      <View>
        <Block flex style={styles.searchContainer}>
          <Block center style={styles.header}>
            <Searchbar
              placeholder="What are you looking for?"
              onChangeText={this.onChangeSearch}
              style={styles.search}
              inputStyle={styles.searchInput}
            />
          </Block>
        </Block>

        <Block style={{ width: width }} flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
          <ListData
            dataRender={}
            children={<ListProducts myPrice={this.state.myPriceActive}/>}
          />
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    padding: 10,
    paddingVertical: theme.SIZES.BASE,
    borderRadius: 5,
    marginBottom: '5%',
  },
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE,
  },
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
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
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
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  resultDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  image: {
    width: cardWidth * 0.9,
    height: cardHeight * 0.3,
  },
  dealsContainer: {
    justifyContent: 'center',
    paddingTop: theme.SIZES.BASE,
  },
  deals: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 0,
  },
  dealsTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  dealsDescription: {
    padding: theme.SIZES.BASE / 2,
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
});

export default SearchProduct;
