import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '@components';
import articles from '@constants/articles';
import { Notification } from '@components';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';

import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import { getBalance } from '@core/module/store/balance/liveBalance';
import { getInvoices } from '@core/module/store/balance/invoices';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    this.getDataPetition(endPoints.burdensBalance, this.props.getBalance);
    // this.getDataPetition(endPoints.invoices, this.props.getInvoices);
  }

  async getDataPetition(endpoint, action = false) {
    const response = await this.generalRequest.get(endpoint, {
      headers: { 'ttrak-key': this.props.token_login },
    });
    action && action(response);
    return response;
  }

  putInvoices = ()=>{
    if(this.props.invoices.length === 0) {
      return (
        <Block>
          <Text>Not invoices</Text>
        </Block>
      )
    }

    return this.props.invoices.map((item, index)=>(
      <Notification
        key={index}
        system
        title="Invoice"
        reference={item.order_number}
        time={item.created_date}
        body={item.description}
        done={item.status}
        price={item.total_amount}
        iconName="email-852x"
        iconFamily="NowExtra"
        color={nowTheme.COLORS.TIME}
        style={{ marginBottom: 2 }}
        onPress={() => this.props.navigation.navigate('InvoiceDetails')}
      />
    ));
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <Block flex card center shadow style={styles.category}>
            <ImageBackground
              source={{
                uri: 'https://live.staticflickr.com/65535/51227105003_e18d28b6ce_c.jpg',
              }}
              style={[styles.imageBlock, { width: width - theme.SIZES.BASE * 0.1, height: 162 }]}
              imageStyle={{
                width: width - theme.SIZES.BASE * 0.1,
                height: 162,
              }}
            >
              <Block style={styles.categoryTitle}>
                <Text
                  color={nowTheme.COLORS.TIME}
                  style={{ fontFamily: 'montserrat-bold', paddingLeft: 0 }}
                  size={14}
                >
                  Current Balance
                </Text>
                <Block
                  row
                  middle
                  space="between"
                  style={{ marginBottom: theme.SIZES.BASE, paddingLeft: 0, paddingRight: 6 }}
                >
                  <Text size={28} bold color={theme.COLORS.WHITE}>
                    ${this.props.liveBalance.current}
                  </Text>

                  <TouchableOpacity
                    style={{ backgroundColor: '#4D76C8', padding: 5, borderRadius: 7 }}
                    onPress={() => navigation.navigate('Account')}
                  >
                    <MaterialIcons name="request-quote" color={theme.COLORS.WHITE} size={32} />
                  </TouchableOpacity>
                </Block>
                <Block row middle space="between" style={styles.bottomView}>
                  <Text size={14} bold color={theme.COLORS.WHITE} style={{ left: 0 }}>
                    {' '}
                    Overdue Balance{' '}
                  </Text>
                  <Text size={14} bold color={theme.COLORS.WHITE} style={{ left: 0 }}>
                    {' '}
                    ${this.props.liveBalance.overdue}{' '}
                  </Text>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block style={styles.cardHeader}>
            <Block
              row
              middle
              space="between"
              style={{ paddingLeft: 15, marginTop: 40, height: 20 }}
            >
              <Text size={18} style={{ fontFamily: 'montserrat-bold' }} color={'#363C4A'}>
                Invoices
              </Text>
              <Text
                size={15}
                style={{ fontFamily: 'montserrat-regular', right: 15 }}
                color={nowTheme.COLORS.HEADER}
              >
                See all
              </Text>
            </Block>
          </Block>

          <Block style={styles.card}>
            {this.putInvoices()}
          </Block>

          <Block style={styles.cardHeader}>
            <Block row middle space="between" style={{ paddingLeft: 15, marginTop: 5 }}>
              <Text
                size={18}
                style={{ fontFamily: 'montserrat-bold' }}
                color={nowTheme.COLORS.BLACK}
              >
                Burden News
              </Text>
              <Text
                size={15}
                style={{ fontFamily: 'montserrat-regular', right: 15 }}
                color={nowTheme.COLORS.HEADER}
              >
                See all
              </Text>
            </Block>
          </Block>
          <Block flex>
            <ScrollView horizontal={true} style={{ bottom: 10 }}>
              <Block flex row>
                <Card
                  item={articles[1]}
                  style={{ width: 250, marginLeft: 15 }}
                  ctaColor={'#B6584E'}
                />
                <Card
                  item={articles[2]}
                  style={{ width: 250, marginLeft: 20 }}
                  ctaColor={'#B6584E'}
                />
              </Block>
            </ScrollView>
            <Block center style={{ paddingVertical: 5 }}>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.button}
              >
                Store Finder
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </Block>
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
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 0,
    fontFamily: 'montserrat-regular',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    top: 5,
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
    marginVertical: -15,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
});
const mapStateToProps = (state) => ({
  liveBalance: state.liveBalanceReducer,
  token_login: state.loginReducer.api_key,
  invoices: state.invoicesReducer.invoices,
});

const mapDispatchToProps = { getBalance, getInvoices };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
