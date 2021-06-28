import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard, Image, View } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";


const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
  >
    <Icon
      family="NowExtra"
      size={16}
      name="bulb"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={[styles.notify, { backgroundColor: nowTheme.COLORS[isWhite ? 'WHITE' : 'PRIMARY'] }]} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style], {zIndex:300}} onPress={() => {Keyboard.dismiss(); navigation.navigate('Search');}} >
    <Icon
      family="NowExtra"
      size={20}
      name="zoom-bold2x"
      color={'#828489'}
    />
  </TouchableOpacity>
);

const CartButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style], {zIndex:300}}  >
   

<Ionicons name="cart" color={'#828489'}  size={20} />
  </TouchableOpacity>
  
);


const ConfigButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{zIndex:300, left:15}}  >
   

<Ionicons name="ellipsis-vertical-sharp" color={'#828489'}  size={20} />
  </TouchableOpacity>
  
);

const DeleteButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{zIndex:300, left:15}}  >

<Ionicons name="trash-sharp" color={'#828489'}  size={20} />
  </TouchableOpacity>
  
);





class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.goBack();
  };

  renderRight = () => {
    const { white, title, navigation } = this.props;
    // const { routeName } = navigation.state;
      
    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        <BasketButton key="basket-title" navigation={navigation} isWhite={white} />
      ];
    }
    switch (title) {
      case 'Home':
        return [
         // <BellButton key="chat-home" navigation={navigation} isWhite={white} />,
          <View>
            <BasketButton  key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        ];
      case 'Deals':
        return [
          <BellButton key="chat-categories" navigation={navigation} />,
          <BasketButton key="basket-categories" navigation={navigation} />
        ];
      case 'Categories':
        return [
          <BasketButton  key="basket-home" navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          <View style={{top:10}}>
            <BasketButton  key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        ];
      case 'Profile':
        return [
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Account':
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
          <BasketButton key="basket-deals" navigation={navigation} />
        ];
      case 'Products':
        return [
          <View style={{top:10}}>
          <BasketButton  key="basket-home" navigation={navigation} isWhite={white} />
        </View>
        ];
        case 'Product':
          return [
            <Block row style={{paddingTop: 20, width:70}}>
            <CartButton  isWhite={white} />
            <ConfigButton  isWhite={white} />
          </Block>
          ];
          case 'Cart':
            return [
             // <BellButton key="chat-home" navigation={navigation} isWhite={white} />,
              <View style={{top:10, width:50}}>
                <DeleteButton  isWhite={white} />
              </View>
            ];

      case 'Search':
        return [
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      case 'NotificationsSettings':
        return [
          <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
        case 'Agreement':
          return [
            <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
            <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
          ];
      default:
        break;
    }
  };


  renderHome = () => {
    const { title, back, white, iconColor } = this.props;
    
    return (
      <> 
        {title =="Home" ? (
        

         
          

              <Block row   style={{width: wp('65%')}}>
            <Block flex middle >
            <TouchableOpacity  >
                  <Image source={require('../assets/imgs/img/book-invoice.png')} style={styles.image} /> 
          </TouchableOpacity>
              </Block>


              <Block flex middle>
              <Image style={styles.introImageStyle}  source={require('../assets/imgs/img/logo.png')}/>
              </Block>

              </Block>

       
        )
        : (
          <View style={{paddingTop:20, position:'absolute'}}>
          <Icon
            name={back ? 'minimal-left2x' : 'minimal-left2x' }
            family="NowExtra"
            size={18}
            onPress={this.handleLeftPress}
            color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
          /> 
          </View>
        )}
      </>
    );
  };

  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => {Keyboard.dismiss(); navigation.navigate('Search');}}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" />
        }
      />
    );
  };


  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => console.log(navigation.navigate('Trending'))}
        >
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionLeft || 'Trending'}
            </Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Fashion')}>
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;
    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        key={tabIndex}
        onChange={id => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center >
          {/* {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null} */}
          {tabs ? this.renderTabs() : null} 
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      shadowless,
      ...props
    } = this.props;
    // const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
      
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor } ];

    return (
      <Block style={headerStyles, {height:theme.SIZES.BASE * 6.5}}>
        <NavBar
          title={title == 'Home' ? '':title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center',  }}
          left={ this.renderHome() }
          leftStyle={{ paddingVertical: 25, flex: 1.7 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
    //left:wp('31%'),
    top:10
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  shadowless: {
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: { 
      height: 0, 
    },
    shadowRadius: 0
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  introImageStyle: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  image: {
    
    width: 27.5,
    height: 27.5,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    marginLeft:-20,
    top:-10
  },
  options: {
    padding: theme.SIZES.BASE / 2
  },
});

export default withNavigation(Header);