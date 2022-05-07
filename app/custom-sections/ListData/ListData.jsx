import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'galio-framework';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';
import { Filters, FilterProducts } from './components';
import { makeStyles } from './ListData.styles'
import nowTheme from '@constants/Theme';
import { serializeData } from '@core/utils/serializeData'
import LoadingComponent from '@custom-elements/Loading';

const ListData = ({
  perPage,
  endpoint,
  actionData,
  filters,
  hideFilterType,
  renderItems,
  numColumns,
  typeData
}) => {
  const [dataPetition, setDataPetition] = useState([]);
  const [perPageData] = useState(perPage || 12);
  const [valuesFilters, setValuesFilters] = useState({});
  const [loadingMoreData, setLoadingMoreData] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [urlPetition, setUrlPetition] = useState(endpoint || undefined);
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

  useEffect(() => {
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
    getPetitionData()
  }, [urlPetition, page])

  const handleLoadMore = () => {
    setPage(page + 1)
  };

  const getValuesFilters = (values) => {
    setValuesFilters(values);
  };

  useEffect(() => {
    const setParamsEndPoint = async () => {
      const includeParamUrl = endpoint.includes('?');
      let linkPetition = `${endpoint}${includeParamUrl ? '&' : '?'}`;

      Object.keys(valuesFilters).forEach((item) => {
        linkPetition += `${item}=${valuesFilters[item]}&`;
      });

      setUrlPetition(linkPetition)
    };
    setParamsEndPoint()
  }, [valuesFilters])


  const renderFilter = () => {
    if (!filters) {
      return null;
    }

    if (filters === 'products') {
      return (
        <FilterProducts
          getProducts={(data, dataFilter) => null}
        />
      );
    }

    return <Filters
      getValues={(values) => getValuesFilters(values)}
      hideFilterType={hideFilterType}
    />;
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
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View>{renderFilter()}</View>
      <FlatList
        data={dataPetition}
        renderItem={({ item, index }) => renderItems({ item, index })}
        keyExtractor={({ item, index }) => `${index}-list-${item?.sku}-${item?.id}`}
        ListEmptyComponent={renderNotFound}
        numColumns={numColumns}
        ListFooterComponent={putLoadingMore}
      />
    </View>
  );
}


export default ListData;
