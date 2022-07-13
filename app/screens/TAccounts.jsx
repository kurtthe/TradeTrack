import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import LiveBalance from '@custom-sections/LiveBalance';
import PaymentDetail from '@custom-elements/PaymentDetail';
import ListData from '@custom-sections/ListData';
import Balance from '@custom-sections/Balance';
import Tabs from '@custom-elements/Tabs';

import { getStatements } from '@core/module/store/statements/statements';
import Statement from '@custom-elements/Statement';

import { STATEMENTS } from '@shared/dictionaries/typeDataSerialize'
import ListTransactions from '@custom-sections/ListTransactions'
import { useDispatch } from 'react-redux';

const TAccount = ({ route }) => {
  const dispatch = useDispatch();

  const [customStyleIndex, setCustomStyleIndex] = useState(0)
  const [getDataPetition] = useState(GetDataPetitionService.getInstance())


  const fetchData = async () => {
    await getDataPetition.getInfo(endPoints.statements, dispatch(getStatements));
  }

  useEffect(() => {
    const initServices = async () => {
      setCustomStyleIndex(route.params?.tabIndexSelected || 0)
      fetchData()
    }
    initServices()
  }, [])

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


  const renderInvoices = () => (
    <ListTransactions />
  );

  return (
    <ScrollView>
      <LiveBalance company={false} />
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

export default TAccount

