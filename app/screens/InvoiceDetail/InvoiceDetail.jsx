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
import { ButtonInvoice } from './components/button';

import Loading from '@custom-elements/Loading';
import { GeneralRequestService } from '@core/services/general-request.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';
import WebView from '@custom-elements/WebView';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
  const alertService = new AlertService();
  const [showModalBottom, setShowModalBottom] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [urlFilePdf, setUrlFilePdf] = useState()
  const [loadingLoadPdf, setLoadingLoadPdf] = useState(false)
  const [generalRequestService] = useState(GeneralRequestService.getInstance())
  const [urlDownloadFile, setUrlDownloadFile] = useState()
  const [urlWebView, setUrlWebView] = useState()

  const openViewerPdf = async () => {
    setLoadingLoadPdf(true)

    if(!urlDownloadFile){
      alertService.show('Alert!', 'Try Again Later');
      return setLoadingLoadPdf(false);
    }
    const result = await generalRequestService.get(urlDownloadFile);
    setUrlFilePdf(result)

    setShowModalBottom(true)
    setLoadingLoadPdf(false)
  };

  useEffect(() => {
    handleGetData()
  }, [route.params.invoice])

  useEffect(() => {
    const mappingData = () => {

      if (invoiceDetail === null || invoiceDetail?.structure?.items?.length === 0) {
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

      dispatch(updatePreOrder(dataProduct))
    }
    mappingData()
  }, [invoiceDetail?.structure?.items])

  const handleGetData = async () => {
    setInvoiceDetail(null)
    const { invoice, nameRouteGoing } = route.params;
    const url = endPoints.invoicesDetail.replace(':id', invoice);
    const urlTracking = endPoints.invoicesDetailWTracking.replace(':id', invoice);
    const urlDownloadFile = endPoints.downloadInvoicesDetail.replace(':id', invoice);

    const dataInvoice = await getDataPetition.getInfoWithHeaders(url);
    const dataTracking = await getDataPetition.getInfoWithHeaders(urlTracking);

    setInvoiceDetail({
      ...dataInvoice.body,
      tracking: dataTracking.body.tracking,
      company: dataInvoice.headers['tradetrak-company']
    })

    setUrlDownloadFile(urlDownloadFile)
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
    if (invoiceDetail.structure.items?.length !== productsToCart.length) {
      alertService.show(
        "",
        "some of the products could not be added, because they do not have a valid SKU"
      )
    }
    dispatch(updateProducts(newProducts))
  }

  const handleInvoice = async () => {
    const response = await generalRequestService.get(`${endPoints.payment}?amount=${invoiceDetail.balance}&note=${invoiceDetail.order_number}`);
    setUrlWebView(response.url)
    setShowWebView(true)
  }

  const handleTrack = () => {
    setUrlWebView(invoiceDetail.tracking.link)
    setShowWebView(true)
  }

  if (invoiceDetail === null || invoiceDetail === undefined) {
    return <SkeletonInvoiceDetail />;
  }

  return (
    <>
      <ScrollView style={styles.cart}>
        <Block flex row space='around' style={styles.button_alignment}>
          {invoiceDetail.structure.items.length > 0 && (
            <ButtonInvoice
              iconName={'cart'}
              text={'Cart'}
              onPress={() => handleAddCart()}
            />
          )}
          {loadingLoadPdf ? (
            <Button
              size={'small'}
              color={nowTheme.COLORS.BACKGROUND}
              disabled
              shadowless
            >
              <Loading />
            </Button>
          ) : (
            <ButtonInvoice
              iconName={'download'}
              text={'PDF'}
              onPress={() => openViewerPdf()}
            />
          )}
          <ButtonInvoice
            disabled={!invoiceDetail.tracking.link}
            iconName={'map-outline'}
            text={'Track'}
            onPress={() => handleTrack()}
          />
          <ButtonInvoice
            disabled={invoiceDetail.balance <= 0}
            iconName={'logo-usd'}
            text={'Pay'}
            onPress={() => handleInvoice()}
          />
        </Block>
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
          <Block row style={styles.contentTotal}>
            <Text size={12}>Paid</Text>
            <Text style={styles.receiptPrice}>
              {formatMoney.format(invoiceDetail.total_amount - invoiceDetail.balance)}
            </Text>
          </Block>
          <Block row style={styles.contentTotal}>
            <Text size={12}>Balance Owing</Text>
            <Text style={styles.receiptPrice}>
              {formatMoney.format(invoiceDetail.balance)}
            </Text>
          </Block>
        </Block>
      </ScrollView>
      <BottomModal
        show={showModalBottom}
        close={() => setShowModalBottom(false)}
        downloadShared={{
          url: urlDownloadFile,
        }}
      >
        <View style={{ height: hp('80%') }}>
          <PdfViewer url={urlFilePdf} />
        </View>
      </BottomModal>
      <BottomModal show={showWebView} close={() => setShowWebView(false)}>
        <View style={{ height: hp('80%') }}>
          <WebView url={urlWebView} />
        </View>
      </BottomModal>
    </>
  );
}
