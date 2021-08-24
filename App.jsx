import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

import AppStack from '@navigation/index';
import { Images, articles, nowTheme } from '@constants/index';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { store } from '@core/module/store/index';
import { Provider } from 'react-redux';
// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground,
];

articles.map((article) => assetImages.push(article.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <Provider store={store}>
            <GalioProvider theme={nowTheme}>
              <PaperProvider theme={theme}>
                <Block flex>
                  <AppStack />
                </Block>
              </PaperProvider>
            </GalioProvider>
          </Provider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('@assets/font/Inter-Regular.ttf'),
      'montserrat-bold': require('@assets/font/Inter-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });

    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
