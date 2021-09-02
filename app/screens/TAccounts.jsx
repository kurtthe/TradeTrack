import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Block } from 'galio-framework';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { nowTheme } from '@constants';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListInvoices from '@custom-sections/ListInvoices';
import LiveBalance from '@custom-sections/LiveBalance';
import PaymentDetail from '@custom-elements/PaymentDetail';
import ListStatement from '@custom-sections/ListStatement';
import ListData from '@custom-sections/ListData';
import Balance from '@custom-sections/Balance';

import { getStatements } from '@core/module/store/statements/statements';
import { getBalance } from '@core/module/store/balance/liveBalance';

import { connect } from 'react-redux';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customStyleIndex: 0,
    };
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    if (!!this.props.route.params) {
      this.setState({
        customStyleIndex: this.props.route.params.tabIndexSelected,
      });
    }
    await this.getDataPetition.getInfo(endPoints.burdensBalance, this.props.getBalance);
  }

  handleCustomIndexSelect = (index) => {
    this.setState((prevState) => ({ ...prevState, customStyleIndex: index }));
  };

  renderAccountDetails = () => {
    return (
      <>
        <PaymentDetail />
        <Balance />

          <ListData
            endpoint={endPoints.statements}
            children={<ListStatement />}
            actionData={this.props.getStatements}
          />
      </>
    );
  };

  renderInvoices = () => {
    return (
      <Block flex backgroundColor={nowTheme.COLORS.BACKGROUND} style={{ top: 12 }}>
        <Block flex center>
          <ListInvoices data={this.props.invoices} title={false} />
        </Block>
      </Block>
    );
  };

  render() {
    const { customStyleIndex, radioButtonsData } = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          <LiveBalance />
          <Block style={{ top: 10 }}>
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
          {customStyleIndex === 0 && this.renderAccountDetails()}
          {customStyleIndex === 1 && this.renderInvoices()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  statements: state.statementsReducer.statements,
  invoices: state.invoicesReducer.invoices,
  liveBalance: state.liveBalanceReducer,
});

const mapDispatchToProps = { getStatements, getBalance };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
