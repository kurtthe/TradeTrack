import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Button } from '@components';
import ListInvoices from '@custom-sections/ListInvoices';
import ListNews from '@custom-sections/ListNews';
import LiveBalance from '@custom-sections/LiveBalance';

import { nowTheme } from '@constants';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';

import { endPoints } from '@shared/dictionaries/end-points';
import { getBalance } from '@core/module/store/balance/liveBalance';
import { getInvoices } from '@core/module/store/balance/invoices';
import { getNews } from '@core/module/store/news/news';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    await this.getDataPetition.getInfo(endPoints.burdensBalance, this.props.getBalance);
    await this.getDataPetition.getInfo(endPoints.invoices, this.props.getInvoices);
    await this.getDataPetition.getInfo(endPoints.news, this.props.getNews);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex center style={styles.home}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
          <LiveBalance button={true} />
          <ListInvoices data={this.props.invoices} title={true} />
          
          <Block style={styles.cardHeader}>
            <Block row middle space="between" style={{ paddingLeft: 15, marginTop: 5 }}>
              <Text
                size={18}
                style={{ fontFamily: 'montserrat-bold' }}
                color={'#363C4A'}
              >
                Burden News
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('AllNews')}>
                <Text
                  size={15}
                  style={{ fontFamily: 'montserrat-regular', right: 15 }}
                  color={nowTheme.COLORS.HEADER}
                >
                  See all
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex>
            <ListNews news={this.props.news} />
            <Block center style={{ paddingVertical: 5 }}>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.button}
                onPress={() => navigation.navigate('Store')}
              >
                Store Finder
              </Button>
            </Block>
            <Block center style={{ paddingVertical: 30 }}>
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
   
    paddingHorizontal: 0,
    fontFamily: 'montserrat-regular',
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    top: -15,
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
  invoices: state.invoicesReducer.invoices,
  news: state.newsReducer.news,
});

const mapDispatchToProps = { getBalance, getInvoices, getNews };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
