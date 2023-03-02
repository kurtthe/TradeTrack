import React from 'react';
import { ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import { styles } from './PlaceOrders.styles';
import { useSelector, useDispatch } from 'react-redux';
import { clearProducts } from '@core/module/store/cart/cart';
import DetailOrders from '@custom-sections/place-order/DetailsOrders';
import { JobsForm, DeliveryForm, StoreForm } from './components';
import { useNavigation } from '@react-navigation/native';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import { clear } from '@core/module/store/placeOrders/placeOrders';
import { getSupplierId } from '@core/hooks/getSupplierId.service';
import Restricted from '../../custom-elements/Restricted';
import OrderValidationFields from './components/OrderValidationFields';

const generalRequest = GeneralRequestService.getInstance();

const PlaceOrders = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartProducts = useSelector((state) => state.productsReducer.products);
  const userEmail = useSelector((state) => state.loginReducer.email);
  const dataOrder = useSelector((state) => state.placeOrderReducer);
  const restricted = useSelector((state) => state.productsReducer.restricted);

  const [dataFieldsValidations, setDataFieldsValidation] = React.useState([]);

  const serializeItems = () => {
    if (cartProducts.length === 0) {
      return [];
    }

    return cartProducts.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
      tax: [
        {
          name: 'GST',
          rate: 10,
        },
      ],
    }));
  };

  const verifyFields = () => {
    const someWithOutValue = dataFieldsValidations.some((item) => !item.value || item.value === '');

    const error =
      !dataOrder.name ||
      !dataOrder.delivery_instructions.delivery ||
      !dataOrder.nameStore ||
      !dataOrder.delivery_instructions.date ||
      !dataOrder.delivery_instructions.time ||
      (dataOrder.delivery_instructions.delivery === 'delivery' &&
        !dataOrder.delivery_instructions.location);

    if (error || someWithOutValue) {
      alert('Fill in the required data *');
    }
    return error || someWithOutValue;
  };

  const placeOrderHandler = async () => {
    const supplierId = await getSupplierId();
    const items = serializeItems();
    const date = new Date();

    let missingFields = verifyFields();

    if (missingFields) {
      return;
    }

    const data = {
      data: {
        name: dataOrder.name,
        supplier: supplierId,
        job: dataOrder.job,
        issued_on: date.toISOString('2015-05-14').slice(0, 10),
        notes: dataOrder.notes,
        tax_exclusive: true,
        sections: [
          {
            items,
            hide_section: false,
            hide_section_price: false,
            hide_section_items: false,
            hide_item_qty: false,
            hide_item_price: false,
            hide_item_subtotal: false,
            hide_item_total: false,
          },
        ],
        delivery_instructions: {
          delivery: dataOrder.delivery_instructions?.delivery,
          location: dataOrder.delivery_instructions.location,
          date: dataOrder.delivery_instructions.date?.value,
          time: dataOrder?.delivery_instructions.value || '12.00 PM',
          contact_number: dataOrder?.delivery_instructions.contact_number,
          contact_name: dataOrder?.delivery_instructions.contact_name,
        },
        burdens_data: dataFieldsValidations,
      },
    };
    const placedOrder = await generalRequest.put(endPoints.generateOrder, data);
    if (placedOrder) {
      handleOrderShare(placedOrder.order.id);
      resetFields();
      dispatch(clearProducts());
      navigation.navigate('OrderPlaced', { placedOrder: placedOrder.order });
    }
  };

  const resetFields = () => {
    dispatch(clear());
  };

  const handleOrderShare = async (id) => {
    const data = {
      emails: [
        'burdens.orders@tradetrak.com.au',
        'matt.celima@burdens.com.au',
        'owenm@tradetrak.com.au',
        userEmail,
        dataOrder.emailStore,
      ],
      message:
        'Thanks for your order - it has been received by our team. An email notification will be sent to the account owner when it has been processed by the store. Please contact us at 03 9703 8400. Thank you, the Burdens App Team.',
    };

    const url = endPoints.shareOrder.replace(':id', id);
    const shareOrder = await generalRequest.post(url, data);
    console.log('shareOrder::', shareOrder, url, data);
  };

  const changesValidationsField = (newDataFields) => {
    setDataFieldsValidation(newDataFields);
  };

  if (dataOrder?.restricted || restricted) {
    return <Restricted />;
  }

  return (
    <ScrollView>
      <Block flex center style={styles.cart}>
        <Block center>
          <JobsForm />
          <OrderValidationFields
            onChanges={(newDataFields) => changesValidationsField(newDataFields)}
          />
          <DeliveryForm />
          <StoreForm />
          <DetailOrders cartProducts={cartProducts} orderHandler={placeOrderHandler} />
        </Block>
      </Block>
    </ScrollView>
  );
};

export default PlaceOrders;
