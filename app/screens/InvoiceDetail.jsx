import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';

import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import SkeletonInvoiceDetail from '@custom-elements/skeletons/InvoiceDetail';

import { validateEmptyField } from '@core/utils/validate-empty-field';

const { width } = Dimensions.get('screen');

class InvoiceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.getDataPetition = GetDataPetitionService.getInstance();
    this.formatMoney = FormatMoneyService.getInstance();

    this.state = {
      invoiceDetail: null,
      isDateTimePickerVisible: false,
      deleteAction: false,
      date: new Date(),
    };
  }

  async componentDidMount() {
    const { invoice } = this.props.route.params;
    const url = endPoints.invoicesDetail.replace(':id', invoice);
    const urlDownloadFile = endPoints.downloadInvoicesDetail.replace(':id', invoice);

    const dataInvoice = await this.getDataPetition.getInfo(url);
    this.setState({ invoiceDetail: dataInvoice });

    this.props.navigation.setParams({
      urlDownloadFile,
    });
  }

  renderDetailProducts = () => {
    return this.state.invoiceDetail.structure.items.map((orders, index) => (
      <Block key={index}>
        <Text style={styles.grayTextSKU}> SKU {validateEmptyField(orders.sku)}</Text>
        <Text numberOfLines={2} style={styles.receiptText}>
          {validateEmptyField(orders.description)}
        </Text>
        <Block row style={{ justifyContent: 'space-between', paddingBottom: 7 }}>
          <Text style={styles.grayText}>
            {orders.quantity || 1} x {this.formatMoney.format(orders.unit_price)}
          </Text>
          <Text style={styles.detailPrice}>{this.formatMoney.format(orders.sub_total)}</Text>
        </Block>
      </Block>
    ));
  };

  render() {
    
    if (this.state.invoiceDetail === null) {
      return <SkeletonInvoiceDetail />;
    }
    
    return (
      <ScrollView style={styles.cart}>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginTop={15}
          marginBottom={5}
        >
          <Text style={styles.text}>Customer</Text>
          <Text>Skilled PGF Maintance P/L</Text>
          <Text style={styles.text}>Delivery Address</Text>
          <Text>{validateEmptyField(this.state.invoiceDetail.address)}</Text>
          <Text style={styles.text}>Delivery Date</Text>
          <Text>{validateEmptyField(this.state.invoiceDetail.delivery_date)}</Text>
        </Block>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginBottom={5}
        >
          <Block row>
            <Block flex>
              <Text style={styles.text}>Invoice Number</Text>
              <Text>{validateEmptyField(this.state.invoiceDetail.order_number)}</Text>
            </Block>
            <Block flex>
              <Text style={styles.text}>Invoice Date</Text>
              <Text>{validateEmptyField(this.state.invoiceDetail.invoice_date)}</Text>
            </Block>
          </Block>
          <Text style={styles.text}>Branch</Text>
          <Text>{validateEmptyField(this.state.invoiceDetail.storeLocation.name)}</Text>
        </Block>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginBottom={5}
        >
          <Block style={styles.detailOrdersBlock}>{this.renderDetailProducts()}</Block>
        </Block>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={20}
          paddingHorizontal={20}
          paddingBottom={20}
          style={styles.lastCard}
        >
          <Block row style={styles.totalPrices}>
            <Text size={12}>Delivery Fee</Text>
            <Text style={styles.receiptPrice}>
              {this.formatMoney.format(this.state.invoiceDetail.delivery_charge || 0)}
            </Text>
          </Block>
          <Block row style={styles.totalPrices}>
            <Text size={12}>Total ex-GST</Text>
            <Text style={styles.receiptPrice}>
              {this.formatMoney.format(
                this.state.invoiceDetail.total_amount - this.state.invoiceDetail.gst,
              )}
            </Text>
          </Block>
          <Block row style={styles.totalPrices}>
            <Text size={12}>GST</Text>
            <Text style={styles.receiptPrice}>
              {this.formatMoney.format(this.state.invoiceDetail.gst)}
            </Text>
          </Block>
          <View
            style={{
              borderWidth: 0.7,
              marginVertical: 5,
              backgroundColor: '#E8E8E8',
              borderColor: '#E8E8E8',
            }}
          />
          <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top: 10 }}>
            <Text size={14}>Total</Text>
            <Text
              size={16}
              color={nowTheme.COLORS.INFO}
              style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
            >
              {this.formatMoney.format(this.state.invoiceDetail.total_amount)}
            </Text>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // cart: {
  //   width: width,
  //   backgroundColor: nowTheme.COLORS.BACKGROUND,
  // },
  text: {
    fontSize: 11.5,
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  grayText: {
    color: nowTheme.COLORS.PRETEXT,
    top: -7,
  },
  grayTextSKU: {
    color: nowTheme.COLORS.PRETEXT,
    top: 7,
    left: -3.5,
    fontSize: 11.5,
  },
  detailPrice: {
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
    top: -25,
  },
  receiptText: {
    paddingVertical: 10,
    width: '80%',
  },
  receiptPrice: {
    fontSize: 14,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
  },
  totalPrices: {
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  lastCard: {
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  token_login: state.loginReducer.api_key,
});

export default connect(mapStateToProps)(InvoiceDetails);
