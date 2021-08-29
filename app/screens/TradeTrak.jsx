import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';

const { height } = Dimensions.get('screen');

const Register = () => {
  return (
    <SafeAreaView style={styles.webViewContainer}>
      <WebViewComponent url="http://app.tradetrak.com.au/" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    paddingTop: height * 0.12,
  },
});

export default Register;
