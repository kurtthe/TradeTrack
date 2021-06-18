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
              <Text color={nowTheme.COLORS.TIME} style={{ fontFamily: 'montserrat-bold', paddingLeft:6 }} size={14}>Current Balance</Text>
              <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE , paddingLeft:6, paddingRight:6}}>
                <Text size={28} bold color={theme.COLORS.WHITE}>
                  $12,500.15
                </Text>
                <View style={{backgroundColor:'#4D76C8', padding:5, borderRadius:7}}>
                  <MaterialIcons name="request-quote" color={theme.COLORS.WHITE} size={32} />
                </View>
              </Block>
              <Block row middle space="between" style={styles.bottomView}>
                <Text size={14} bold color={theme.COLORS.WHITE}> Overdue Balance </Text>
                <Text size={14} bold color={theme.COLORS.WHITE}> $1,500.00 </Text>
              </Block>
            </Block>
            </ImageBackground>
          </Block>
          <Block style={styles.cardHeader}>
            <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
              <Text
                size={18}
                style={{ fontFamily: "montserrat-regular" }}
                color={nowTheme.COLORS.BLACK}
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
            <Block>
              <Notification
                system
                title="Invoice"
                reference="REF 20792769"
                time="05/03/2021"
                body="LOT 97 - 105 CHELTENHAM...BEAU"
                done="Invoiced"
                price="1.200"
                iconName="email-852x"
                iconFamily="NowExtra"
                color={nowTheme.COLORS.TIME}
                style={{ marginBottom: 5,  }}
              />
              <Notification
                system
                title="Invoice"
                reference="REF 20792769"
                time="05/03/2021"
                body="LOT 97 - 105 CHELTENHAM...BEAU"
                done="Invoiced"
                price="1.200"
                iconName="email-852x"
                iconFamily="NowExtra"
                color={nowTheme.COLORS.TIME}
                style={{ marginBottom: 5,  }}
              />
              <Notification
                system
                title="Invoice"
                reference="REF 20792769"
                time="05/03/2021"
                body="LOT 97 - 105 CHELTENHAM...BEAU"
                done="Invoiced"
                price="1.200"
                iconName="email-852x"
                iconFamily="NowExtra"
                color={nowTheme.COLORS.TIME}
                style={{ marginBottom: 5,  }}
              />
              <Notification
                system
                title="Invoice"
                reference="REF 20792769"
                time="05/03/2021"
                body="LOT 97 - 105 CHELTENHAM...BEAU"
                done="Invoiced"
                price="1.200"
                iconName="email-852x"
                iconFamily="NowExtra"
                color={nowTheme.COLORS.TIME}
                style={{ marginBottom: 5,  }}
              />
            </Block>
          </Block>
          <Block style={styles.cardHeader}>
            <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
              <Text
                size={18}
                style={{ fontFamily: "montserrat-regular" }}
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
        <Block flex>
          <ScrollView  horizontal={true} >
            <Block flex row>
              <Card
                item={articles[1]}
                style={{ width:300, marginRight: theme.SIZES.BASE }}
                ctaColor={'#B6584E'}
              />
              <Card 
                item={articles[2]}
                style={{ width:300, marginRight: theme.SIZES.BASE }}
                ctaColor={'#B6584E'}
              />
            </Block>
          </ScrollView>
            <Block center>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
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
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },
  card: {
    width: '100%',
    backgroundColor: nowTheme.COLORS.WHITE,
    marginTop: 10,
    borderRadius: 3,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: .1,
    elevation: 2
  },
  cardHeader: {
    paddingTop: 30,
    paddingBottom: 0, 
    paddingLeft: 10
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 1,
  },
  bottomView: {
    padding:10,  position:'absolute', bottom:0, width:width, 
    backgroundColor: 'rgba(75, 106, 170, 0.5)',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: -15,
    borderWidth: 0
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
});

export default Home;
