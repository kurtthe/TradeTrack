import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-native-paper';
import {Linking, Platform, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {WebView} from "react-native-webview";
import Loading from '@custom-elements/Loading';
import Restricted from '@custom-elements/Restricted';
import { GeneralRequestService } from '@core/services/general-request.service';


const generalRequestService = GeneralRequestService.getInstance();
const WebviewComponent = ({url, visible=false, onClose}) => {
  const webViewRef = useRef(null);
  const [urlView, setUrlView] = useState(null);
  const [restricted, setRestricted] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    (
      async () => {
        const response = await generalRequestService.get(
          'https://api.tradetrak.com.au/burdens/dashboard',
        );

        if(response.restricted) {
          setRestricted(true)
        }
        setUrlView(response.url);
      }
    )()
  }, []);



  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const openInBrowser = () => {
    url && Linking.openURL(url)
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

  if(!urlView) return <Loading />

  if (restricted) {
    return (
      <View style={styles.restrictedContainer}>
        <Restricted />
      </View>
    )
  }

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
        ]}
      >
        <Loading />
      </View>
    );
  };

  return  (
    <Portal>
      <View style={{flex: 1,  paddingTop: 40, paddingBottom: Platform.OS === 'ios' ? 30 : 0, backgroundColor: '#F8F8F8'}}>
        <View style={[styles.menuRow, { borderBottomWidth: 1 }]}>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefresh}>
            <Ionicons name='refresh' size={24} color="black" />
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          onNavigationStateChange={handleNavigationStateChange}
          renderLoading={loadingView}
          startInLoadingState={true}
          source={{ uri: urlView }}
          containerStyle={{ flex: 1 }}
        />
        <View style={[styles.menuRow, { borderTopWidth: 1 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '40%',
            }}
          >
            {
              canGoBack && <TouchableOpacity onPress={handleGoBack}>
                <Ionicons name={'arrow-back'} size={24} color="black"/>
              </TouchableOpacity>
            }

            { canGoForward &&
              <TouchableOpacity onPress={handleGoForward}>
                <Ionicons name={'arrow-forward'} size={24} color="black"/>
              </TouchableOpacity>
            }

          </View>
          <TouchableOpacity onPress={openInBrowser}>
            <Ionicons name={'compass'} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Portal>
  )
}

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
    justifyContent: 'center'
  },
})

export default WebviewComponent;
