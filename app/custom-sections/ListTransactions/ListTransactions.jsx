import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'galio-framework';
import { Filters } from './components';
import { makeStyles } from './ListTransactions.styles'
import nowTheme from '@constants/Theme';
import Invoice from '@custom-elements/Invoice';
import { useGetTransactions } from '@core/hooks/Transactions'
import ButtonLoadingMore from '@custom-elements/ButtonLoadingMore'
import LoadingComponent from '@custom-elements/Loading';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTransactions,
  nextPage,
  getAllPages,
  reset
} from '@core/module/store/filter/transactionFilter';

export const ListTransactions = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.transactionFilter.page)
  const dataTransactions = useSelector((state) => state.transactionFilter.transactions)

  const [loadingMoreData, setLoadingMoreData] = useState(false)
  const [showLoadingMore, setShowLoadingMore] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [clear, setClear] = useState(true)
  const [valuesFilters, setValuesFilters] = useState({});
  const styles = makeStyles();

  const { data: transactions, refetch } = useGetTransactions({ ...valuesFilters, page })

  useEffect(() => {
    setIsLoading(true)
    setLoadingMoreData(true)
    refetch()
  }, [page, valuesFilters])


  const handleLoadingMore = () => {
    dispatch(nextPage())
  }

  useEffect(() => {
    if (transactions?.headers && transactions?.headers['x-pagination-page-count']) {
      const currentlyTotal = parseInt(page)
      const newTotalPages = parseInt(transactions?.headers['x-pagination-page-count'])

      setShowLoadingMore(currentlyTotal < newTotalPages)

      if (currentlyTotal !== newTotalPages) {
        dispatch(getAllPages(newTotalPages))
      }
    }
  }, [transactions?.headers, page])

  const getValuesFilters = (values) => {
    setValuesFilters(values);
  };

  const updateListTransactions = (newTransactions) => {
    dispatch(getTransactions(newTransactions))
    setLoadingMoreData(false)
    setIsLoading(false)
    setClear(false)
  }

  useEffect(() => {
    updateListTransactions(transactions?.body)
  }, [transactions?.body])

  useEffect(() => {
    return () => {
      setClear(true)
      dispatch(reset())
    }
  }, [])

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

  if (clear) {
    return (
      <View style={styles.container}>
        <View style={styles.contentLoading}>
          <LoadingComponent size='large' />
        </View>
      </View>
    )
  }

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

