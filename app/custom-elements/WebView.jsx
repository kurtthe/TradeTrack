import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';
import Loading from '@custom-elements/Loading';
import { Portal } from 'react-native-paper';

const WebViewComponent = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.webViewContainer}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <WebView
              source={{ uri: props.url }}
              startInLoadingState={true}
              renderLoading={() => <Loading />}
            />
          </View>
        </View>
      </View>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '85%',
  },
  header: {},
  webViewContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default WebViewComponent;
