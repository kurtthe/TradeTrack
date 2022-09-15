import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';

const AppFeedback = () => {
  return (
    <View style={styles.webViewContainer}>
      <WebViewComponent url={`https://trakservices.notion.site/Burdens-App-Portal-Feature-Requests-c7e641b310a34cf8a904e65fad508433`} />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

export default AppFeedback;
