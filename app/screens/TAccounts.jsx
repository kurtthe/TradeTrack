import React from 'react';
import { ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import { nowTheme } from '@constants';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListInvoices from '@custom-sections/ListInvoices';
import LiveBalance from '@custom-sections/LiveBalance';
import PaymentDetail from '@custom-elements/PaymentDetail';
import ListStatement from '@custom-sections/ListStatement';
import ListData from '@custom-sections/ListData';
import Balance from '@custom-sections/Balance';
import Tabs from '@custom-elements/Tabs';

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

  renderAccountDetails = () => (
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

  renderInvoices = () => (
    <Block flex backgroundColor={nowTheme.COLORS.BACKGROUND}>
      <ListData
        filters={true}
        endpoint={endPoints.searchInvoices}
        children={<ListInvoices data={this.props.invoices} title={false} backAccount={true} />}
      />
    </Block>
  );

  render() {
    return (
        <ScrollView>
          <LiveBalance />
          <Tabs
            optionsTabsRender={[
              {
                labelTab: 'Statements',
                component: this.renderAccountDetails(),
              },
              {
                labelTab: 'Transactions',
                component: this.renderInvoices(),
              },
            ]}
            tabIndexSelected={this.state.customStyleIndex}
            changeIndexSelected={(index)=>this.setState({customStyleIndex: index})}
          />
        </ScrollView>
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

