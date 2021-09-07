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
import Icon from '@components/Icon';
import { getStores, getJobs } from '../../services/PlaceOrdersServices';
import { connect  } from 'react-redux';

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

class PlaceOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      ordersPlaced: cart.products.slice(0, 3), // To only show 3 elements
      deleteAction: false,
      radioButtons: [],
      date: new Date(),
      radioButtonsJobs: [],
      radioButtonsStore: [],
      store: ''
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

  onPressRadioButton() {
    actionSheetRadioButtonRef.current?.setModalVisible(false);
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDatePicker();
  };

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  handleTimePicked = (time) => {
    console.log('A date has been picked: ', time);
    this.hideTimePicker();
  };

  handleQuantity = (id, qty) => {
    const { cart } = this.state;

    const updatedCart = cart.map((product) => {
      if (product.id === id) product.qty = qty;
      return product;
    });

    this.setState({ cart: updatedCart });
  };

  handleDelete = (id) => {
    const { cart } = this.state;
    const updatedCart = cart.filter((product) => product.id !== id);
    this.setState({ cart: updatedCart });
  };

  /*     renderProduct = ({ item }) => {
        const { navigation } = this.props;

        return (
        <Block card shadow style={styles.product}>
            <Block flex row>
                <TouchableWithoutFeedback
                    //  onPress={() => navigation.navigate("Product", { product: item })}
                >
                    <Image
                    source={{ uri: item.image }}
                    style={styles.imageHorizontal}
                    />
                </TouchableWithoutFeedback>
                <Block flex style={styles.productDescription}>
                    <Block row>
                        <Text color={nowTheme.COLORS.LIGHTGRAY}>
                            SKU:
                        </Text>
                        <Text color={nowTheme.COLORS.INFO}>
                            FIE228106B
                        </Text>
                    </Block>
                    <TouchableWithoutFeedback
                        //onPress={() =>  navigation.navigate("Product", { product: item }) }
                        >
                        <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
                            {item.title}
                        </Text>
                    </TouchableWithoutFeedback>
                    <Block flex left row space="between">
                        <Text
                            style={{ fontWeight:'bold', marginTop:10}}
                            color={nowTheme.COLORS.ORANGE} size={20}
                        >
                            ${item.price * item.qty}
                        </Text>
                    </Block>
                </Block>
            </Block>
            <Block right>
                <QuantityCounter quantity={1}/>
            </Block>
        </Block>
        );
    }; */

  orderTotal() {
    let prices = this.props.cartProducts.map((p) => {
      return p.cost_price*p.quantity
    })
    const reducer = (accumulator, curr) => accumulator + curr;
    return `$${prices.reduce(reducer, 0).toFixed(2)}`
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
            placeholder="Select or search job"
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
            placeholder="Select delivery type"
            icon
            onPress={() => {
              this.setState({ radioButtonsData: radioButtonsDelivery });
              actionSheetRadioButtonRef.current?.setModalVisible();
            }}
          />

          <>
            <PickerButton
              text="Preferred Delivery Date"
              placeholder="Select date"
              icon
              iconName={'calendar-today'}
              size={25}
              onPress={this.showDatePicker}
            />

            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
          </>
          <PickerButton
            text="Preferred Delivery Time"
            placeholder="Select time"
            icon
            iconName={'lock-clock'}
            size={25}
            onPress={this.showTimePicker}
          />
          <DateTimePicker
            mode="time"
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this.handleTimePicked}
            onCancel={this.hideTimePicker}
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
          <Text style={{ fontWeight: 'bold' }}>Store</Text>
          <PickerButton
            text={this.state.store}
            placeholder="Select store"
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
                onPress={() => this.props.navigation.navigate('OrderPlaced')}
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
          keyExtractor={(i) => {
            index: i;
          }}
          row
          style={{ justifyContent: 'space-between', paddingBottom: 7 }}
        >
          <Text style={styles.receiptText}>{orders.quantity}x {orders.name}</Text>
          <Text style={styles.receiptPrice}>${(orders.cost_price*orders.quantity).toFixed(2)}</Text>
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
                onPress={() => this.onPressRadioButton()}
                containerStyle={{alignItems: 'left'}}
              />
            ) : (
              <View>
                <Input
                  right
                  color="black"
                  style={styles.search}
                  placeholder="Search job"
                  placeholderTextColor={'#8898AA'}
                  // onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
                  iconContent={
                    <Icon
                      size={16}
                      color={theme.COLORS.MUTED}
                      name="zoom-bold2x"
                      family="NowExtra"
                    />
                  }
                />
                <Block left style={{ marginHorizontal: 16 }}>
                  <RadioGroup
                    radioButtons={this.state.radioButtonsData}
                    color={nowTheme.COLORS.INFO}
                    onPress={() => this.onPressRadioButton()}
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
  quantityButtons: {
    width: 25,
    height: 25,
  },
  quantityTexts: {
    fontWeight: 'bold',
    fontSize: 20,
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
  addButton: {
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(14, 58, 144, 0.1)',
    borderRadius: 5,
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
    fontSize: 13,
    width: '60%',
    color: '#363C4A',
  },
  receiptPrice: {
    fontSize: 14,
    color: nowTheme.COLORS.INFO,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
  },
  detailOrdersBlock: {
    height: 'auto',
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
});

const mapStateToProps = (state) => ({
  cartProducts: state.productsReducer.products
});


export default connect(mapStateToProps, {})(PlaceOrders);
