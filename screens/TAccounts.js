import React from "react";
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground } from "react-native";
import { Block, theme, Text } from "galio-framework";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Card, Button } from "../components";
import { Notification } from "../components";
import { nowTheme, Images } from "../constants";
import {  MaterialIcons } from "@expo/vector-icons";
import GrayLine from "../components/GrayLine";
import FilterButton from "../components/FilterButton";

const { width } = Dimensions.get("screen");

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
        <Block keyExtractor={(i) => {index: i}} row style={{ justifyContent: 'space-between', paddingBottom: 7}}>
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
    return (
        <Block style={{ padding: theme.SIZES.BASE }}>
          <Text style={{paddingBottom: 15}} size={16}>Payment Details</Text>
          <Block row style={{paddingBottom: 15}}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>BSB</Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>O83-125</Text>
            </Block>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Account
              </Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>04-8284743</Text>
            </Block>
          </Block>
          <Block row style={{paddingBottom: 15}}>
            <Block flex>
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>Reference</Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>O83-125</Text>
            </Block>
            <Block flex >
              <Text color={nowTheme.COLORS.LIGHTGRAY} style={styles.priceGrayText}>
                Period Ending
              </Text>
              <Text size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 14 :16) :  (Dimensions.get('window').height < 870) ? 14: 16}>04-8284743</Text>
            </Block>
          </Block>
          <Block row style={{justifyContent: 'center'}}>
            <Button
              color="info"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
              style={styles.button}
              onPress={() => navigation.navigate("OrderPlaced")}
            >
              Pay via Credit Card
            </Button>
          </Block>
          <GrayLine/>

          <Block>
            <View style={styles.detailOrders}>
              <Text style={{ fontWeight: 'bold', fontSize: 16}}>
                Balance Details
              </Text>
            </View>
            {this.renderDetailOrdersAS()}
            <GrayLine/>
            <Block row style={{ justifyContent: 'space-between', top:10, borderWidth: 1}}>
              <Text size={14}>
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
              New Statements
            </Text>
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
        />
      </Block>
    );
  };

  renderStatements = () => {
    return (
      <Block>
        <Block width={width} style={{ alignItems: 'center', paddingVertical: 8, marginBottom: -5 }}>
          <Block row space={'evenly'} width={'70%'} style={{ justifyContent: 'space-evenly', marginLeft: -width*0.30}}>
              <FilterButton
                text={'By Date'}
                //icon={require('../assets/nuk-icons/png/2x/calendar-60@2x.png')}
              />
              <FilterButton
                text={'Last Month'}
              />
              <FilterButton
                text={'Overdue'}
              />
          </Block>
        </Block>
        {this.renderArticles()}
      </Block>
    )
  }

  render() {
    const { customStyleIndex } = this.state
    return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex card center shadow style={styles.category}>
            <ImageBackground
              source={{
                uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
              }}
            // source={require('../assets/imgs/Frame_main.png')}
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
            values={['Balance', 'Statements']}
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
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 0,
    fontFamily: 'montserrat-regular',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
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
    padding: 10,
    marginLeft: -15,
    width: width
  },
  notificationStyle: {
    marginBottom: 5, 
    width: width, 
    marginLeft: -15
  },
  statements: {
    marginLeft: 15
  }
});

export default Home;
