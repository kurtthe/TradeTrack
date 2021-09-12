import React, { createRef } from 'react';
import { StyleSheet, Dimensions, Image, FlatList, View } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { nowTheme } from '@constants/index';
import { cart } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import PickerButton from '@components/PickerButton';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getStores, getJobs, searchJobs } from '../../services/PlaceOrdersServices';
import { connect  } from 'react-redux';
import { FormatMoneyService } from '@core/services/format-money.service';
import { Searchbar } from 'react-native-paper';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const { width } = Dimensions.get('screen');
const actionSheetRadioButtonRef = createRef();

const radioButtonsDelivery = [
  {
    id: '1',
    label: 'Use delivery',
    value: 'Use delivery',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '2',
    label: 'Take it by yourself',
    value: 'Take it by yourself',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
];

const radioButtonsHour = [
  {
    id: '1',
    label: '7 AM',
    value: '7 AM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '2',
    label: '8 AM',
    value: '8 AM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '3',
    label: '9 AM',
    value: '9 AM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '4',
    label: '10 AM',
    value: '10 AM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '5',
    label: '11 AM',
    value: '11 AM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '6',
    label: '12 PM',
    value: '12 PM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '7',
    label: '1 PM',
    value: '1 PM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '8',
    label: '2 PM',
    value: '2 PM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '9',
    label: '3 PM',
    value: '3 PM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '10',
    label: '4 PM',
    value: '4 PM',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
];

class PlaceOrders extends React.Component {
  constructor(props) {
    super(props);
    this.generalRequest = GeneralRequestService.getInstance();
    this.formatMoney = FormatMoneyService.getInstance();
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3), // To only show 3 elements
      deleteAction: false,
      radioButtons: [],
      date: '',
      radioButtonsJobs: [],
      radioButtonsStore: [],
      store: '',
      job: '',
      delivery: '',
      time: '',
      orderName: '',
    };
  }

  async componentDidMount() {
    try{
      let stores = await getStores()
      let jobs = await getJobs()
      let storesAsRadioButtons = this.setRadioButtons(stores)
      let jobsAsRadioButtons = this.setRadioButtons(jobs)
      this.setState({
        radioButtonsStore: storesAsRadioButtons,
        radioButtonsJobs: jobsAsRadioButtons
      })
    } catch (e){
      console.log(e)
    }
  }

  setRadioButtons(stores) {
    let radioButtonsValues = stores.map(c => ({
      ...c, 
      color: nowTheme.COLORS.INFO,
      labelStyle: {fontWeight: 'bold'},
      label: c.name,
      value: c.name
    }))
    return radioButtonsValues;
  }

  onPressRadioButton(items) {
    let selected = items.find(i => i.selected)
    if (this.state.radioButtonsData == radioButtonsDelivery)
      this.setState({
        delivery: selected.value
      })
    else if (this.state.radioButtonsData == radioButtonsHour)
      this.setState({
        time: selected.value
      })
    else if (this.state.radioButtonsData == this.state.radioButtonsStore)
      this.setState({
        store: selected.value
      })
    else if (this.state.radioButtonsData == this.state.radioButtonsJobs)
      this.setState({
        job: selected.value
      })
    
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
      date: date.toDateString()
    })
    this.hideDatePicker();
  };

  // showTimePicker = () => {
  //   this.setState({ isTimePickerVisible: true });
  // };

  // hideTimePicker = () => {
  //   this.setState({ isTimePickerVisible: false });
  // };

  // handleTimePicked = (time) => {
  //   console.log('A date has been picked: ', time);
  //   this.hideTimePicker();
  // };

  onChangeSearch = async (query) => {
    try {
      let searchResult = await searchJobs(query);
      let categories = this.setRadioButtons(searchResult);
      this.setState({
        radioButtonsJobs: categories
      })
    } catch (e) {
      console.log('search error', e)
    }
  }

  orderTotal() {
    let prices = this.props.cartProducts.map((p) => {
      return p.price*p.quantity
    })
    const reducer = (accumulator, curr) => accumulator + curr;
    return `${this.formatMoney.format(prices.reduce(reducer, 0))}`
  }

  verifyFields() {
    let error = false
    if (!this.state.orderName) {
      alert('You must specify a valid name')
      error = true
    } 
    if (!this.state.delivery) {
      alert('You must pick a Delivery Type')
      error = true
    } 
    if (!this.props.cartProducts) {
      alert('You must have an order to place')
      error = true
    }
    return error
  }

  async placeOrderHandler() {
    try{
      let supplierId = await this.generalRequest.get(endPoints.supplierId);
      let date = new Date();
      let items = this.props.cartProducts.map(e => {
        return (
          {
            ...e,
            description: e.name,
            units: e.quantity,
            cost: e.price
          }
        )
      })
      let missingFields = this.verifyFields()
      if (!missingFields) {
        let data = {
          "data": {
            "name": this.state.orderName,
            "supplier": supplierId,
            "job": this.state.job,
            "issued_on": date.toISOString("2015-05-14").slice(0,10),
            "description": "A description for this order",
            "notes": this.state.notes,
            "tax_exclusive": null,
            "sections": [
                {
                    "items": items,
                    "name": "Section 1",
                    "description": "A section description",
                    "hide_section": false,
                    "hide_section_price": false,
                    "hide_section_items": false,
                    "hide_item_qty": false,
                    "hide_item_price": false,
                    "hide_item_subtotal": false,
                    "hide_item_total": false
                }
            ],
            "delivery_instructions": {
                "delivery": this.state.delivery,
                "time": this.state.time
            }
          }
        };
        let placedOrder = await this.generalRequest.put(endPoints.generateOrder, data);
        console.log(placedOrder)
        if (placedOrder) {
          this.props.navigation.navigate('OrderPlaced');
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

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
            placeholder={this.state.job || "Select or search job"}
            picked={this.state.job !== ''}
            icon
            onPress={() => {
              this.setState({ radioButtonsData: this.state.radioButtonsJobs });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />
          <Text style={styles.text}>Order Name</Text>
          <Input
            left
            color="black"
            style={styles.orderName}
            placeholder="Enter your order name"
            onChangeText={t => this.setState({ orderName: t})}
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
            placeholder={this.state.delivery || "Select delivery type"}
            icon
            picked={this.state.delivery !== ''}
            onPress={() => {
              this.setState({ radioButtonsData: radioButtonsDelivery });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />

          <>
            <PickerButton
              text="Preferred Delivery Date"
              placeholder={this.state.date || "Select date"}
              icon
              picked={this.state.date !== ''}
              iconName={'calendar-today'}
              size={25}
              onPress={this.showDatePicker}
            />

            <DateTimePicker
              mode='date'
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
          </>
          <PickerButton
            text="Preferred Delivery Time"
            placeholder={this.state.time || "Select time"}
            icon
            picked={this.state.time !== ''}
            iconName={'lock-clock'}
            size={25}
            onPress={ () => {
              this.setState({ radioButtonsData: radioButtonsHour });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />
          {/* <DateTimePicker
            mode="time"
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this.handleTimePicked}
            onCancel={this.hideTimePicker}
          /> */}
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
            text='Select Store'
            placeholder={this.state.store || "Select store"}
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
            onChangeText={t => this.setState({ notes: t})}
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
              <Text size={14}>Total Orders</Text>
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
    const orders = this.props.cartProducts

    return orders.map((orders) => {
      return (
        <Block 
          keyExtractor={(i) => { index: i }} 
          style={{top: 5, }} 
        >
          <Text style={styles.grayTextSKU}> SKU {orders.sku}</Text>
          <Text  numberOfLines={2} style={styles.receiptText}>{orders.name}</Text>
          <Block row style={{ justifyContent: 'space-between',  }}>
            <Text style={styles.grayText}>{orders.quantity} x {this.formatMoney.format(orders.price)}</Text>
            <Text style={styles.detailPrice}>{this.formatMoney.format(orders.price*orders.quantity)}</Text>
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
          <Block left style={{ height: 'auto', padding: 5, paddingBottom: 40 }}>
            {radioButtonsData !== this.state.radioButtonsJobs ? (
              <RadioGroup
                radioButtons={this.state.radioButtonsData}
                color={nowTheme.COLORS.INFO}
                onPress={(items) => this.onPressRadioButton(items)}
                containerStyle={{alignItems: 'left'}}
              />
            ) : (
              <View>
                <Searchbar
                  placeholder="Search job"
                  onChangeText={this.onChangeSearch}
                  style={styles.search}
                  inputStyle={styles.searchInput}
                />
                <Block left style={{ marginHorizontal: 16 }}>
                  <RadioGroup
                    radioButtons={this.state.radioButtonsData}
                    color={nowTheme.COLORS.INFO}
                    onPress={(items) => this.onPressRadioButton(items)}
                    containerStyle={{alignItems: 'left'}}
                  />
                </Block>
              </View>
            )}
          </Block>
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
  search: {
    height: 40,
    width: width - 32,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    elevation: 0
  },
  searchInput: {
    color: 'black',
    fontSize: 16
  }
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products
});


export default connect(mapStateToProps, {})(PlaceOrders);
