import React from 'react';

import { Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import { nowTheme } from '@constants';
import ListData from '@custom-sections/ListData';
import ListProducts from '@custom-sections/ListProducts';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.generalRequest = GeneralRequestService.getInstance();

    this.state = {
      urlProducts: '',
      isAllProducts: false
    };
  }

  async componentDidMount() {

    const { allProducts, category } = this.props.route.params
    const newUrl = await this.getUrlProducts(category);

    this.setState({
      urlProducts: newUrl,
      isAllProducts: allProducts
    });
  }

  getUrlProducts = async (category = null) => {
    if (!category.hasOwnProperty('id')) {
      const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
      return endPoints.products.replace(':id', getIdSuppliers.id)
    }
    return endPoints.subcategories.replace(':codeCategoryId', category?.id)
  }

  render() {
    if (this.state.urlProducts === '') {
      return <LoadingComponent />;
    }

    return (
      <Block style={{ width: width }} flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <ListData
          perPage={20}
          filters={(this.state.isAllProducts) ? 'products' : null}
          endpoint={this.state.urlProducts}
          children={<ListProducts myPrice={this.props.clientFriendly} isAllProducts={this.state.isAllProducts} />}
        />
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  clientFriendly: state.productsReducer.clientFriendly,
});

export default connect(mapStateToProps)(Category);
