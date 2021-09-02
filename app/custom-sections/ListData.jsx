import React, { cloneElement } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { theme } from 'galio-framework';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { Button } from '@components';

const { width } = Dimensions.get('screen');

class ListData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      perPageData: 20,
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
    if (!this.props.endpoint) {
      return;
    }

    await this.getDataPetition.getInfo(this.props.endpoint, this.loadData, this.state.perPageData);
  };

  loadData = (data) => {
    this.setState({
      data: data,
    });

    this.props.actionData && this.props.actionData(data);
  };

  handleLoadMore() {
    const oldData = this.state.perPageData;
    this.setState({ perPageData: oldData + 20 });
  }

  render() {
    const { children } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>

        <View style={styles.contentInfo}>
          {cloneElement(children, { data: this.state.data })}
        </View>
        <View style={styles.contentButton}>
          <Button
            onPress={() => this.handleLoadMore()}
            color="info"
            textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
            style={styles.button}
          >
            Load More...
          </Button>
        </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  contentInfo:{
    backgroundColor:'green',
  },
  contentButton:{
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
});

export default ListData;
