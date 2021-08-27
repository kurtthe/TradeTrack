import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants/';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import FilterButton from '@components/FilterButton';
import ListInvoices from '@custom-sections/ListInvoices';
import { Button } from '@components';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class Allinvoice extends React.Component {
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

  renderFilters = () => {
    return (
      <Block
        row
        center
        space={'evenly'}
        width={'85%'}
        style={{ justifyContent: 'space-evenly', marginLeft: '-3%', padding: 8 }}
      >
        <FilterButton
          text={'By Date'}
          icon={require('@assets/imgs/img/calendar.png')}

          //icon={<Ionicons name="calendar-outline" color={'#0E3A90'}  size={10} />}
        />
        <FilterButton text={'Last Month'} />
        <FilterButton text={'Filter For Type'} />
      </Block>
    );
  };

  render() {
    return (
      <View style={styles.cart}>
        <Block
          center
          style={styles.newStatementsTitle}
          paddingTop={30}
          paddingBottom={50}
          marginBottom={5}
        >
          {this.renderFilters()}
        </Block>
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
            <Block center style={{ paddingVertical: 45 }}></Block>
          </Block>
        </ScrollView>
      </View>
    );

    // return(
    //   <SkeletonInvoiceDetail/>
    // )
  }
}

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    padding: 15,
    marginLeft: -15,
    width: width,
    height: '9%',
  },
  card: {
    marginTop: 0,
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    top: 5,
  },
});

const mapStateToProps = (state) => ({
  token_login: state.loginReducer.api_key,
  invoices: state.invoicesReducer.invoices,
});

export default connect(mapStateToProps)(Allinvoice);
