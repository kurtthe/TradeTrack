import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {useGetTemplates} from '@core/hooks/Cart';
import NotFound from '@custom-sections/NotFound';
import LoadingComponent from '@custom-elements/Loading';
import TemplateOrder from '@custom-elements/TemplateOrder';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button} from '@components';
import {theme} from 'galio-framework';

const {width} = Dimensions.get('screen');

const ListTemplates = () => {
  const [page, setPage] = React.useState(1);
  const [dataPetition, setDataPetition] = React.useState([]);
  const [loadingMoreData, setLoadingMoreData] = React.useState(true);

  const {
    data: templatesResponse,
    isFetching,
    isLoading,
    refetch,
  } = useGetTemplates(page);

  React.useEffect(() => {
    if (!templatesResponse) return;

    setLoadingMoreData(templatesResponse.loadMore);

    if (page > 1) {
      setDataPetition([...dataPetition, ...templatesResponse.templates]);
      return;
    }
    setDataPetition(templatesResponse.templates);
  }, [templatesResponse]);

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
        data={dataPetition}
        refreshing={isFetching}
        onRefresh={() => refetch()}
        renderItem={({item}) => <TemplateOrder item={item} />}
        keyExtractor={({item, index}) =>
          `templates-${item ? item.id : Math.random()}_${index}`
        }
        ListFooterComponent={putLoadingMore}
        ListEmptyComponent={<NotFound />}
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
export default ListTemplates;
