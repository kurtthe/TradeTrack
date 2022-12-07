import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { Block, NavBar } from 'galio-framework';
import {makeStyles} from './Header.styles'
import nowTheme from '@constants/Theme';
import {Icons} from './components/Icons'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '@components/Icon';
import { useDispatch } from 'react-redux';
import {
  reset
} from '@core/module/store/filter/filter';

const Header = ({
  title,
  headerType,
  white,
  transparent,
  bgColor,
  titleColor,
  navigation,
  back,
  scene,
  iconColor
}) => {
  const dispatch = useDispatch()
  const styles = makeStyles()

  const handleLeftPress = () => {
    if(title === 'Products  '){
      dispatch(reset())
      navigation.reset({
        index: 0,
        routes: [{ name: 'Products' }],
      });
      return;
    }

    if (!scene || !scene?.route?.params?.nameRouteGoing) {
      navigation.goBack();
      return;
    }

    const routeName = scene?.route?.params?.nameRouteGoing;

    if(routeName === 'Products'){
      dispatch(reset())
      setTimeout(()=> navigation.navigate('Products'), 500)
      return;
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

  return (
    <Block style={[transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null]}>
      <NavBar
        title={headerType === 'Home' ? '' : title}
        style={[styles.navbar, bgColor && { backgroundColor: bgColor }]}
        transparent={transparent}
        right={<Icons
          headerType={headerType}
          navigation={navigation}
          white={white}
          urlDownloadFile={scene.route?.params?.urlDownloadFile}
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