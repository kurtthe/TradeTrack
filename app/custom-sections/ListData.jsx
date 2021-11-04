import React, { cloneElement } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { theme, Text } from 'galio-framework';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';
import Filters from '@custom-elements/filters/Filters';
import FilterProducts from '@custom-elements/filters/FilterProducts';

import nowTheme from '@constants/Theme';
import { isEmpty } from 'rxjs';

const { width } = Dimensions.get('screen');

class ListData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      perPageData: props?.perPage ? props?.perPage : 12,
      valuesFilters: {},
      notFound: false,
      loadingMoreData: false,
      showLoadMore: true,
      page: 1,
      urlPetition: null,
      filter: false,
    };

    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    await this.getPetitionData();
    this.setState({
      urlPetition: this.props.endpoint,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.perPageData !== prevState.perPageData) {
      await this.getPetitionData();
      return;
    }

    if (this.state.urlPetition !== prevState.urlPetition) {
      await this.getPetitionData();
      return;
    }

    if (this.props.endpoint !== prevProps.endpoint) {
      this.setState({
        urlPetition: this.props.endpoint,
      });
    }
  }

  getPetitionData = async () => {
    if (this.props.isEmpty) {
      this.setState({
        data: [],
        notFound: false,
        loadingMoreData: false,
        showLoadMore: false,
      });
      return;
    }

    this.setState({ loadingMoreData: true });

    if (!!this.state.urlPetition && !this.props.isEmpty) {
      await this.getDataPetition.getInfo(
        this.state.urlPetition,
        this.loadData,
        this.state.page,
        this.state.perPageData,
      );
      return;
    }
  };

  loadData = (data) => {
    if (!data || data?.length < 1) {
      this.setState({
        loadingMoreData: false,
        showLoadMore: false,
        notFound: this.state.filter ? true : false,
      });
    } else {
      this.setState({
        data: data,
        notFound: false,
        loadingMoreData: false,
        showLoadMore: true,
      });
    }

    this.props.actionData && this.props.actionData(data);
  };

  handleLoadMore = () => {
    if (this.state.perPageData >= 100) {
      const oldPage = this.state.page;
      this.setState({ page: oldPage + 1, perPageData: 20 });
      return;
    }
    const oldData = this.state.perPageData;
    this.setState({ perPageData: oldData + 20 });
  };

  getValuesFilters = (values) => {
    this.setState({ valuesFilters: values, data: [], filter: true });
    this.setParamsEndPoint();
  };

  setParamsEndPoint = async () => {
    const { valuesFilters } = this.state;
    const includeParamUrl = this.props.endpoint.includes('?');
    let linkPetition = `${this.props.endpoint}${includeParamUrl ? '&' : '?'}`;

    Object.keys(valuesFilters).forEach((item) => {
      linkPetition += `${item}=${valuesFilters[item]}&`;
    });

    this.setState({
      urlPetition: linkPetition,
    });
  };

  getDataFilterProducts = async (data = false, dataFilter = false) => {
    if (!data) {
      await this.getPetitionData();
    } else {
      this.loadData(data);
    }
    this.setState({ showLoadMore: !dataFilter });
  };

  renderFilter = () => {
    if (!this.props.filters) {
      return null;
    }

    if (this.props.filters === 'products') {
      return (
        <FilterProducts
          getProducts={(data, dataFilter) => this.getDataFilterProducts(data, dataFilter)}
        />
      );
    }

    return <Filters getValues={(values) => this.getValuesFilters(values)} />;
  };

  renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          No results found for search options selected.
        </Text>
      </View>
    );
  };

  putLoadingMore = () => {
    if (!this.state.showLoadMore) {
      return null;
    }

    if (this.state.data.length > 5) {
      return (
        <View style={styles.contentButton}>
          <Button
            onPress={() => this.handleLoadMore()}
            color="info"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
            style={styles.button}
            loading={this.state.loadingMoreData}
            disabled={this.state.loadingMoreData}
          >
            Load More...
          </Button>
        </View>
      );
    }
  };

  render() {
    const { children } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>{this.renderFilter()}</View>
          <View>
            {this.state.data.length === 0 && !this.props.isEmpty && !this.state.loadingMoreData ? (
              this.renderNotFound()
            ) : (
              <>
                <View
                  style={[
                    styles.content,
                    { backgroundColor: !this.props.isEmpty ? nowTheme.COLORS.BACKGROUND : 'white' },
                  ]}
                >
                  {cloneElement(children, { data: this.state.data })}
                </View>
                {this.putLoadingMore()}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    paddingTop: 15,
  },
  contentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
  notfound: {
    padding: 15,
    marginVertical: theme.SIZES.BASE * 2,
  },
});

export default ListData;
