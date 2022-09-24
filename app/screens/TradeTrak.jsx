import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { GeneralRequestService } from '@core/services/general-request.service';

const generalRequestService = GeneralRequestService.getInstance();

const Register = () => {
  const [urlView, setUrlView] = useState(null);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    getUrlRender();
  });

  const getUrlRender = async () => {
    const response = await generalRequestService.get(
      'https://api.tradetrak.com.au/burdens/dashboard',
    );
    setUrlView(response.url);
  };

  return (
    <View style={styles.webViewContainer}>
      {restricted ? 
        <Text>
          Forbidden: You do not have permission to view Burdens information Please contact your company administrator to request access.
        </Text> :
        <WebViewComponent url={urlView} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

export default Register;
