import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'galio-framework';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';
import { makeStyles } from './ListData.styles'
import nowTheme from '@constants/Theme';
import { serializeData } from '@core/utils/serializeData'
import LoadingComponent from '@custom-elements/Loading';

const ListData = ({
  perPage,
  endpoint,
  actionData,
  renderItems,
  numColumns,
  typeData,
}) => {
  const [dataPetition, setDataPetition] = useState([]);
  const [perPageData] = useState(perPage || 12);
  const [loadingMoreData, setLoadingMoreData] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [urlPetition, setUrlPetition] = useState(undefined);
  const [getDataPetition] = useState(GetDataPetitionService.getInstance());
  const styles = makeStyles();

  const loadData = (data) => {

    const currentData = dataPetition;
    const newData = serializeData[typeData]([...currentData, ...data.body])

    setDataPetition(newData);
    setPage(parseInt(data.headers['x-pagination-current-page']) || 1)
    setTotalPages(parseInt(data.headers['x-pagination-page-count']) || 2);
    setLoadingMoreData(false)
    setShowLoadMore(newData.length > 5)
    loading && setLoading(false)

    actionData && actionData(data.body);
  };

  const getPetitionData = async () => {
    if (urlPetition === undefined) {
      return
    }

    await getDataPetition.getInfoWithHeaders(
      urlPetition,
      loadData,
      page,
      perPageData,
    );
  };

  useEffect(() => {
    page > 1 && setLoadingMoreData(true)
    getPetitionData()
  }, [urlPetition, page])

  useEffect(() => {
    const updateEndPoint = () => setUrlPetition(endpoint);
    updateEndPoint()
  }, [endpoint])

  const handleLoadMore = () => {
    setPage(page + 1)
  };


  const renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          No results found for search options selected.
        </Text>
      </View>
    );
  };

  const putLoadingMore = () => {
    if (!showLoadMore || page === totalPages) {
      return null;
    }

    return (
      <View style={styles.contentButton}>
        <Button
          onPress={() => handleLoadMore()}
          color="info"
          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
          style={styles.button}
          loading={loadingMoreData}
          disabled={loadingMoreData}
        >
          Load More...
        </Button>
      </View>
    );
  };

  if (loading) {
    return <View style={{padding: 20}}>
      <LoadingComponent />
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataPetition}
        renderItem={({ item, index }) => renderItems({ item, index })}
        keyExtractor={({ item, index }) => `${index}-list-${item?.sku}-${item?.id}`}
        ListEmptyComponent={renderNotFound}
        numColumns={numColumns}
        ListFooterComponent={putLoadingMore}
        columnWrapperStyle={numColumns > 2 && styles.listItems}
      />
    </View>
  );
}


export default ListData;
