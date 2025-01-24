import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {useGetOrders} from '@core/hooks/Cart';
import NotFound from '@custom-sections/NotFound';
import LoadingComponent from '@custom-elements/Loading';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button} from '@components';
import {theme} from 'galio-framework';
import Order from '@custom-elements/Order';

const {width} = Dimensions.get('screen');

const ListOrders = () => {
  const [page, setPage] = React.useState(1);
  const [dataPetition, setDataPetition] = React.useState([]);
  const [loadingMoreData, setLoadingMoreData] = React.useState(true);

  const {
    data: ordersResponse,
    isFetching,
    isLoading,
    refetch,
  } = useGetOrders(page);

  React.useEffect(() => {
    if (!ordersResponse) return;

    setLoadingMoreData(ordersResponse.loadMore);

    if (page > 1) {
      setDataPetition([...dataPetition, ...ordersResponse.templates]);
      return;
    }
    setDataPetition(ordersResponse.templates);
  }, [ordersResponse]);

  if (isLoading) {
    return (
      <View style={{padding: 20}}>
        <LoadingComponent />
      </View>
    );
  }

  const putLoadingMore = () => {
    if (!loadingMoreData || dataPetition.length === 0) {
      return null;
    }

    return (
      <View style={styles.contentButton}>
        <Button
          onPress={() => {
            setPage(page + 1);
            setTimeout(() => refetch(), 200);
          }}
          color="info"
          textStyle={{fontFamily: 'montserrat-bold', fontSize: 16}}
          style={styles.button}
          loading={isFetching}
          disabled={!loadingMoreData}>
          Load More...
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isFetching}
        onRefresh={() => refetch()}
        data={dataPetition}
        renderItem={({item}) => <Order item={item} />}
        keyExtractor={({item, index}) =>
          `order-${item ? item.id : Math.random()}_${index}`
        }
        ListEmptyComponent={<NotFound />}
        ListFooterComponent={putLoadingMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    height: hp('70%'),
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
});
export default ListOrders;
