import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

import { Block, theme } from 'galio-framework';

import { nowTheme } from '@constants';
import { Card } from '@components';
import Switch from '@custom-elements/Switch';

const { width } = Dimensions.get('screen');

const cardInfo = {
  title: 'All products',
  image: 'https://live.staticflickr.com/65535/51356873868_2db763db5b_w.jpg',
  description: 'Bathroom',
  cta: 'View article',
};

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSwitch: false,
    };
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Card
          categoryCard
          onPress={() =>
            this.props.navigation.navigate('Category', {
              myPrice: this.state.activeSwitch,
              headerTitle: 'All Products',
            })
          }
          item={cardInfo}
          style={{ marginRight: theme.SIZES.BASE }}
        />
      </Block>
    );
  };

  handleChangeSwitch = (value) => {
    this.setState({ activeSwitch: value });
  };

  render() {
    return (
      <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderCards()}
          <Block style={{ padding: 15 }}>
            <Switch
              card={true}
              title="Client Friendly Mode"
              description={`Enable this to hide "My Price"`}
              onChange={(value) => this.handleChangeSwitch(value)}
            />
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  switchBlock: {
    paddingHorizontal: theme.SIZES.BASE * 0.7,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
  },
  textBlock: {
    width: '80%',
    paddingVertical: theme.SIZES.BASE * 1.3,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER,
    paddingBottom: 5,
  },
  group: {
    padding: 14,
  },
});

export default Components;
