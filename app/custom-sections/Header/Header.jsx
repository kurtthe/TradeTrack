import React from 'react'
import { Image, TouchableOpacity, Platform } from 'react-native';
import { Block, NavBar } from 'galio-framework';
import {makeStyles} from './Header.styles'
import nowTheme from '@constants/Theme';
import {Icons} from './components/Icons'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '@components/Icon';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  title,
  headerType,
  white,
  transparent,
  bgColor,
  titleColor,
  back,
  scene,
  iconColor
}) => {
  const styles = makeStyles()
  const navigation = useNavigation()

  const handleLeftPress = React.useCallback(() =>{
      const routeName = scene?.route?.params?.nameRouteGoing;
      console.log("routeName::", routeName)
      if (!scene || !routeName) {
        navigation.goBack();
        return;
      }

      if(routeName === 'Cart'){
        navigation.navigate('Cart')
        return
      }

      if(routeName === 'Products'){
        navigation.navigate('Products')
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

      return () => {

      }
  }, [scene, navigation])

  const renderHome = () => {
    if(headerType === 'Home'){
      return (
        <Block row style={{ width: wp('62.5%') }}>
          <Block flex middle />
          <Block flex middle style={{ top: 5 }}>
            <Image style={styles.introImageStyle}  source={require('@assets/imgs/img/logo.png')} />
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
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
          <NavBar
            title={headerType === 'Home' ? '' : title}
            style={[{ marginTop: (insets?.top || 0) + Platform.select({ ios: 0, default: 5 }) }, styles.navbar, bgColor && { backgroundColor: bgColor }]}
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
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

export default Header
