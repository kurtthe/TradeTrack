import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants/';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListNews from '@custom-sections/ListNewsVertical';
import { Button } from '@components';

import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class AllNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perPageData: 20,
      news: [],
    };

    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  async componentDidMount() {
    await this.getDataPetitionNews();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.perPageData !== prevState.perPageData) {
      await this.getDataPetitionNews();
    }
  }

  getDataPetitionNews = async () => {
    await this.getDataPetition.getInfo(endPoints.news, this.handelGetNews, this.state.perPageData);
  };

  handleLoadMore = () => {
    const oldData = this.state.perPageData;
    this.setState({ perPageData: oldData + 20 });
  };

  handelGetNews = (data) => {
    this.setState({
      news: data,
    });
  };

  render() {
    return (
      <ScrollView>
        <Block flex>
          <ListNews news={this.state.news} />
          <Block center style={{ paddingVertical: 5 }}>
            <Button
              onPress={() => this.handleLoadMore()}
              color="info"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
              style={styles.button}
            >
              Load More...
            </Button>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    padding: 15,
    marginLeft: -15,
    width: width,
    height: '9%',
  },
  card: {
    marginTop: 0,
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    top: 5,
  },
});

export default AllNews;
