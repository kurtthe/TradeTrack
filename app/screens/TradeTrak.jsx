import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { GeneralRequestService } from '@core/services/general-request.service';

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
    <View style={styles.webViewContainer}>
      <WebViewComponent url={urlView} />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

export default Register;
