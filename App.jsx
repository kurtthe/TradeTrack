import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

import AppStack from '@navigation/index';
import { Images, nowTheme } from '@constants/index';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { store } from '@core/module/store/index';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@shared/lib'

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

const cacheImages = (images) =>
  images?.map((image) => {
    if (!image || image === undefined || image === null) {
      return;
    }

    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'montserrat-regular': require('@assets/font/Inter-Regular.ttf'),
          'montserrat-bold': require('@assets/font/Inter-Bold.ttf'),
        });
        cacheImages(assetImages);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <GalioProvider theme={nowTheme}>
              <PaperProvider theme={theme}>
                <Block flex>
                  <AppStack />
                </Block>
              </PaperProvider>
            </GalioProvider>
          </Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}