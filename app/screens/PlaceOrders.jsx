import React from 'react';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';
import PickerButton from '@custom-elements/PickerButton';

import { FormatMoneyService } from '@core/services/format-money.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import {
  radioButtonsDelivery,
  radioButtonsHour,
} from '@shared/dictionaries/radio-buttons-delivery';

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

  handleChangeDelivery = (option) => {};

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
            renderOptions={this.state.radioButtonsJobs}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'job')}
            onSearch={() => this.handleSearch()}
            changeTextSearch={(text) => this.changeSearchText(text)}
            search={true}
            icon={true}
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
            placeholder={this.state.deliveryText || 'Select delivery type'}
            icon
            renderOptions={this.state.radioButtonsDeliveries}
            onChangeOption={(option) => this.handleChangeOptionSelected(option, 'delivery')}
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
            onChangeOption={(option) => this.handleChangeDelivery(option, 'time')}
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
