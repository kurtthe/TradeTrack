import React, {useState} from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { Block, NavBar } from 'galio-framework';
import { DownloadFile } from '@core/services/download-file.service';
import { GeneralRequestService } from '@core/services/general-request.service';
import {makeStyles} from './Header.styles'
import nowTheme from '@constants/Theme';
import {Icons} from './components/Icons'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '@components/Icon';
import { useDispatch } from 'react-redux';
import {
  backCategory
} from '@core/module/store/filter/filter';

const Header = ({title, headerType, white, transparent, bgColor, titleColor, navigation, back, scene}) => {
  const dispatch = useDispatch()

  const [showModalBottom, setShowModalBotton] = useState(false)
  const [urlFilePdf, setUrlFilePdf] = useState(null)

  const styles = makeStyles()

  const downloadFile = DownloadFile.getInstance();
  const generalRequestService = GeneralRequestService.getInstance();

  const handleLeftPress = () => {
    const { navigation } = this.props;

    if (!scene || !scene.route.params?.nameRouteGoing) {
      navigation.goBack();
      return;
    }

    const routeName = scene.route.params?.nameRouteGoing;

    if(routeName === 'Products'){
      dispatch(backCategory())
    }

    if (routeName === 'AccountInvoice') {
      navigation.setParams({
        nameRouteGoing: false,
      });

      navigation.navigate('Account', {
        screen: 'AccountDetails',
        params: { tabIndexSelected: 1 },
      });
    }
  }

  const renderHome = () => {
    if(headerType === 'Home'){
      return (
        <Block row style={{ width: wp('62.5%') }}>
          <Block flex middle />
          <Block flex middle style={{ top: 5 }}>
            <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
          </Block>
        </Block>
      )
    }

    return (
      <TouchableOpacity
        style={{ paddingTop: 12.5, width: 25, height: 39, position: 'absolute' }}
        onPress={handleLeftPress}
      >
        <Icon
          name={back ? 'minimal-left2x' : 'minimal-left2x'}
          family="NowExtra"
          size={18}
          color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
        />
      </TouchableOpacity>
    );
  }
  const renderHeader = () => {

  }

  return (
    <Block style={[transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null]}>
      <NavBar
        title={headerType == 'Home' ? '' : title}
        style={[styles.navbar, bgColor && { backgroundColor: bgColor }]}
        transparent={transparent}
        right={<Icons
          headerType={headerType}
          navigation={navigation}
          white={white}
        />}
        rightStyle={{ alignItems: 'center' }}
        left={renderHome()}
        leftStyle={{ paddingVertical: 25, flex: 1.7 }}
        titleStyle={[
          styles.title,
          { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
          titleColor && { color: titleColor },
        ]}
      />
    </Block>
  )
}

export default Header