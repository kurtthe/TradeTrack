import React from 'react';

import { Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import { nowTheme } from '@constants';
import ListData from '@custom-sections/ListData';
import ListProducts from '@custom-sections/ListProducts';

import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LoadingComponent from '@custom-elements/Loading';

const { width } = Dimensions.get('window');

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.formatMoney = FormatMoneyService.getInstance();
    this.generalRequest = GeneralRequestService.getInstance();

    this.state = {
      urlProducts: '',
    };
  }

  async componentDidMount() {
    const getIdSuppliers = await this.generalRequest.get(endPoints.suppliers);
    const newUrl = endPoints.products.replace(':id', getIdSuppliers.id);

    this.setState({
      urlProducts: newUrl,
    });
  }

  render() {
    if (this.state.urlProducts === '') {
      return <LoadingComponent />;
    }

    return (
      <>
        <Block style={{ width: width }} flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
          <ListData
            perPage={50}
            filters={'products'}
            endpoint={this.state.urlProducts}
            children={<ListProducts />}
          />
        </Block>
      </>
    );
  }
}

export default Category;
