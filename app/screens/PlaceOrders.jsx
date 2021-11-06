import React from 'react';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';
import PickerButton from '@custom-elements/PickerButton';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';
import { clearProducts } from '@core/module/store/cart/cart';
import { connect } from 'react-redux';
import { cart, nowTheme } from '@constants/index';
import DetailOrders from '@custom-sections/place-order/DetailsOrders';
import { endPoints } from '@shared/dictionaries/end-points';

const { width, height } = Dimensions.get('screen');

class PlaceOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ordersPlaced: cart.products.slice(0, 3),
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      radioButtonsStore: [],
      radioButtonsJobs: [],
      radioButtonsDeliveries: [],
      radioButtonsHours: [],
      job: null,
      delivery: null,
      searchJob: null,
      deliveryText: '',
      date: null,
      time: null,
      orderName: null,
      store: null,
      location: null,
      resetSelects: false,
    };

    this.generalRequest = GeneralRequestService.getInstance();
    this.getDataPetition = GetDataPetitionService.getInstance();
    this.formatMoney = FormatMoneyService.getInstance();
  }

  async componentDidMount() {
    let stores = await this.generalRequest.get(endPoints.stores);
    let jobs = await this.generalRequest.get(endPoints.jobs);
    let storesAsRadioButtons = this.setRadioButtons(stores.locations);
    let jobsAsRadioButtons = this.setRadioButtons(jobs);

    this.setState({
      radioButtonsStore: storesAsRadioButtons,
      radioButtonsJobs: jobsAsRadioButtons,
      radioButtonsDeliveries: radioButtonsDelivery,
      radioButtonsHours: radioButtonsHour,
    });
  }

  setRadioButtons = (stores) => {
    stores.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    let radioButtonsValues =
      stores &&
      stores.map((c) => ({
        ...c,
        color: nowTheme.COLORS.INFO,
        labelStyle: { fontWeight: 'bold' },
        label: c.name,
        value: c.name,
      }));
    return radioButtonsValues;
  };

  handleChangeOptionSelected = (option, type) => {
    if (type === 'job') {
      this.setState({
        job: option?.value,
      });
      return;
    }

    if (type === 'delivery') {
      this.setState({
        delivery: option,
        deliveryText: option?.label,
      });
      return;
    }

    if (type === 'time') {
      this.setState({
        time: option,
      });
      return;
    }

    if (type === 'store') {
      this.setState({
        store: option?.value,
      });
    }
  };

  changeSearchText = (text) => {
    this.setState({ searchJob: text });

    if (text == '') {
      this.handleSearch(1);
    }
  };

  handleSearch = async (page) => {
    this.setState({ page: page + 1 });
    await this.getDataPetition.getInfo(
      `${endPoints.jobs}?search=${this.state.searchJob}&expand=products`,
      this.loadData,
      page,
    );
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDatePicked = (date) => {
    this.setState({
      date: {
        label: date.toDateString(),
        value: date.toISOString('2015-05-14').slice(0, 10),
      },
    });
    this.hideDatePicker();
  };

  renderEmpty() {
    return (
      <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.ERROR}>
        The cart is empty
      </Text>
    );
  }

  verifyFields = () => {
    const error =
      !this.state.orderName ||
      !this.state.delivery?.value ||
      !this.state.store ||
      (this.state.delivery?.value === 'delivery' && this.state.location === '');

    this.setState({
      orderNameError: !this.state.orderName,
      deliveryTypeError: !this.state.delivery?.value,
      storeError: !this.state.store,
      locationError: this.state.delivery?.value === 'delivery' && this.state.location === '',
    });

    if (error) {
      alert('Fill in the required data *');
    }
    return error;
  };

  serializeItems = () => {
    if (this.props.cartProducts.length === 0) {
      return;
    }

    return this.props.cartProducts.map((item) => ({
      description: item.name,
      quantity: item.quantity,
      units: 'ea',
      cost: item.myPrice ? item.rrp : item.cost_price,
      tax: [
        {
          name: 'GST',
          rate: 10,
        },
      ],
    }));
  };

  resetFields = () => {
    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3),
      deleteAction: false,
      radioButtons: [],
      date: { label: '', value: '' },
      store: '',
      job: '',
      delivery: { label: '', value: '' },
      deliveryText: 'Delivery',
      location: '',
      time: { label: '', value: '' },
      orderName: '',
      notFound: false,
      showSearch: false,
      orderNameError: false,
      deliveryTypeError: false,
      storeError: false,
      locationError: false,
      resetSelects: true,
    });
  };

  placeOrderHandler = async () => {
    const supplierId = await this.generalRequest.get(endPoints.supplierId);
    const date = new Date();
    const items = this.serializeItems();

    let missingFields = this.verifyFields();

    if (missingFields) {
      return;
    }

    const data = {
      data: {
        name: this.state.orderName,
        supplier: supplierId.id,
        job: this.state.job || null,
        issued_on: date.toISOString('2015-05-14').slice(0, 10),
        notes: this.state.notes,
        tax_exclusive: true,
        sections: [
          {
            items: items,
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
          delivery: this.state.delivery?.value,
          location: this.state.location || '',
          date: this.state.date?.value,
          time: this.state.time?.value || '12.00 PM',
        },
      },
    };

    const placedOrder = await this.generalRequest.put(endPoints.generateOrder, data);

    if (placedOrder) {
      this.resetFields();

      this.setState({
        resetSelects: false,
      });

      this.props.clearProducts();
      this.props.navigation.navigate('OrderPlaced', { placedOrder: placedOrder.order });
    }
  };

  renderOptions = () => {
    if (this.state.radioButtonsJobs.length === 0) {
      return null;
    }

    return (
      <Block center>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginBottom={20}
        >
          <PickerButton
            label="Detail Order"
            text="Select Job"
            placeholder={this.state.job || 'Select or search job'}
            renderOptions={this.state.radioButtonsJobs}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'job')}
            onSearch={() => this.handleSearch()}
            changeTextSearch={(text) => this.changeSearchText(text)}
            search={true}
            icon={true}
            resetValue={this.state.resetSelects}
          />
          <Block row>
            <Text style={styles.text}>Order Name</Text>
            <Text style={styles.errorText}> * </Text>
          </Block>
          <Input
            left
            color="black"
            style={styles.orderName}
            placeholder="Enter your order name"
            onChangeText={(t) => this.setState({ orderName: t })}
            value={this.state.orderName}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
          />
        </Block>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginBottom={20}
        >
          <PickerButton
            label="Delivery Options"
            text="Delivery Type"
            error
            placeholder={this.state.deliveryText || 'Select delivery type'}
            icon
            renderOptions={this.state.radioButtonsDeliveries}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'delivery')}
            resetValue={this.state.resetSelects}
          />
          {this.state.delivery?.value === 'delivery' && (
            <>
              <Block row>
                <Text style={styles.text}>Address</Text>
                <Text style={styles.errorText}> * </Text>
              </Block>
              <Input
                left
                color="black"
                style={styles.orderName}
                placeholder="Enter your address"
                onChangeText={(t) => this.setState({ location: t })}
                value={this.state.location}
                placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
                textInputStyle={{ flex: 1 }}
              />
            </>
          )}
          <>
            <PickerButton
              text={`${this.state.deliveryText} Date`}
              placeholder={'Select date'}
              icon
              iconName={'calendar-today'}
              size={25}
              onPress={this.showDatePicker}
            />

            <DateTimePicker
              mode="date"
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
          </>
          <PickerButton
            text={`${this.state.deliveryText} Time`}
            placeholder={this.state.time?.label || 'Select time'}
            icon
            iconName={'lock-clock'}
            size={25}
            renderOptions={this.state.radioButtonsHours}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'time')}
            resetValue={this.state.resetSelects}
          />
          {this.state.time?.label === 'Anytime' && (
            <>
              <Block row>
                <Text style={styles.text}>Time</Text>
              </Block>
              <Input
                left
                color="black"
                style={styles.orderName}
                placeholder="Enter time"
                onChangeText={(t) => this.setState({ time: { label: 'Anytime', value: t } })}
                value={this.state.time?.value}
                placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
                textInputStyle={{ flex: 1 }}
              />
            </>
          )}
        </Block>
        <Block
          card
          backgroundColor={'white'}
          width={width}
          paddingTop={10}
          paddingHorizontal={20}
          paddingBottom={20}
          marginBottom={20}
        >
          <PickerButton
            label="Store"
            text="Select Store"
            error
            placeholder={'Select store'}
            icon
            renderOptions={this.state.radioButtonsStore}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'store')}
            resetValue={this.state.resetSelects}
          />
          <Text style={{ fontSize: 14, paddingVertical: 10, color: nowTheme.COLORS.PRETEXT }}>
            Notes to Store
          </Text>
          <Input
            left
            color="black"
            style={styles.notes}
            placeholder="Type notes here"
            value={this.state.notes}
            onChangeText={(t) => this.setState({ notes: t })}
            placeholderTextColor={nowTheme.COLORS.PICKERTEXT}
            textInputStyle={{ flex: 1 }}
            multiline
          />
        </Block>
        <DetailOrders
          cartProducts={this.props.cartProducts}
          orderHandler={() => this.placeOrderHandler()}
        />
      </Block>
    );
  };

  render() {
    return (
      <Block flex center style={styles.cart}>
        <FlatList
          data={this.state.ordersPlaced}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          ListEmptyComponent={this.renderEmpty()}
          ListFooterComponent={this.renderOptions()}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { clearProducts };

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrders);
