import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';

import { FormatMoneyService } from '@core/services/format-money.service';
import SkeletonInvoiceDetail from '@custom-elements/skeletons/InvoiceDetail';

import { validateEmptyField } from '@core/utils/validate-empty-field';
import { makeStyles } from './InvoiceDetail.styles'
import { useNavigation } from '@react-navigation/native';

export const InvoiceDetails = ({ route }) => {
  const [invoiceDetail, setInvoiceDetail] = useState(null)
  const styles = makeStyles()
  const navigation = useNavigation();

  const getDataPetition = GetDataPetitionService.getInstance();
  const formatMoney = FormatMoneyService.getInstance();

  useEffect(() => {
    handleGetData()
  }, [route.params.invoice])

  const handleGetData = async () => {
    setInvoiceDetail(null)
    const { invoice, nameRouteGoing } = route.params;
    const url = endPoints.invoicesDetail.replace(':id', invoice);
    const urlDownloadFile = endPoints.downloadInvoicesDetail.replace(':id', invoice);

    const dataInvoice = await getDataPetition.getInfoWithHeaders(url);
    setInvoiceDetail({
      ...dataInvoice.body,
      company: dataInvoice.headers['tradetrak-company']
    })

    navigation.setParams({
      urlDownloadFile,
      nameRouteGoing,
    });
  };

  const renderDetailProducts = () => {
    return invoiceDetail.structure.items.map((orders, index) => (
      <Block key={index} style={{ top: 5 }}>
        <Text style={styles.grayTextSKU}> SKU {orders.sku}</Text>
        <Text numberOfLines={2} style={styles.receiptText}>
          {orders.description}
        </Text>
        <Block row style={{ justifyContent: 'space-between' }}>
          <Text style={styles.grayText}>
            {orders.quantity} x {formatMoney.format(orders.unit_price)}
          </Text>
          <Text style={styles.detailPrice}>{formatMoney.format(orders.sub_total)}</Text>
        </Block>
      </Block>
    ));
  };

  if (invoiceDetail === null || invoiceDetail === undefined) {
    return <SkeletonInvoiceDetail />;
  }

  return (
    <ScrollView style={styles.cart}>
      <Block card style={styles.content}>

        <Text style={styles.text}>Customer</Text>
        <Text>{validateEmptyField(invoiceDetail.company)}</Text>

        <Text style={styles.text}>Delivery Address</Text>
        <Text>{validateEmptyField(invoiceDetail.address)}</Text>
        <Text style={styles.text}>Delivery Date</Text>
        <Text>{validateEmptyField(invoiceDetail.delivery_date)}</Text>
      </Block>
      <Block
        card
        style={styles.content}
      >
        <Block row>
          <Block flex>
            <Text style={styles.text}>{invoiceDetail?.type} Number</Text>
            <Text>{validateEmptyField(invoiceDetail.order_number)}</Text>
          </Block>
          <Block flex>
            <Text style={styles.text}>{invoiceDetail?.type} Date</Text>
            <Text>{validateEmptyField(invoiceDetail.invoice_date)}</Text>
          </Block>
        </Block>
        <Text style={styles.text}>Branch</Text>
        <Text>{invoiceDetail.storeLocation === null ? "N/A" : validateEmptyField(invoiceDetail.storeLocation.name)}</Text>
      </Block>
      <Block card style={styles.content}
      >
        <Block style={styles.detailOrdersBlock}>{renderDetailProducts()}</Block>
      </Block>
      <Block card style={styles.lastCard} >
        <Block row style={styles.totalPrices}>
          <Text size={12}>Delivery Fee</Text>
          <Text style={styles.receiptPrice}>
            {formatMoney.format(invoiceDetail.delivery_charge || 0)}
          </Text>
        </Block>
        <Block row style={styles.totalPrices}>
          <Text size={12}>Total ex-GST</Text>
          <Text style={styles.receiptPrice}>
            {formatMoney.format(
              invoiceDetail.total_amount - invoiceDetail.gst,
            )}
          </Text>
        </Block>

        <Block row style={styles.totalPrices}>
          <Text size={12}>GST</Text>
          <Text style={styles.receiptPrice}>
            {formatMoney.format(invoiceDetail.gst)}
          </Text>
        </Block>
        <View
          style={styles.contentTotalAmount}
        />
        <Block row style={styles.contentTotal}>
          <Text size={14}>Total</Text>
          <Text
            size={16}
            color={nowTheme.COLORS.INFO}
            style={styles.textTotalAmount}
          >
            {formatMoney.format(invoiceDetail.total_amount)}
          </Text>
        </Block>
      </Block>
    </ScrollView>
  );
}
