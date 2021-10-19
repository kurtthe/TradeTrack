import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { GeneralRequestService } from '@core/services/general-request.service';

const { height } = Dimensions.get('screen');
const generalRequestService = GeneralRequestService.getInstance();

const Register = () => {
  const [urlView, setUrlView] = useState(null);

  useEffect(() => {
    getUrlRender();
  });

  const getUrlRender = async () => {
    const { url } = await generalRequestService.get(
      'https://api.tradetrak.com.au/burdens/dashboard',
    );
    setUrlView(url);
  };

  return (
    <SafeAreaView style={styles.webViewContainer}>
      <WebViewComponent url={urlView} />
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
