import React, { cloneElement } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { theme, Text } from 'galio-framework';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';
import Filters from '@custom-elements/filters/Filters';
import FilterProducts from '@custom-elements/filters/FilterProducts';

import nowTheme from '@constants/Theme';

const { width } = Dimensions.get('screen');

class ListData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      perPageData: 12,
      valuesFilters: {},
      notFound: false,
      loadingMoreData: false,
    };

    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    await this.getPetitionData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.perPageData !== prevState.perPageData) {
      await this.getPetitionData();
    }
  }

  getPetitionData = async () => {
    this.setState({ loadingMoreData: true });

    if (!this.props.endpoint) {
      return;
    }

    await this.getDataPetition.getInfo(this.props.endpoint, this.loadData, this.state.perPageData);
  };

  loadData = (data) => {
    console.log("==>list data",data)
    if (!data || data?.length < 1) {
      this.setState({
        notFound: true,
        loadingMoreData: false,
      });
    } else {
      this.setState({
        data: data,
        notFound: false,
        loadingMoreData: false,
      });
    }

    this.props.actionData && this.props.actionData(data);
  };

  handleLoadMore = () => {
    const oldData = this.state.perPageData;
    this.setState({ perPageData: oldData + 20 });
  };

  getValuesFilters = (values) => {
    this.setState({ valuesFilters: values, data: [] });
    this.setParamsEndPoint();
  };

  setParamsEndPoint = async () => {
    const { valuesFilters } = this.state;
    let linkPetition = `${this.props.endpoint}?`;

    Object.keys(valuesFilters).forEach((item) => {
      linkPetition += `${item}=${valuesFilters[item]}&`;
    });

    await this.getDataPetition.getInfo(linkPetition, this.loadData, this.state.perPageData);
  };

  renderFilter = () => {
    if (!this.props.filters) {
      return null;
    }

    if (this.props.filters === 'products') {
      return <FilterProducts />;
    }

    return <Filters getValues={(values) => this.getValuesFilters(values)} />;
  };

  renderNotFound = () => {
    return (
      <View style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          We didn’t find "<Text bold>{this.state.search}</Text>" in the Data Base.
        </Text>

        <Text
          size={18}
          style={{
            marginTop: theme.SIZES.BASE,
            fontFamily: 'montserrat-regular',
          }}
          color={nowTheme.COLORS.TEXT}
        >
          You can see more data in your Account.
        </Text>
      </View>
    );
  };

  render() {
    const { children } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>{this.renderFilter()}</View>
          <View>
            {this.state.notFound ? (
              this.renderNotFound()
            ) : (
              <>
                <View>{cloneElement(children, { data: this.state.data })}</View>
                {this.state.data.length > 10 && (
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
                )}
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
