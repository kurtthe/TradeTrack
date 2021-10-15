import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { GeneralRequestService } from '@core/services/general-request.service';

const { height } = Dimensions.get('screen');
const generalRequestService = GeneralRequestService.getInstance();

const Register = () => {
  
  const getUrlRender = async ()=>{
    const { url } = await generalRequestService.get("https://api.tradetrak.com.au/burdens/dashboard");
    return url;
  }
  
  return (
    <SafeAreaView style={styles.webViewContainer}>
      <WebViewComponent url={getUrlRender()} />
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
