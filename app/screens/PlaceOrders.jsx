import React, { createRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, View } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { cart } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import PickerButton from '@components/PickerButton';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import { clearProducts } from '@core/module/store/cart/cart';
import Search from '@custom-elements/Search';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';

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
      date: null,
      radioButtonsJobs: [],
      radioButtonsStore: [],
      store: '',
      job: '',
      delivery: null,
      deliveryText: 'Delivery',
      location: '',
      time: null,
      orderName: '',
      notFound: false,
      showSearch: false,
      orderNameError: false,
      deliveryTypeError: false,
      storeError: false,
      locationError: false,
      search: '',
      page: 1,
      radioButtonsDelivery,
      radioButtonsHour,
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
      this.didBlurSubscription();
    } catch (e) {
      console.log(e);
    }
  }

  didBlurSubscription = () =>
    this.props.navigation.addListener('blur', (payload) => {
      this.clearState();
    });

  componentWillUnmount() {
    this.didBlurSubscription();
  }

  clearSelected = (listData = [], idSelected) => {
    return listData.map((item) => {
      if (item.id === idSelected) {
        return {
          ...item,
          selected: false,
        };
      }

      return item;
    });
  };

  clearState = () => {
    const { radioButtonsDelivery, radioButtonsHour, delivery, time } = this.state;

    const radioButtonsDeliveryClear = this.clearSelected(radioButtonsDelivery, delivery?.id);
    const radioButtonsHourClear = this.clearSelected(radioButtonsHour, time?.id);

    this.setState({
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3), // To only show 3 elements
      deleteAction: false,
      radioButtons: [],
      radioButtonsData: [],
      date: null,
      radioButtonsJobs: [],
      radioButtonsStore: [],
      store: '',
      job: '',
      delivery: null,
      deliveryText: 'Delivery',
      location: '',
      time: null,
      orderName: '',
      notFound: false,
      showSearch: false,
      orderNameError: false,
      deliveryTypeError: false,
      storeError: false,
      locationError: false,
      search: '',
      page: 1,
      radioButtonsDelivery: radioButtonsDeliveryClear,
      radioButtonsHour: radioButtonsHourClear,
    });
  };

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

  onPressRadioButton = (items) => {
    let selected = items.find((i) => i.selected);
    if (this.state.radioButtonsData == this.state.radioButtonsDelivery)
      this.setState({
        delivery: selected,
        deliveryText: selected?.label,
      });
    else if (this.state.radioButtonsData == this.state.radioButtonsHour)
      this.setState({
        time: selected,
      });
    else if (this.state.radioButtonsData == this.state.radioButtonsStore)
      this.setState({
        store: selected?.value,
      });
    else if (this.state.radioButtonsData == this.state.radioButtonsJobs)
      this.setState({
        job: selected?.value,
        showSearch: false,
      });

    actionSheetRadioButtonRef.current?.setModalVisible(false);
  };

  onPressRadioButtonJob = (items) => {
    let selected = items.find((i) => i.selected);
    this.setState({
      job: selected?.value,
      showSearch: false,
    });
    actionSheetRadioButtonRef.current?.setModalVisible(false);
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

  changeSearchText = (text) => {
    this.setState({ search: text });

    if (text == '') {
      this.handleSearch(1);
    }
  };

  handleSearch = async (page) => {
    this.setState({ page: page + 1 });
    await this.getDataPetition.getInfo(
      `${endPoints.jobs}?search=${this.state.search}&expand=products`,
      this.loadData,
      page,
    );
  };

  loadData = (data, page) => {
    if (data.length > 0) {
      let jobs = this.setRadioButtons(data);
      this.setState({
        radioButtonsJobs: page == 1 ? jobs : this.state.radioButtonsJobs.concat(jobs),
        radioButtonsData: page == 1 ? jobs : this.state.radioButtonsJobs.concat(jobs),
        showSearch: true,
      });
      if (page == 1) {
        this.handleSearch(this.state.page);
      }
    } else {
      this.setState({
        radioButtonsData: [],
        radioButtonsJobs: [],
        notFound: true,
      });
    }
  };

  orderTotal = () => {
    let prices = this.props.cartProducts.map((p) => {
      const price = p.myPrice ? p.rrp : p.cost_price;
      return price * p.quantity;
    });
    const reducer = (accumulator, curr) => accumulator + curr;
    return `${this.formatMoney.format(prices.reduce(reducer, 0))}`;
  };

  verifyFields = () => {
    let error =
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
            delivery_instructions: {
              delivery: this.state.delivery?.value,
              location: this.state.location || '',
              date: this.state.date?.value,
              time: this.state.time?.value || '12.00 PM',
            },
          },
        };
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
            placeholder={this.state.delivery?.label || 'Select delivery type'}
            icon
            picked={this.state.delivery?.value !== ''}
            onPress={() => {
              this.setState({ radioButtonsData: this.state.radioButtonsDelivery });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
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
              placeholder={this.state.date?.label || 'Select date'}
              icon
              picked={this.state.date?.value !== ''}
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
            picked={this.state.time?.value !== ''}
            iconName={'lock-clock'}
            size={25}
            onPress={() => {
              this.setState({ radioButtonsData: this.state.radioButtonsHour });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
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
        <Block card backgroundColor={'white'} width={width}>
          <Block style={styles.detailOrdersBlock}>
            <View style={styles.detailOrders}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Detail Orders</Text>
            </View>

            {this.renderDetailOrdersAS()}
            <View
              style={{
                borderWidth: 0.7,
                marginVertical: 5,
                backgroundColor: '#E8E8E8',
                borderColor: '#E8E8E8',
              }}
            />
            <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top: 10 }}>
              <Text size={14}>Total (ex-GST)</Text>
              <Text
                size={16}
                color={nowTheme.COLORS.ORANGE}
                style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
              >
                {this.orderTotal()}
              </Text>
            </Block>
            <Block center style={{ position: 'relative', bottom: 0, paddingHorizontal: 20 }}>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.button}
                onPress={() => this.placeOrderHandler()}
              >
                Place Order
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  renderDetailOrdersAS = () => {
    const orders = this.props.cartProducts;

    return orders.map((orders) => {
      const price = orders.myPrice ? orders.rrp : orders.cost_price;
      return (
        <Block
          keyExtractor={(i) => {
            index: i;
          }}
          style={{ top: 5 }}
        >
          <Text style={styles.grayTextSKU}> SKU {orders.sku}</Text>
          <Text numberOfLines={2} style={styles.receiptText}>
            {orders.name}
          </Text>
          <Block row style={{ justifyContent: 'space-between' }}>
            <Text style={styles.grayText}>
              {orders.quantity} x {this.formatMoney.format(price)}
            </Text>
            <Text style={styles.detailPrice}>
              {this.formatMoney.format(price * orders.quantity)}
            </Text>
          </Block>
        </Block>
      );
    });
  };

  renderASHeader = () => {
    return (
      <Block
        row
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Detail Orders</Text>
        <MaterialIcons name="expand-more" color={'gray'} size={30} />
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
    const { customStyleIndex, radioButtonsData } = this.state;
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.cart}>
        <FlatList
          data={this.state.ordersPlaced}
          // renderItem={this.renderProduct}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          ListEmptyComponent={this.renderEmpty()}
          ListFooterComponent={this.renderOptions()}
        />

        <ActionSheet ref={actionSheetRadioButtonRef} headerAlwaysVisible>
          {radioButtonsData !== this.state.radioButtonsJobs && !this.state.showSearch ? (
            <View style={{ height: 'auto', padding: 5, paddingBottom: 25 }}>
              <RadioGroup
                radioButtons={this.state.radioButtonsData}
                color={nowTheme.COLORS.INFO}
                onPress={(items) => this.onPressRadioButton(items)}
                containerStyle={styles.radioStyle}
              />
            </View>
          ) : (
            <View style={{ height: height / 2, paddingBottom: 40 }}>
              <Search
                placeholder="Search job"
                value={this.state.search}
                onChangeText={(text) => this.changeSearchText(text)}
                onSearch={() => this.handleSearch(1)}
                style={styles.search}
                inputStyle={styles.searchInput}
              />
              <ScrollView
                style={{ width: width - 16, height: '95%' }}
                contentContainerStyle={{ alignItems: 'flex-start', paddingHorizontal: 16 }}
                onMomentumScrollEnd={() => this.handleSearch(this.state.page)}
              >
                <RadioGroup
                  radioButtons={this.state.radioButtonsJobs}
                  color={nowTheme.COLORS.INFO}
                  onPress={(items) => this.onPressRadioButtonJob(items)}
                  containerStyle={styles.radioStyle}
                />
              </ScrollView>
            </View>
          )}
        </ActionSheet>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
  },
  products: {
    minHeight: '100%',
  },
  product: {
    width: width * 0.9,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 3,
  },
  productTitle: {
    fontFamily: 'montserrat-regular',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: 0,
  },
  imageHorizontal: {
    height: nowTheme.SIZES.BASE * 5,
    width: nowTheme.SIZES.BASE * 5,
    margin: nowTheme.SIZES.BASE / 2,
  },
  options: {
    padding: theme.SIZES.BASE / 2,
  },
  qty: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: theme.SIZES.BASE * 6.25,
    backgroundColor: nowTheme.COLORS.INPUT,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  checkout: {
    height: theme.SIZES.BASE * 3,
    fontSize: 14,
    width: width - theme.SIZES.BASE * 4,
  },
  button: {
    width: width - theme.SIZES.BASE * 3.1,
    marginTop: theme.SIZES.BASE,
  },
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '8%',
    marginVertical: theme.SIZES.BASE * 0.9,
  },
  buttonOrder: {
    width: Platform.OS === 'ios' ? width - 240 : width - 300,
  },
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
  receiptText: {
    paddingVertical: 10,
    width: '80%',
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
  detailOrdersBlock: {
    height: 'auto',
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  search: {
    height: 40,
    width: width - 32,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,
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
