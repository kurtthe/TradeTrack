import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  TouchableOpacity,

  Keyboard,
  Image,
  View,
} from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from '@components/Icon';
import Input from '@components/Input';
import Tabs from '@components/Tabs';
import nowTheme from '@constants/Theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DownloadFile } from '@core/services/download-file.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '@custom-elements/Loading';
import { makeStyles } from './Header.styles'
import {
  DownloadButton,
  SearchAccount,
  SearchHome,
  SearchProducts,
} from './component'

const styles = makeStyles()
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

    if (!this.props.scene.route.params?.nameRouteGoing) {
      navigation.goBack();
      return;
    }

    const routeName = this.props.scene.route.params?.nameRouteGoing;

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
    const { white, title, navigation } = this.props;

    switch (title) {
      case 'Home':
        return (
          <View style={{ top: 5.5 }}>
            <SearchHome key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        );

      case 'Products':
        return (
          <View style={{ top: 6.5 }}>
            <SearchProducts
              key="basket-deals"
              navigation={navigation}
              isWhite={white}
              myPrice={this.props.scene.route.params?.myPrice}
            />
          </View>
        );

      case 'Account':
        return (
          <View style={{ top: 5.5 }}>
            <SearchAccount key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        );

      case 'Product':
        return <Block row style={{ paddingTop: 17.5, width: 50 }} />;

      case 'SearchHome':
        return <SearchHome key="basket-search" navigation={navigation} isWhite={white} />;

      case 'SearchProducts':
        return <SearchProducts key="basket-search" navigation={navigation} isWhite={white} />;

      case 'Details':
        return [

          <View style={{ top: 7, width: 50 }}>
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
    const { title, back, white, iconColor } = this.props;

    return (
      <>
        {title == 'Home' ? (
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
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);
