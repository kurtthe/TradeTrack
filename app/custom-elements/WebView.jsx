import React from 'react';
import { WebView } from 'react-native-webview';
import Loading from '@custom-elements/Loading';

const WebViewComponent = (props) => {
  return (
    <WebView
      style={props.style}
      originWhitelist={['*']}
      source={{ uri: props.url }}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log('WebView error: ', nativeEvent);
      }}
    />
  );
};

export default WebViewComponent;
