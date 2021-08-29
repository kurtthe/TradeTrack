import React, { createRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Clipboard
} from 'react-native';
import { Block, theme, Text, Input } from 'galio-framework';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Card, Button } from '@components';
import { Notification } from '@components';
import { nowTheme, Images } from '@constants';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import GrayLine from '@components/GrayLine';
import Icon from '@components/Icon';
import FilterButton from '@components/FilterButton';
import RadioGroup from 'react-native-radio-buttons-group';
import ActionSheet from 'react-native-actions-sheet';
import RNPickerSelect from 'react-native-picker-select';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListInvoices from '@custom-sections/ListInvoices';
import LiveBalance from '@custom-sections/LiveBalance';
import Balance from '@custom-sections/Balance';
import ListStatement from '@custom-sections/ListStatement';
import DateTimePicker from 'react-native-modal-datetime-picker';



import { getStatements } from '@core/module/store/statements/statements';
import { getBalance } from '@core/module/store/balance/liveBalance';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');
const actionSheetRef = createRef();
const actionSheetType = createRef();

const pickerOptions = [
  { label: 'Pay 30 Day', value: 'now' },
  { label: 'Pay Overdue', value: 'overdue' },
  { label: 'Pay 30 Day and Overdue', value: 'nowAndOver' },
];


const radioButtonsHour = [
  {
    id: '1',
    label: 'INVOICE',
    value: 'INVOICE',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '2',
    label: 'CREDIT NOTES',
    value: 'CREDIT NOTES',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },
  {
    id: '3',
    label: 'QUOTE',
    value: 'QUOTE',
    color: nowTheme.COLORS.INFO,
    labelStyle: { fontWeight: 'bold' },
  },

];

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      isTypePickerVisible:false,
      customStyleIndex: 0,
      clipboardText: "",
      textInputText: ""
      
    };
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  setBsbClipboard = async () => {
    await Clipboard.setString('083125');
  }

  setAccountClipboard = async () => {
    await Clipboard.setString('048284743');
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };


  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };


  onPressRadioButton() {
    actionSheetType.current?.setModalVisible(false);
  }

  

  async componentDidMount() {
    if (!!this.props.route.params) {
      this.setState({
        customStyleIndex: this.props.route.params.tabIndexSelected,
      });
    }
    await this.getDataPetition.getInfoStatements(endPoints.statements, this.props.getStatements);
    await this.getDataPetition.getInfo(endPoints.burdensBalance, this.props.getBalance);
  }

  handleCustomIndexSelect = (index) => {
    this.setState((prevState) => ({ ...prevState, customStyleIndex: index }));
  };

  renderBalance = () => {
    const { customStyleIndex } = this.state;
    return (
      <Block style={{ padding: theme.SIZES.BASE, top: '0.5%' }}>
        <Text style={{ paddingBottom: 15 }} size={16}>
          Payment Details
        </Text>
        <Block row style={{ paddingBottom: 15 }}>
          <Block row flex center justifyContent={'space-between'}>
            <Block>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                BSB
              </Text>
              <Text
                size={
                  Platform.OS === 'ios'
                    ? Dimensions.get('window').height < 670
                      ? 14
                      : 16
                    : Dimensions.get('window').height < 870
                    ? 14
                    : 16
                }
              >
                O83-125
              </Text>
            </Block>
            <Block center flex>
              <TouchableOpacity onPress={this.setBsbClipboard}>
                <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
              </TouchableOpacity>
            </Block>
          </Block>
          <Block row flex center justifyContent={'space-between'}>
            <Block>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Account
              </Text>
              <Text
                size={
                  Platform.OS === 'ios'
                    ? Dimensions.get('window').height < 670
                      ? 14
                      : 16
                    : Dimensions.get('window').height < 870
                    ? 14
                    : 16
                }
              >
                04-828-4743
              </Text>
            </Block>
            <Block>
              <TouchableOpacity onPress={this.setAccountClipboard}>
                <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
        <Block row style={{ paddingBottom: 15 }}>
          <Block flex>
            <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
              Reference
            </Text>
            <Text
              size={
                Platform.OS === 'ios'
                  ? Dimensions.get('window').height < 670
                    ? 14
                    : 16
                  : Dimensions.get('window').height < 870
                  ? 14
                  : 16
              }
            >
             {this.props.liveBalance.client_number}
            </Text>
          </Block>
        </Block>
        <Block row style={{ justifyContent: 'center' }}>
          <Button
            color="info"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
            style={styles.button}
            onPress={() => actionSheetRef.current?.setModalVisible()}
          >
            Pay via Credit Card
          </Button>
        </Block>
        <GrayLine style={{ width: '100%', alignSelf: 'center' }} />

        <Balance />
        
              <Block style={{top:'-3.3%'}}>
        <ListStatement  statements={this.props.statements} />
        </Block>
     
        
      </Block>
    );
  };

  
  renderStatements = () => {
    return (
      <Block flex  backgroundColor={nowTheme.COLORS.BACKGROUND} style={{ top: 12 }} >
       
       <Block style={{ top: 5 }}>
       {this.renderFilters()}
       
         </Block>

        <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
              <ListInvoices invoices={this.props.invoices} title={false} />
             
             
          </ScrollView>
        </Block>
      </Block>
    );
  };

  renderFilters = () => {
    return (

      <Block row space={'evenly'} width={'60%'} style={{justifyContent: 'space-evenly', marginLeft: '-2%'}}>

<>
          <FilterButton text={'By Date'} icon={require('@assets/imgs/img/calendar.png')}  onPress={this.showDateTimePicker} />

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </>


      
        <FilterButton 
          text={'For Type'} 
          // onPress={() => actionSheetType.current?.setModalVisible()}

           onPress={() => {
            this.setState({ radioButtonsData: radioButtonsHour });
            actionSheetType.current?.setModalVisible();
          }}
        />


           
     </Block>

    );
  };

  render() {
    const { customStyleIndex, radioButtonsData } = this.state;

    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <LiveBalance />
          <Block  style={{top:10}}>
          <SegmentedControlTab
            values={['Statements', 'Invoices']}
            selectedIndex={customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
            tabStyle={{
              backgroundColor: '#FFFFFF',
              borderWidth: 0,
              borderColor: 'transparent',
              borderBottomWidth: 2,
              borderBottomColor: '#D2D2D2',
            }}
            activeTabStyle={{
              backgroundColor: nowTheme.COLORS.BACKGROUND,
              marginTop: 2,
              borderBottomWidth: 2,
              borderBottomColor: nowTheme.COLORS.INFO,
            }}
            tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
            activeTabTextStyle={{ color: nowTheme.COLORS.INFO }}
          />
          </Block>
          {customStyleIndex === 0 && this.renderBalance()}
          {customStyleIndex === 1 && this.renderStatements()}
        </ScrollView>
        <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
          <Block style={{ height: 'auto', padding: 15, paddingBottom: 30 }}>
            <Text style={{ fontWeight: 'bold' }}>Payment via Credit Card</Text>
            <RNPickerSelect
              placeholder={{ label: 'Select an option' }}
              textInputProps={{ color: '#8898AA' }}
              style={{
                placeholder: styles.pickerText,
                viewContainer: styles.pickerContainer,
                inputAndroid: { color: nowTheme.COLORS.PICKERTEXT },
              }}
              onValueChange={(value) => console.log(value)}
              items={pickerOptions}
            />
            <Text style={{ fontWeight: 'bold' }}>Amount</Text>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="$00,00"
              placeholderTextColor={'#8898AA'}
            />
            <Block row style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
              <Text size={15}>Your Balance</Text>
              <Text
                size={16}
                color={nowTheme.COLORS.INFO}
                style={{ fontWeight: Platform.OS == 'android' ? 'bold' : '600' }}
              >
                $12,500.12
              </Text>
            </Block>
            <View>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.buttonAS}
              >
                Continue
              </Button>
              <Button
                color="eeeee4"
                textStyle={{
                  color: nowTheme.COLORS.LIGHTGRAY,
                  fontFamily: 'montserrat-bold',
                  fontSize: 16,
                }}
                style={(styles.buttonGrayAS, styles.buttonAS)}
              >
                Cancel
              </Button>
              
            </View>
          </Block>
        </ActionSheet>



        <ActionSheet ref={actionSheetType} headerAlwaysVisible>
          <Block style={{ height: 'auto', padding: 15, paddingBottom: 30 }}>
          <RadioGroup
                radioButtons={this.state.radioButtonsData}
                color={nowTheme.COLORS.INFO}
                onPress={() => this.onPressRadioButton()}
              />
            
          
          </Block>
        </ActionSheet>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
   
    width: width,
    top:-10
  },
  articles: {
    width: width - theme.SIZES.BASE * 0.1,
    paddingVertical: theme.SIZES.BASE * 0.1,
    paddingHorizontal: 0,
    fontFamily: 'montserrat-regular',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  buttonAS: {
    width: width - theme.SIZES.BASE * 2,
  },
  buttonGrayAS: {
    borderWidth: 1,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  card: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: 20,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardHeader: {
    justifyContent: 'center',
    height: '4%',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 1,
  },
  bottomView: {
    padding: 10.5,
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'rgba(75, 106, 170, 0.5)',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
  detailOrders: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: '8%',
    marginVertical: theme.SIZES.BASE * 0.9,
  },
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    padding: 15,
    marginLeft: -15,
    width: width,
    height: '5.5%',
  },
  notificationStyle: {
    marginBottom: 5,
    width: width,
    marginLeft: -15,
  },
  statements: {
    marginLeft: 15,
  },
  receiptText: {
    fontSize: 13,
    width: '60%',
    color: nowTheme.COLORS.SECONDARY,
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    height: 45,
  },
  pickerText: {
    color: nowTheme.COLORS.PICKERTEXT,
  },


});

const mapStateToProps = (state) => ({
  statements: state.statementsReducer.statements,
  invoices: state.invoicesReducer.invoices,
  liveBalance: state.liveBalanceReducer,
});

const mapDispatchToProps = { getStatements, getBalance };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
