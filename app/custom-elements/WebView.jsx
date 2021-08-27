import React from 'react';
import { WebView } from 'react-native-webview';
import Loading from '@custom-elements/Loading';

const WebViewComponent = (props) => {

  return (
    <WebView
      source={{ uri: props.url }}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
    />
  );
};


export default WebViewComponent;
