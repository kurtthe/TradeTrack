import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,

  Image,
  Animated,
  ImageBackground
} from 'react-native';

import Articles from './Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '@constants';
import { Card, Select, Switch } from '@components';

import Img from '@components/Img';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const cardInfo = {
    title: 'All products',
    image: 'https://live.staticflickr.com/65535/51356873868_2db763db5b_w.jpg',
    description:
      'Bathroom',
      cta: 'View article'
  }


class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSwitch: false,
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
    
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Card 
          categoryCard 
          onPress={() => this.props.navigation.navigate('Category', {myPrice: this.state.activeSwitch, headerTitle: 'All Products'})} 
          item={cardInfo} 
          style={{ marginRight: theme.SIZES.BASE }} 
        />
        {/* <Block flex row>
          <Card 
            categoryCard 
            onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[7].title})} 
            item={articles[7]} 
            style={{ marginRight: theme.SIZES.BASE }} 
          />
          <Card categoryCard 
          onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[8].title})} 
          item={articles[8]} 
          />
        </Block>
        <Block flex row>
          <Card 
            categoryCard 
            onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[9].title})} 
            item={articles[9]} 
            style={{ marginRight: theme.SIZES.BASE }} 
          />
          <Card 
            categoryCard 
            onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[9].title})} 
            item={articles[10]} 
          />
        </Block> */}
      </Block>
    );
  };

  renderSwitches = () => {
    return (
      <Block row flex style={styles.group, styles.switchBlock}>
        <Block style={styles.textBlock}>
          <Text size={16} style={styles.title}>
            Client Friendly Mode
          </Text>
          <Text
            style={{ fontFamily: 'montserrat-regular' }}
            size={14.5}
            color={'#848893'}
          >
            Enable this to hide "My Price"
          </Text>
        </Block>
        <Block center style={{ width: '20%', alignItems:'flex-end' }} >
          <Switch
            value={this.state.activeSwitch}
            toggleSwitch={ () => 
              this.setState({ activeSwitch: !this.state.activeSwitch})
            }
          />
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center backgroundColor={nowTheme.COLORS.BACKGROUND}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderCards()}
          <Block style={{padding:15}}> 
            {this.renderSwitches()} 
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  switchBlock: {
    paddingHorizontal: theme.SIZES.BASE *0.7, 
    backgroundColor:theme.COLORS.WHITE, 
    borderRadius:8
  },
  textBlock: {
    width: '80%',
    paddingVertical: theme.SIZES.BASE *1.3,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER,
    paddingBottom: 5
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  group: {
    padding: 14
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18
  }
});

export default Components;