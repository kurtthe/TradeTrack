import React, { createRef } from "react";
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import { Block, theme, Text, Input } from "galio-framework";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Card, Button } from "@components";
import { Notification } from "@components";
import { nowTheme, Images } from "@constants";
import {  MaterialIcons, Ionicons } from "@expo/vector-icons";
import GrayLine from "@components/GrayLine";
import Icon from '@components/Icon';
import FilterButton from "@components/FilterButton";
import PickerButton from "@components/PickerButton";
import ActionSheet from "react-native-actions-sheet";
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get("screen");
const actionSheetRef = createRef();
const pickerOptions = [
  { label: 'Pay 30 Day', value: 'now' },
  { label: 'Pay Overdue', value: 'overdue' },
  { label: 'Pay 30 Day and Overdue', value: 'nowAndOver' },
]

class Home extends React.Component {

  state = {
    customStyleIndex: 0
  }

  handleCustomIndexSelect = (index) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
  }

  renderDetailOrdersAS = () => {
    const orders = [
        {
            title: 'Accurate as of',
            price: '5th May 2021'
        },
        {
            title: 'Current Month',
            price: '$15,000.00'
        },
        {
            title: '30 Day Balance',
            price: '$15,000.00'
        },
        {
          title: 'Overdue Amount',
          color: 'red',
          price: '-$2,499.88'
      }
    ]
    
    return orders.map((orders) => {
      return (
        <Block keyExtractor={(i) => {index: i}} row style={{ justifyContent: 'space-between', paddingTop: 20}}>
            <Text style={styles.receiptText}>
                {orders.title}
            </Text>
            <Text style={[styles.receiptPrice, orders.color && { color: nowTheme.COLORS.ORANGE }]}>
                {orders.price}
            </Text>
        </Block>
      )
    })
  }

  renderBalance = () => {
    const { customStyleIndex } = this.state
    return (
        <Block style={{ padding: theme.SIZES.BASE, paddingBottom: '10%' }}>
          <Text style={{paddingBottom: 15}} size={16}>Payment Details</Text>
          <Block row style={{paddingBottom: 15}}>
            <Block row flex center justifyContent={'space-between'}>
              <Block>
                <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>BSB</Text>
                <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>O83-125</Text>
              </Block>
              <Block center flex>
                <TouchableOpacity >
                  <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY}/>
                </TouchableOpacity>
              </Block>
            </Block>
            <Block row flex center justifyContent={'space-between'}>
              <Block>
                <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                  Account
                </Text>
                <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>04-8284743</Text>
              </Block>
              <Block>
                <TouchableOpacity >
                  <MaterialIcons name="content-copy" size={24} color={nowTheme.COLORS.LIGHTGRAY}/>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
          <Block row style={{paddingBottom: 15}}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>Reference</Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>123-456</Text>
            </Block>
            <Block flex >
              {/* <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Period Ending
              </Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>04-8284743</Text> */}
            </Block>
          </Block>
          <Block row style={{justifyContent: 'center'}}>
            <Button
              color="info"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
              style={styles.button}
              onPress={() => actionSheetRef.current?.setModalVisible()}
            >
              Pay via Credit Card
            </Button>
          </Block>
          <GrayLine style={{width: '100%', alignSelf: 'center'}}/>

          <Block>
            <View style={styles.detailOrders}>
              <Text style={{ fontWeight: 'bold', fontSize: 16}}>
                Balance Details
              </Text>
            </View>
            {this.renderDetailOrdersAS()}
            <GrayLine style={{width: '100%', alignSelf: 'center'}}/>
            <Block row style={{ justifyContent: 'space-between', top:10, marginBottom: -30}}>
              <Text size={15}>
              Total Due
              </Text>
              <Text size={16} color={nowTheme.COLORS.INFO} style={{fontWeight: Platform.OS == 'android' ? 'bold' : '600'}}>
              $12,500.12
              </Text>
            </Block>
          </Block>
          <Block row style={styles.newStatementsTitle}>
            <Text
              size={18}
              style={{ fontFamily: "montserrat-bold" ,}}
              color={'#363C4A'}
            >
              All Statements
            </Text>

            {this.renderFilters()}
          </Block>
          <Block>
            {this.renderArticles()}
          </Block>
        

        </Block>
    )
  }

  renderArticles = () => {
    return (
      <Block style={styles.card, this.state.customStyleIndex === 1 && styles.statements}>
        <Notification
          system
          title="Invoice"
          reference="20792769"
          time="05/03/2021"
          body="LOT 97 - 105 CHELTENHAM...BEAU"
          done="Invoiced"
          price="1.200"
          iconName="email-852x"
          iconFamily="NowExtra"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => this.props.navigation.navigate('InvoiceDetails')}
        />
        <Notification
          system
          title="Invoice"
          reference="20792769"
          time="05/03/2021"
          body="LOT 97 - 105 CHELTENHAM...BEAU"
          done="Invoiced"
          price="1.200"
          iconName="email-852x"
          iconFamily="NowExtra"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => this.props.navigation.navigate('InvoiceDetails')}
        />
        <Notification
          system
          title="Invoice"
          reference="20792769"
          time="05/03/2021"
          body="LOT 97 - 105 CHELTENHAM...BEAU"
          done="Invoiced"
          price="1.200"
          iconName="email-852x"
          iconFamily="NowExtra"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => this.props.navigation.navigate('InvoiceDetails')}
        />
        <Notification
          system
          title="Invoice"
          reference="20792769"
          time="05/03/2021"
          body="LOT 97 - 105 CHELTENHAM...BEAU"
          done="Invoiced"
          price="1.200"
          iconName="email-852x"
          iconFamily="NowExtra"
          color={nowTheme.COLORS.TIME}
          style={styles.notificationStyle}
          onPress={() => this.props.navigation.navigate('InvoiceDetails')}
        />
      </Block>
    );
  };

  renderStatements = () => {
    return (
      <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND} >
        
        {this.renderArticles()}
      </Block>
    )
  }


  renderFilters = () => {
    return (
     
      <Block row space={'evenly'} width={'70%'} style={{ justifyContent: 'space-evenly', top:28, marginLeft: -width*0.29}}>
      <FilterButton
        text={'By Date'}
        icon={require('@assets/imgs/img/calendar.png')}
        //icon={<Ionicons name="calendar-outline" color={'#0E3A90'}  size={10} />}
      />
      <FilterButton
        text={'Last Month'}
      />
      <FilterButton
        text={'Overdue'}
      />
  </Block>
      
    )
  }

  render() {
    const { customStyleIndex } = this.state
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex card center shadow style={styles.category}>
            <ImageBackground
              source={{
                uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
              }}
            // source={require('@assets/imgs/Frame_main.png')}
              style={[
                styles.imageBlock,
                { width: width - theme.SIZES.BASE * 0.1, height: 162 }
              ]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 0.1,
                height: 162
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text color={nowTheme.COLORS.TIME} style={{ fontFamily: 'montserrat-bold', paddingLeft:0 }} size={14}>Current Balance</Text>
                <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE , paddingLeft:0, paddingRight:6}}>
                  <Text size={28} bold color={theme.COLORS.WHITE}>
                    $12,500.15
                  </Text>
                </Block>
                <Block row middle space="between" style={styles.bottomView}>
                  <Text size={14} bold color={theme.COLORS.WHITE} style={{left:0}}> Overdue Balance </Text>
                  <Text size={14} bold color={theme.COLORS.WHITE} style={{left:0}}> $1,500.00 </Text>
                </Block>
            </Block>
            </ImageBackground>
          </Block>
          <SegmentedControlTab
            values={['Statements', 'Invoices']}
            selectedIndex={customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderColor: 'transparent', borderBottomWidth: 2, borderBottomColor: '#D2D2D2' }}
            activeTabStyle={{ backgroundColor: nowTheme.COLORS.BACKGROUND, marginTop: 2, borderBottomWidth: 2, borderBottomColor: nowTheme.COLORS.INFO}}
            tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
            activeTabTextStyle={{ color: nowTheme.COLORS.INFO }}
          />
            {customStyleIndex === 0 && this.renderBalance()}
            {customStyleIndex === 1 && this.renderStatements()}
        </ScrollView>
        <ActionSheet ref={actionSheetRef} headerAlwaysVisible>
          <Block style={{height: 'auto', padding: 15, paddingBottom: 30}}>
              <Text style={{fontWeight: 'bold'}}>
                Payment via Credit Card
              </Text>
              <RNPickerSelect
                placeholder={{label: 'Select an option'}}
                textInputProps={{color: '#8898AA'}}
                style={{placeholder: styles.pickerText, viewContainer: styles.pickerContainer, inputAndroid: { color: nowTheme.COLORS.PICKERTEXT }}}
                onValueChange={(value) => console.log(value)}
                items={pickerOptions}
              />
              <Text style={{fontWeight: 'bold'}}>
                Amount
              </Text>
              <Input
                right
                color="black"
                style={styles.search}
                placeholder="$00,00"
                placeholderTextColor={'#8898AA'}
                // onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
              />
              <Block row style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
                <Text size={15}>
                  Your Balance
                </Text>
                <Text size={16} color={nowTheme.COLORS.INFO} style={{fontWeight: Platform.OS == 'android' ? 'bold' : '600'}}>
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
                  color='eeeee4'
                  textStyle={{ color:nowTheme.COLORS.LIGHTGRAY ,fontFamily: 'montserrat-bold', fontSize: 16 }}
                  style={styles.buttonGrayAS, styles.buttonAS}
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
    backgroundColor:'#e5e5e5'
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
    shadowOpacity: .1,
    elevation: 2
  },
  card: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop:20,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: .1,
    elevation: 2
  },
  cardHeader: {
    justifyContent:'center',
    height:'4%'
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 1,
  },
  bottomView: {
    padding:10.5,  position:'absolute', bottom:0, width:width, 
    backgroundColor: 'rgba(75, 106, 170, 0.5)',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0
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
    height:'9%'
  },
  notificationStyle: {
    marginBottom: 5, 
    width: width, 
    marginLeft: -15
  },
  statements: {
    marginLeft: 15
  },
  receiptText: {
    fontSize: 13,
    width: '60%',
    color: nowTheme.COLORS.SECONDARY
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    height: 45
  },
  pickerText:{
    color: nowTheme.COLORS.PICKERTEXT
  }
});

export default Home;
