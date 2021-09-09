import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  Image,
  View,
} from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from '@components/Icon';
import Input from '@components/Input';
import Tabs from '@components/Tabs';
import nowTheme from '@constants/Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DownloadFile } from '@core/services/download-file.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


const SearchHome = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={() => {
      Keyboard.dismiss();
      navigation.navigate('Login');
    }}
  >
    <Ionicons name="log-out-outline" color={'#828489'} size={28} />
  </TouchableOpacity>
);

const SearchProducts = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={() => {
      Keyboard.dismiss();
      navigation.navigate('SearchProducts');
    }}
  >
    <Icon family="NowExtra" size={20} name="zoom-bold2x" color={'#828489'} />
  </TouchableOpacity>
);



const SearchAccount = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={() => {
      Keyboard.dismiss();
      navigation.navigate('Search');
    }}
  >
     {/* <Icon family="NowExtra" size={20} name="zoom-bold2x" color={'#828489'} />  */}
  </TouchableOpacity>
);

const CartButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={([styles.button, style], { zIndex: 300, left: -10 })}>
    <Ionicons name="cart" color={'#828489'} size={25} />
  </TouchableOpacity>
);

const ConfigButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={{ zIndex: 300, left: 0 }}>
    <Ionicons name="ellipsis-vertical-sharp" color={'#828489'} size={25} />
  </TouchableOpacity>
);

const DownloadButton = (props) => (
  <TouchableOpacity style={{ zIndex: 300, left: 15 }} onPress={() => props.onPress()}>
    <Ionicons name="download" color={'#0E3A90'} size={25} />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalBottom: false,
      urlFilePdf: '',
    };
    this.downloadFile = DownloadFile.getInstance();
  }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back && navigation.goBack();
  };

  handleDownloadFile = async () => {
    const { urlDownloadFile } = this.props.scene.route.params;
    const urlPdf =  await this.downloadFile.download(urlDownloadFile, 'pdf');

    this.setState({
      urlFilePdf:urlDownloadFile,
      showModalBottom: true,
    });
  };
  openViewerPdf = () => {
    const { urlDownloadFile } = this.props.scene.route.params;

    console.log('urlDownloadFile',urlDownloadFile)
    
    this.setState({
      urlFilePdf:urlDownloadFile,
      showModalBottom: true,
    });
  };

  renderRight = () => {
    const { white, title, navigation } = this.props;

    
    switch (title) {
      case 'Home':
        return [
          <View style={{ top: 5.5 }}>
            <SearchHome key="basket-home" navigation={navigation} isWhite={white} />
          </View>,
        ];
        case 'Products':
          return [
            <View style={{ top: 6.5 }}>
              <SearchProducts key="basket-deals" navigation={navigation} isWhite={white} />
            </View>,
          ];

          case 'Account':
            return [
              <View style={{ top: 5.5 }}>
                <SearchAccount key="basket-home" navigation={navigation} isWhite={white} />
              </View>,
            ];
  
     
      case 'Product':
        return [
          <Block row style={{ paddingTop: 17.5, width: 50 }}>
            <CartButton isWhite={white} />
            <ConfigButton isWhite={white} />
          </Block>,
        ];

      case 'SearchHome':
        return [<SearchHome key="basket-search" navigation={navigation} isWhite={white} />];

        case 'SearchProducts':
          return [<SearchProducts key="basket-search" navigation={navigation} isWhite={white} />];

      case 'Invoice Details':
        return [
          <View style={{ top: 7, width: 50 }}>
            <DownloadButton isWhite={white} onPress={() => this.handleDownloadFile()} />
            <BottomModal
              show={this.state.showModalBottom}
              close={() => this.setState({ showModalBottom: false })}
            >
              <PdfViewer url={this.state.urlFilePdf} />
            </BottomModal>
          </View>,
        ];

      default:
        break;
    }
  };

  renderHome = () => {
    const { title, back, white, iconColor } = this.props;

    return (
      <>
        {title == 'Home' ? (
          <Block row style={{ width: wp('62.5%') }}>
            <Block flex middle>
              <TouchableOpacity>
                {/* <Image source={require('@assets/imgs/img/book-invoice.png')} style={styles.image} />  */}
              </TouchableOpacity>
            </Block>

            <Block flex middle style={{ top: 5 }}>
              <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
            </Block>
          </Block>
        ) : (
          <View style={{ paddingTop: 12.5, position: 'absolute' }}>
            <Icon
              name={back ? 'minimal-left2x' : 'minimal-left2x'}
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
        onFocus={() => {
          Keyboard.dismiss();
          navigation.navigate('Search');
        }}
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
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return <Block center>{tabs ? this.renderTabs() : null}</Block>;
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
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={(headerStyles, { height: theme.SIZES.BASE * 6.5 })}>
        <NavBar
          title={title == 'Home' ? '' : title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={this.renderHome()}
          leftStyle={{ paddingVertical: 25, flex: 1.7 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
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
    position: 'relative',
  },
  title: {
    width: '150%',
    fontSize: Dimensions.get('window').height < 670 ? 22 : 26,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
    left: wp('-12.5%'),
    textAlign: 'center',
    top: 5.5,
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  shadowless: {
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  introImageStyle: {
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? 100
          : 120
        : Dimensions.get('window').height < 595
        ? 100
        : Dimensions.get('window').height > 600 && Dimensions.get('window').height < 900
        ? 120
        : -120,
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? 100
          : 120
        : Dimensions.get('window').height < 595
        ? 100
        : Dimensions.get('window').height > 600 && Dimensions.get('window').height < 900
        ? 120
        : -120,
    resizeMode: 'contain',
  },

  image: {
    width: 27.5,
    height: 27.5,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    marginLeft: -20,
    top: -10,
  },
  options: {
    padding: theme.SIZES.BASE / 2,
  },
});

export default withNavigation(Header);
