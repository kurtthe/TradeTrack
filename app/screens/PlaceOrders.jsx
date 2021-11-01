import React, { createRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, View } from 'react-native';
import { Block, Text, Input } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { cart } from '@constants';
import ActionSheet from 'react-native-actions-sheet';
import PickerButton from '@components/PickerButton';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { Searchbar } from 'react-native-paper';
import { GeneralRequestService } from '@core/services/general-request.service';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import { clearProducts } from '@core/module/store/cart/cart';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';

import DetailOrders from '@custom-sections/place-order/DetailsOrders';

const { width, height } = Dimensions.get('screen');
const actionSheetRadioButtonRef = createRef();

class PlaceOrders extends React.Component {
  constructor(props) {
    super(props);
    this.generalRequest = GeneralRequestService.getInstance();
    this.getDataPetition = GetDataPetitionService.getInstance();
    this.formatMoney = FormatMoneyService.getInstance();

    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3), // To only show 3 elements
      deleteAction: false,
      radioButtons: [],
      date: { label: '', value: '' },
      radioButtonsJobs: [],
      radioButtonsStore: [],
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
    };
  }

  async componentDidMount() {
    try {
      let stores = await this.generalRequest.get(endPoints.stores);
      let jobs = await this.generalRequest.get(endPoints.jobs);
      let storesAsRadioButtons = this.setRadioButtons(stores.locations);
      let jobsAsRadioButtons = this.setRadioButtons(jobs);
      this.setState({
        radioButtonsStore: storesAsRadioButtons,
        radioButtonsJobs: jobsAsRadioButtons,
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3),
      deleteAction: false,
      radioButtons: [],
      date: { label: '', value: '' },
      radioButtonsJobs: [],
      radioButtonsStore: [],
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
    });
  }

  setRadioButtons(stores) {
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
  }

  onPressRadioButton(items) {
    let selected = items.find((i) => i.selected);
    if (this.state.radioButtonsData == radioButtonsDelivery)
      this.setState({
        delivery: {
          value: selected.value,
          label: selected.label,
        },
        deliveryText: selected.label,
      });
    else if (this.state.radioButtonsData == radioButtonsHour)
      this.setState({
        time: {
          value: selected.value,
          label: selected.label,
        },
      });
    else if (this.state.radioButtonsData == this.state.radioButtonsStore)
      this.setState({
        store: selected.value,
      });
    else if (this.state.radioButtonsData == this.state.radioButtonsJobs)
      this.setState({
        job: selected.value,
        showSearch: false,
      });

    actionSheetRadioButtonRef.current?.setModalVisible(false);
  }

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

  onChangeSearch = async (textSearch) => {
    await this.getDataPetition.getInfo(
      `${endPoints.jobs}?search=${textSearch}&expand=products`,
      this.loadData,
      10,
    );
  };

  loadData = (data) => {
    if (data.length > 0) {
      let jobs = this.setRadioButtons(data);
      this.setState({
        radioButtonsJobs: jobs,
        radioButtonsData: this.state.radioButtonsJobs,
        showSearch: true,
      });
    } else {
      this.setState({
        notFound: true,
        showSearch: false,
      });
    }
  };

  verifyFields() {
    let error =
      !this.state.orderName ||
      !this.state.delivery.value ||
      !this.state.store ||
      (this.state.delivery.value === 'delivery' && this.state.location === '');
    this.setState({
      orderNameError: !this.state.orderName,
      deliveryTypeError: !this.state.delivery.value,
      storeError: !this.state.store,
      locationError: this.state.delivery.value === 'delivery' && this.state.location === '',
    });
    if (error) {
      alert('Fill in the required data *');
    }
    return error;
  }

  placeOrderHandler = async () => {
    try {
      let supplierId = await this.generalRequest.get(endPoints.supplierId);
      let date = new Date();
      let items = this.props.cartProducts.map((e) => {
        return {
          description: e.name,
          quantity: e.quantity,
          units: 'ea',
          cost: e.myPrice ? e.rrp : e.cost_price,
          tax: [
            {
              name: 'GST',
              rate: 10,
            },
          ],
        };
      });
      let missingFields = this.verifyFields();
      if (!missingFields) {
        let data = {
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
            delivery_instructions: [
              {
                delivery: this.state.delivery.value,
                location: this.state.location || '',
                date: this.state.date.value,
                time: this.state.time.value || '12:00pm',
              },
            ],
          },
        };
        console.log(data);
        let placedOrder = await this.generalRequest.put(endPoints.generateOrder, data);
        if (placedOrder) {
          this.props.clearProducts();
          this.props.navigation.navigate('OrderPlaced', { placedOrder: placedOrder.order });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  renderOptions = () => {
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
          <Text style={{ fontWeight: 'bold' }}>Detail Order</Text>
          <PickerButton
            text="Select Job"
            placeholder={this.state.job || 'Select or search job'}
            picked={this.state.job !== ''}
            icon
            onPress={() => {
              this.setState({ radioButtonsData: this.state.radioButtonsJobs });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
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
          <Text style={{ fontWeight: 'bold' }}>Delivery Options</Text>
          <PickerButton
            text="Delivery Type"
            error
            placeholder={this.state.delivery.label || 'Select delivery type'}
            icon
            picked={this.state.delivery.value !== ''}
            onPress={() => {
              this.setState({ radioButtonsData: radioButtonsDelivery });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />
          {this.state.delivery.value === 'delivery' && (
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
              placeholder={this.state.date.label || 'Select date'}
              icon
              picked={this.state.date.value !== ''}
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
            placeholder={this.state.time.label || 'Select time'}
            icon
            picked={this.state.time.value !== ''}
            iconName={'lock-clock'}
            size={25}
            onPress={() => {
              this.setState({ radioButtonsData: radioButtonsHour });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />
          {this.state.time.label === 'Anytime' && (
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
                value={this.state.time.value}
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
          <Text style={{ fontWeight: 'bold' }}>Store</Text>
          <PickerButton
            text="Select Store"
            error
            placeholder={this.state.store || 'Select store'}
            picked={this.state.store !== ''}
            icon
            onPress={() => {
              this.setState({ radioButtonsData: this.state.radioButtonsStore });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
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

  renderEmpty() {
    return (
      <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.ERROR}>
        The cart is empty
      </Text>
    );
  }

  render() {
    const { radioButtonsData } = this.state;

    return (
      <Block flex center>
        <FlatList
          data={this.state.ordersPlaced}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          ListEmptyComponent={this.renderEmpty()}
          ListFooterComponent={this.renderOptions()}
        />

        <ActionSheet ref={actionSheetRadioButtonRef} headerAlwaysVisible>
          <Block left style={{ height: 'auto', padding: 5, paddingBottom: 40 }}>
            {radioButtonsData !== this.state.radioButtonsJobs && !this.state.showSearch ? (
              <RadioGroup
                radioButtons={this.state.radioButtonsData}
                color={nowTheme.COLORS.INFO}
                onPress={(items) => this.onPressRadioButton(items)}
                containerStyle={styles.radioStyle}
              />
            ) : (
              <View style={{ height: height / 2 }}>
                <Searchbar
                  placeholder="Search job"
                  onChangeText={this.onChangeSearch}
                  style={styles.search}
                  inputStyle={styles.searchInput}
                />
                <ScrollView
                  style={{ width: width, marginHorizontal: 16 }}
                  contentContainerStyle={{ alignItems: 'flex-start' }}
                >
                  <RadioGroup
                    radioButtons={this.state.radioButtonsData}
                    color={nowTheme.COLORS.INFO}
                    onPress={(items) => this.onPressRadioButton(items)}
                    containerStyle={styles.radioStyle}
                  />
                </ScrollView>
              </View>
            )}
          </Block>
        </ActionSheet>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  errorText: {
    paddingTop: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
  orderName: {
    width: 'auto',
    paddingVertical: 10,
    height: 43,
  },
  notes: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    paddingTop: 10,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    elevation: 0,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  radioStyle: {
    alignItems: 'flex-start',
  },
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products,
});

const mapDispatchToProps = { clearProducts };

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrders);
