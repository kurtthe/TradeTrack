import React from "react";
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
import { Notification } from "../components";
import { nowTheme, Images } from "../constants";
import {  MaterialIcons } from "@expo/vector-icons";


const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
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
                <View style={{backgroundColor:'#4D76C8', padding:5, borderRadius:7}}>
                  <MaterialIcons name="request-quote" color={theme.COLORS.WHITE} size={32} />
                </View>
              </Block>
              <Block row middle space="between" style={styles.bottomView}>
                <Text size={14} bold color={theme.COLORS.WHITE} style={{left:0}}> Overdue Balance </Text>
                <Text size={14} bold color={theme.COLORS.WHITE} style={{left:0}}> $1,500.00 </Text>
              </Block>
            </Block>
            </ImageBackground>
          </Block>
          <Block style={styles.cardHeader}>
            <Block row middle space="between" style={{ paddingLeft:15, marginTop:40, height:20, }}>
              <Text
                size={18}
                style={{ fontFamily: "montserrat-bold" ,}}
                color={'#363C4A'}
              >
                Invoices
              </Text>
              <Text
                size={15}
                style={{ fontFamily: "montserrat-regular", right:15 }}
                color={nowTheme.COLORS.HEADER}
              >
                See all
              </Text>
            </Block>
          </Block>
          <Block style={styles.card}>
            <Block >
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
                style={{ marginBottom: 2,  }}
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
                style={{ marginBottom: 5 }}
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
                style={{ marginBottom: 5,  }}
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
                style={{ marginBottom: 5,  }}
                onPress={() => this.props.navigation.navigate('InvoiceDetails')}
              />
            </Block>
          </Block>
          <Block style={styles.cardHeader}>
          <Block row middle space="between" style={{ paddingLeft:15, marginTop:5}}>
              <Text
                size={18}
                style={{ fontFamily: "montserrat-bold" }}
                color={nowTheme.COLORS.BLACK}
              >
              Burden News
              </Text>
              <Text
                size={15}
                style={{ fontFamily: "montserrat-regular", right:15 }}
                color={nowTheme.COLORS.HEADER}
              >
              See all
              </Text>
            </Block>
          </Block>
        <Block flex style={{bottom:10}} >
          <ScrollView  horizontal={true} >
            <Block flex row >

              <Card
              item={articles[1]}
              style={{ width:250, marginLeft: 15 }}
            ctaColor={'#B6584E'}
            />
            <Card item={articles[2]}
             style={{ width:250, marginLeft: 20 }}
             ctaColor={'#B6584E'}
            />
            
            </Block>
          </ScrollView>
            <Block center style={{padding:20}}>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, }}
                style={styles.button}
              >
                Find our Store
              </Button>
            </Block>
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
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
    width: '100%',
    height:'auto',
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
    marginVertical: -15,
    borderWidth: 0
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
});

export default Home;
