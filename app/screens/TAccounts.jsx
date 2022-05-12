import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native';
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
import { getInvoices } from '@core/module/store/balance/invoices';
import Invoice from '@custom-elements/Invoice';
import Statement from '@custom-elements/Statement';

import { connect } from 'react-redux';
import {STATEMENTS,INVOICES} from '@shared/dictionaries/typeDataSerialize'

const Account = ({ route, getBalance, getStatements, getInvoices }) => {

  const [customStyleIndex, setCustomStyleIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [company, setCompany] = useState("")
  const [getDataPetition] = useState(GetDataPetitionService.getInstance())

  useEffect(() => {

    const initServices = async () => {
      setCustomStyleIndex(route.params?.tabIndexSelected || 0)
      const dataHeader = await getDataPetition.getInfoWithHeaders(endPoints.burdensBalance, getBalance);
      setCompany(dataHeader.headers['tradetrak-company'])
    }
    initServices()
  }, [])


  const fetchData = async () => {
    await getDataPetition.getInfo(endPoints.statements, getStatements);
    await getDataPetition.getInfo(endPoints.invoices, getInvoices);
  }

  const _onRefresh = () => {
    setRefreshing(true)
    fetchData().then(() => {
      setRefreshing(false)
    });
  }

  const renderItemsStatement = ({ item }) => (
    <Statement
      statement={item}
    />
  )

  const renderAccountDetails = () => (
    <>
      <PaymentDetail />
      <Balance />

      <ListData
        endpoint={endPoints.statements}
        renderItems={renderItemsStatement}
        actionData={getStatements}
        typeData={STATEMENTS}
      />
    </>
  );

  const renderItemsInvoices = ({ item }) => (
    <Invoice invoice={item} isAccount={true} />
  )

  const renderInvoices = () => (
    <ListData
      filters={true}
      endpoint={endPoints.searchInvoices}
      renderItems={renderItemsInvoices}
      typeData={INVOICES}
    />
  );

  return (
    <ScrollView>
      <LiveBalance />
      <Tabs
        optionsTabsRender={[
          {
            labelTab: 'Statements',
            component: renderAccountDetails(),
          },
          {
            labelTab: 'Transactions',
            component: renderInvoices(),
          },
        ]}
        tabIndexSelected={customStyleIndex}
        changeIndexSelected={(index) => setCustomStyleIndex(index)}
      />
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  statements: state.statementsReducer.statements,
  invoices: state.invoicesReducer.invoices,
  liveBalance: state.liveBalanceReducer,
});

const mapDispatchToProps = { getStatements, getBalance, getInvoices };

export default connect(mapStateToProps, mapDispatchToProps)(Account);

