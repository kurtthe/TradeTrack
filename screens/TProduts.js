import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,

  Image,
  Animated,
  ImageBackground
} from 'react-native';

import Articles from '../screens/Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Card, Select, Switch } from '../components';

import Img from '../components/Img';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
    
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex row>
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
          <Card categoryCard onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[9].title})} item={articles[9]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card categoryCard onPress={() => this.props.navigation.navigate('Category', {headerTitle: articles[9].title})} item={articles[10]} />
        </Block>
      </Block>
    );
  };

  renderSwitches = () => {
    return (
      <Block flex style={styles.group, { backgroundColor:theme.COLORS.WHITE,borderRadius:8}}>
        <Text size={16} style={styles.title}>
          Client friendly mode
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
            <Text
              style={{ fontFamily: 'montserrat-regular' }}
              size={14}
              color={'#848893'}
            >
              enable this to hide "My price"
            </Text>
            <Switch/>
          </Block>
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
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 1,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  group: {
    padding: 14,
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