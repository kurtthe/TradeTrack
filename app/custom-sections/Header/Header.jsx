import React, {useState, useEffect} from 'react';
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
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { connect } from 'react-redux';
import Icon from '@components/Icon';
import Input from '@components/Input';
import Tabs from '@components/Tabs';
import nowTheme from '@constants/Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { DownloadFile } from '@core/services/download-file.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';
import * as SecureStore from 'expo-secure-store';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '@custom-elements/Loading';
import {
  backCategory,
} from '@core/module/store/filter/filter';
const { width } = Dimensions.get('window');

const SearchHome = ({ style, navigation }) => (
  <TouchableOpacity
    style={([styles.button, style], { zIndex: 300 })}
    onPress={async () => {
      await SecureStore.deleteItemAsync('data_user');
      Keyboard.dismiss();
      navigation.navigate('Login');
    }}
  >
    <Ionicons name="log-out-outline" color={'#828489'} size={28} />
  </TouchableOpacity>
);

const SearchProducts = ({style, navigation, myPrice}) => {
  const [disabled, setDisabled] = useState(true)

  useEffect(()=>{
    setTimeout(()=> setDisabled(false) ,5000)
  }, [])

  return (
      <TouchableOpacity
          style={[styles.button, style, {zIndex: 300}]}
          disabled={disabled}
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate('SearchProducts', {
              myPrice,
            });
          }}
      >
        <Icon family="NowExtra" size={20} name="zoom-bold2x" color={'#828489'}/>
      </TouchableOpacity>
  )
};


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

const DownloadButton = (props) => (
  <TouchableOpacity style={{ zIndex: 300, left: 15 }} onPress={() => props.onPress()}>
    <Ionicons name="download" color={'#0E3A90'} size={25} />
  </TouchableOpacity>
);

class Header extends React.Component {
  textSearch;
  constructor(props) {
    super(props);
    this.state = {
      showModalBottom: false,
      urlFilePdf: '',
      loadingLoadPdf: false,
    };
    this.downloadFile = DownloadFile.getInstance();
    this.generalRequestService = GeneralRequestService.getInstance();
  }

  handleLeftPress = () => {
    const { navigation } = this.props;

    if (!this.props.scene || !this.props.scene.route.params?.nameRouteGoing) {
      navigation.goBack();
      return;
    }

    const routeName = this.props.scene.route.params?.nameRouteGoing;

    if(routeName === 'Products'){

    }

    if (routeName === 'AccountInvoice') {
      this.props.navigation.setParams({
        nameRouteGoing: false,
      });

      navigation.navigate('Account', {
        screen: 'AccountDetails',
        params: { tabIndexSelected: 1 },
      });
    }
  };

  openViewerPdf = async () => {
    this.setState({ loadingLoadPdf: true });
    const { urlDownloadFile } = this.props.scene.route.params;
    const result = await this.generalRequestService.get(urlDownloadFile);
    this.setState({
      urlFilePdf: result,
      showModalBottom: true,
      loadingLoadPdf: false,
    });
  };

  renderRight = () => {
    const { white, headerType, navigation } = this.props;

    switch (headerType) {
      case 'Home':
        return (
          <SearchHome key="basket-home" navigation={navigation} isWhite={white} />
        );

      case 'Products':
        return (
          <SearchProducts
            key="basket-deals"
            navigation={navigation}
            isWhite={white}
            myPrice={this.props.scene.route.params?.myPrice}
          />
        );

      case 'Account':
        return (
          <SearchAccount key="basket-home" navigation={navigation} isWhite={white} />
        );

      case 'Product':
        return <Block row style={{ width: 50 }} />;

      case 'SearchHome':
        return <SearchHome key="basket-search" navigation={navigation} isWhite={white} />;

      case 'SearchProducts':
        return <SearchProducts key="basket-search" navigation={navigation} isWhite={white} />;

      case 'Details':
        return [

          <View style={{ width: 50 }}>
            {this.state.loadingLoadPdf ? (
              <Loading />
            ) : (
              <DownloadButton isWhite={white} onPress={() => this.openViewerPdf()} />
            )}

            <BottomModal
              show={this.state.showModalBottom}
              close={() => this.setState({ showModalBottom: false })}
              downloadShared={{
                url: this.props.scene.route.params?.urlDownloadFile,
              }}
            >
              <View style={{ height: hp('80%') }}>
                <PdfViewer url={this.state.urlFilePdf} />
              </View>
            </BottomModal>
          </View>
        ];

      default:
        break;
    }
  };

  renderHome = () => {
    const { headerType, back, white, iconColor } = this.props;

    return (
      <>
        {headerType == 'Home' ? (
          <Block row style={{ width: wp('62.5%') }}>
            <Block flex middle />
            <Block flex middle style={{ top: 5 }}>
              <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
            </Block>
          </Block>
        ) : (
          <TouchableOpacity
            style={{ paddingTop: 12.5, width: 25, height: 39, position: 'absolute' }}
            onPress={this.handleLeftPress}
          >
            <Icon
              name={back ? 'minimal-left2x' : 'minimal-left2x'}
              family="NowExtra"
              size={18}
              color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
            />
          </TouchableOpacity>
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
            <Text size={16} style={[styles.tabTitle, { fontFamily: 'montserrat-regular' }]}>
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
            <Text size={16} style={[styles.tabTitle, { fontFamily: 'montserrat-regular' }]}>
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
      title,
      headerType,
      white,
      transparent,
      bgColor,
      titleColor,
    } = this.props;
    const headerStyles = [
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={[headerStyles]}>
        <NavBar
          title={headerType == 'Home' ? '' : title}
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
  },
  navbar: {
    paddingVertical: (Platform.OS === 'ios') ? 0 : theme.SIZES.BASE * 3,
    zIndex: 5,
  },
  shadow: {
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
    padding: theme.SIZES.BASE / 2,
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
});

const mapDispatchToProps = { backCategory };

export default withNavigation(connect(null, mapDispatchToProps)(Header));