import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'galio-framework';
import { Filters } from './components';
import { makeStyles } from './ListTransactions.styles'
import nowTheme from '@constants/Theme';
import Invoice from '@custom-elements/Invoice';
import { getTransaction } from '@core/hooks/Transactions/transaction.service'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';

export const ListTransactions = () => {
  const [dataTransactions, setDataTransaction] = useState([])
  const [transactions, setTransaction] = useState({})

  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const [keeData, setKeepData] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [valuesFilters, setValuesFilters] = useState({});
  const styles = makeStyles();

  const [optionsTransactions, setOptionsTransactions] = useState({
    page: 1,
  });


  const fetchData = async ()=> {
    const response = await getTransaction({...optionsTransactions.page, ...valuesFilters})
    setTransaction(response)
  }

  useEffect(() => {
    setIsLoading(true)
    setLoadingMoreData(true)
    fetchData()
  }, [optionsTransactions.page, valuesFilters])


  const handleLoadingMore = () => {
    const { page } = optionsTransactions;
    setOptionsTransactions({
      ...optionsProducts,
      page: page + 1
    });
    setKeepData(true)
  }

  useEffect(() => {
    if (transactions?.headers && transactions?.headers['x-pagination-page-count']) {
      const currentlyTotal = parseInt(optionsTransactions.page)
      const newTotalPages = parseInt(transactions?.headers['x-pagination-page-count'])

      setShowLoadingMore(currentlyTotal < newTotalPages)
    }
  }, [transactions?.headers, optionsTransactions.page])

  const getValuesFilters = (values) => {
    setValuesFilters(values);
  };

  const updateListTransactions = (newTransactions) => {
    if (keeData) {
      setDataTransaction([...dataTransactions, ...newTransactions])
      return
    }

    setDataTransaction(newTransactions)
    setLoadingMoreData(false)
    setIsLoading(false)
  }

  useEffect(() => {
    updateListTransactions(transactions?.body)
  }, [transactions?.body])

  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          No results found for search options selected.
        </Text>
      </View>
    );
  };

  const renderTransactions = ({ item }) => (
    <Invoice invoice={item} isAccount={true} />
  )

  const getButtonLoadingMore = () => {
    if (showLoadingMore) {
      return <ButtonLoadingMore
        loading={loadingMoreData}
        handleLoadMore={handleLoadingMore}
      />
    }
    return null
  }

  const memoizedTransactions = useMemo(() => renderTransactions, [dataTransactions, valuesFilters])

  return (
    <View style={styles.container}>
      <Filters
        getValues={(values) => getValuesFilters(values)}
      />
      {isLoading && (
        <View style={styles.contentLoading}>
          <LoadingComponent size='large' />
        </View>
      )
      }
      <FlatList
        data={dataTransactions}
        renderItem={memoizedTransactions}
        keyExtractor={(item, index) => `${index}-transaction-${item?.id}`}
        ListEmptyComponent={renderNotFound}
        ListFooterComponent={getButtonLoadingMore}
      />
    </View>
  );
}

