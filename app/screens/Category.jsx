import React from 'react';

import { Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants';
import ListData from '@custom-sections/ListData';
import ListProducts from '@custom-sections/ListProducts';

import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const { width } = Dimensions.get('window');

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.formatMoney = FormatMoneyService.getInstance();
    this.generalRequest = GeneralRequestService.getInstance();
  }

  render() {
    return (
      <>
        <Block style={{ width: width }} flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
          <ListData
            filters={'products'}
            endpoint={endPoints.products}
            children={<ListProducts />}
          />
        </Block>
      </>
    );
  }
}

export default Category;
