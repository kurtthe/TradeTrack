import React, { createRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
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
import PickerButton from '@components/PickerButton';
import ActionSheet from 'react-native-actions-sheet';
import RNPickerSelect from 'react-native-picker-select';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListInvoices from '@custom-sections/ListInvoices';
import LiveBalance from '@custom-sections/LiveBalance';
import Balance from '@custom-sections/Balance';
import ListStatement from '@custom-sections/ListStatement';

import { getStatements } from '@core/module/store/statements/statements';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');
const actionSheetRef = createRef();
const pickerOptions = [
  { label: 'Pay 30 Day', value: 'now' },
  { label: 'Pay Overdue', value: 'overdue' },
  { label: 'Pay 30 Day and Overdue', value: 'nowAndOver' },
];

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customStyleIndex: 0,
    };
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    await this.getDataPetition.getInfo(endPoints.statements, this.props.getStatements);
  }

  handleCustomIndexSelect = (index) => {
    this.setState((prevState) => ({ ...prevState, customStyleIndex: index }));
  };

  renderBalance = () => {
    const { customStyleIndex } = this.state;
    return (
      <Block style={{ padding: theme.SIZES.BASE, paddingBottom: '10%' }}>
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
              <TouchableOpacity>
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
                04-8284743
              </Text>
            </Block>
            <Block>
              <TouchableOpacity>
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
              123-456
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
        <ListStatement statements={this.props.statements} />
      </Block>
    );
  };

  renderArticles = () => {
    return (
      <Block style={(styles.card, this.state.customStyleIndex === 1 && styles.statements)}>
        <Notification
          system
          title="Statement"
          reference="214357"
          time="2021-07-31"
          body="Burdens Statement"
          price="37,782.24"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => alert('web view pdf')}
        />
        <Notification
          system
          title="Statement"
          reference="214357"
          time="2021-07-31"
          body="Burdens Statement"
          price="37,782.24"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => alert('web view pdf')}
        />
        <Notification
          system
          title="Statement"
          reference="214357"
          time="2021-07-31"
          body="Burdens Statement"
          price="37,782.24"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => alert('web view pdf')}
        />
        <Notification
          system
          title="Statement"
          reference="214357"
          time="2021-07-31"
          body="Burdens Statement"
          price="37,782.24"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => alert('web view pdf')}
        />
      </Block>
    );
  };

  renderStatements = () => {
    return (
      <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <Block style={{ left: theme.SIZES.BASE * -1.7 }}>{this.renderFilters()}</Block>

        <Block style={{ top: 0 }}>
          <ScrollView>
            <Block flex>
              <ListInvoices invoices={this.props.invoices} />
              <Block center style={{ paddingVertical: 5 }}>
                <Button
                  color="info"
                  textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                  style={styles.button}
                >
                  Load More..
                </Button>
              </Block>
              <Block center style={{ paddingVertical: 5 }}></Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  };

  renderFilters = () => {
    return (
      <Block
        row
        space={'evenly'}
        width={'85%'}
        style={{ justifyContent: 'space-evenly', marginLeft: '-3%', padding: 8 }}
      >
        <FilterButton text={'By Date'} icon={require('@assets/imgs/img/calendar.png')} />
        <FilterButton text={'Last Month'} />
        <FilterButton text={'Overdue'} />
      </Block>
    );
  };

  render() {
    const { customStyleIndex } = this.state;
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <LiveBalance />
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
              // onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
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
                //onPress={() => actionSheetRef.current?.setModalVisible()}
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
                //onPress={() => actionSheetRef.current?.setModalVisible()}
              >
                Cancel
              </Button>
            </View>
          </Block>
        </ActionSheet>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: '#e5e5e5',
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
  token_login: state.loginReducer.api_key,
  statements: state.statementsReducer.statements,
});

const mapDispatchToProps = { getStatements };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
