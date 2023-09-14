import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { GeneralRequestService } from '@core/services/general-request.service';
import Restricted from '@custom-elements/Restricted';

const generalRequestService = GeneralRequestService.getInstance();

const Register = () => {
  const [urlView, setUrlView] = useState(null);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    (async ()=> {
      await getUrlRender();
    })()
  }, []);

  const getUrlRender = async () => {
    const response = await generalRequestService.get(
      'https://api.tradetrak.com.au/burdens/dashboard',
    );

    if(response.restricted) {
      setRestricted(true)
    }
    response.url && setUrlView(response.url);
  };

  if (restricted) {
    return (
      <View style={styles.restrictedContainer}>
        <Restricted />
      </View>
    )
  }

  return (
    <View style={styles.webViewContainer}>
      <WebViewComponent url={urlView} style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    marginTop: 60,
    flex: 1,
  },
  restrictedContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Register;
