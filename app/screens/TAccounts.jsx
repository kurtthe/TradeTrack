import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

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
import { GeneralRequestService } from '@core/services/general-request.service';
import Restricted from '@custom-elements/Restricted';
import { useSelector } from 'react-redux'

const generalRequestService = GeneralRequestService.getInstance();

const TAccount = ({ route }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.liveBalanceReducer);
  
  const [customStyleIndex, setCustomStyleIndex] = useState(0)
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    const initServices = async () => {
      setCustomStyleIndex(route.params?.tabIndexSelected || 0)
    }
    initServices()
  }, [])

  useEffect(async () => {
    const response = await generalRequestService.get(endPoints.statements);
    if(response.restricted) {
      setRestricted(true)
      setCustomStyleIndex(1)
    }
  }, [])

  const renderItemsStatement = ({ item }) => (
    <Statement
      statement={item}
    />
  )

  const renderAccountDetails = () => (
    <> 
      {restricted && balance.restricted ?
        <Restricted horizontal /> : 
        <>
          <PaymentDetail />
          <Balance />
          {restricted ?
              <Restricted horizontal /> : 
            <ListData
              endpoint={endPoints.statements}
              renderItems={renderItemsStatement}
              actionData={(data) => dispatch(getStatements(data))}
              typeData={STATEMENTS}
            />
          }
        </>
      }
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

