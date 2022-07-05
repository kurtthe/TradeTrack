import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';

import { FormatMoneyService } from '@core/services/format-money.service';
import SkeletonInvoiceDetail from '@custom-elements/skeletons/InvoiceDetail';

import { validateEmptyField } from '@core/utils/validate-empty-field';
import { makeStyles } from './InvoiceDetail.styles'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCart } from '@core/services/product-cart.service';
import { updateProducts } from '@core/module/store/cart/cart';
import { updatePreOrder } from '@core/module/store/cart/preCart';
import { AlertService } from '@core/services/alert.service';


const alertService = new AlertService();


export const InvoiceDetails = ({ route }) => {
  const [invoiceDetail, setInvoiceDetail] = useState(null)
  const productsInCart = useSelector((state) => state.productsReducer.products);
  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly);
  const productsToCart = useSelector((state) => state.preCartReducer.products);

  const styles = makeStyles()
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const productCart = ProductCart.getInstance(productsInCart);
  const getDataPetition = GetDataPetitionService.getInstance();
  const formatMoney = FormatMoneyService.getInstance();

  useEffect(() => {
    handleGetData()
  }, [route.params.invoice])

  useEffect(() => {
    const mappingData = () => {

      if(invoiceDetail === null || invoiceDetail?.structure?.items?.length === 0){
        return
      }
      
      const dataProduct = invoiceDetail.structure.items
        ?.filter((item) => item.product && item.product.sku)
        ?.map((item) => {

        const priceProduct = clientFriendly ? item.product.rrp : item.unit_price;
        return {
          ...item.product,
          myPrice: clientFriendly,
          price: priceProduct,
          quantity: item.quantity
        }
      })

      if(invoiceDetail.structure.items?.length !== dataProduct.length){
        alertService.show("", "some of the products could not be added, because they do not have a valid SKU")
      }
      
      dispatch(updatePreOrder(dataProduct))
    }
    mappingData()
  }, [invoiceDetail?.structure?.items])

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
        <Text style={styles.grayTextSKU}> SKU {orders?.product?.sku}</Text>
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

  const handleAddCart = () => {
    const newProducts = productCart.addMultipleCart(productsToCart)
    dispatch(updateProducts(newProducts))
  }

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
        <Block style={styles.detailOrdersBlock}>
          {renderDetailProducts()}
          {invoiceDetail.structure.items.length > 0 && (
            <Block row bottom>
              <Button
                shadowless
                size="small"
                color={nowTheme.COLORS.INFO}
                onPress={() => handleAddCart()}
              >
                <Text size={18} color={nowTheme.COLORS.WHITE}>
                  Add to cart
                </Text>
              </Button>
            </Block>
          )}

        </Block>
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
