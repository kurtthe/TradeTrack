import React, {useRef, useState} from 'react';
import {Portal} from 'react-native-paper';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {WebView} from 'react-native-webview';
import Loading from '@custom-elements/Loading';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {requestStoragePermission} from '@core/utils/aksPermissions';

const WebApp = ({url, visible = false, onClose}) => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  React.useEffect(() => {
    (async () => {
      const granted = await requestStoragePermission();
      setHasPermission(granted);
    })();
  }, []);

  if (!visible) {
    return null;
  }

  const handleNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const handleGoBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const loadingView = () => {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        ]}>
        <Loading />
      </View>
    );
  };

  if (!url) return <Loading />;

  const askPermission = () => {
    (async () => {
      const granted = await requestStoragePermission();
      setHasPermission(granted);
      handleFileDownload().catch(err => console.log(err));
    })();
  };

  const handleFileDownload = async urlDownload => {
    console.log('urlDownload::', urlDownload);
    try {
      if (Platform.OS === 'android') {
        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download files.',
          );
          askPermission();
        }
      }

      const urlParams = new URL(urlDownload).searchParams;
      const id = urlParams.get('id');

      const downloadDest = `${FileSystem.documentDirectory}${id}.pdf`;
      const {uri} = await FileSystem.downloadAsync(urlDownload, downloadDest);
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Download Failed', error.message);
    }
  };

  const onShouldStartLoadWithRequest = request => {
    const {url: requestUrl} = request;
    if (requestUrl.includes('download')) {
      handleFileDownload(requestUrl).catch(() => console.log('=>::'));
      handleRefresh();
      return false;
    }
    return true;
  };

  return (
    <Portal>
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          backgroundColor: '#F8F8F8',
        }}>
        <View style={[styles.menuRow, {borderBottomWidth: 1}]}>
          <TouchableOpacity onPress={onClose}>
            <Text style={{fontSize: 20}}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefresh}>
            <Ionicons name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          onNavigationStateChange={handleNavigationStateChange}
          renderLoading={loadingView}
          source={{uri: url}}
          containerStyle={{flex: 1}}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          javaScriptEnabled={true}
          startInLoadingState={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
        />
        <View style={[styles.menuRow, {borderTopWidth: 1}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '40%',
            }}>
            {canGoBack && (
              <TouchableOpacity onPress={handleGoBack}>
                <Ionicons name={'arrow-back'} size={24} color="black" />
              </TouchableOpacity>
            )}

            {canGoForward && (
              <TouchableOpacity onPress={handleGoForward}>
                <Ionicons name={'arrow-forward'} size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
  },
  restrictedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WebApp;
