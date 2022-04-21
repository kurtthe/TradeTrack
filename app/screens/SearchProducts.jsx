import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Block, theme } from 'galio-framework';
import debounce from "lodash.debounce";

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListProducts from '@custom-sections/ListProducts';
import LoadingComponent from '@custom-elements/Loading';
import ListData from '@custom-sections/ListData';
import Search from '@custom-elements/Search';
import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class SearchProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlProducts: '',
      search: '',
      empty: true
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
    const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);

    this.setState({
      urlProducts: newUrl,
    });
  }

  changeSearchText = (text) => {
    this.setState({ search: text, empty: text === '' })
  };

  debouncedOnChange = debounce(this.changeSearchText, 300)

  render() {
    if (this.state.urlProducts === '') {
      return <LoadingComponent />;
    }

    return (
      <View>
        <Search
          placeholder="What are you looking for?"
          onChangeText={this.debouncedOnChange}
          style={styles.search}
          inputStyle={styles.searchInput}
        />
        {(!this.state.empty) && (
          <Block style={{ height: "90%" }}>
            <ListData
              searchFilter={true}
              perPage={20}
              endpoint={`${this.state.urlProducts}&search=${this.state.search}`}
              children={<ListProducts myPrice={this.props.clientFriendly} isAllProducts={true}/>
              }
            />
          </Block>
        )}
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
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,

  },
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
});

const mapStateToProps = (state) => ({
  clientFriendly: state.productsReducer.clientFriendly,
});


export default connect(mapStateToProps)(SearchProduct);
