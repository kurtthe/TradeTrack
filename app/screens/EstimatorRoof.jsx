import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebViewComponent from '@custom-elements/WebView';
import { useSelector } from 'react-redux'

const EstimatorRoof = () => {
  const [urlView, setUrlView] = useState(null);
  const companyName = useSelector((state) => state.loginReducer.company);
  const emailUser = useSelector((state) => state.loginReducer.email);
  const fullName = useSelector((state) => `${state.loginReducer.first_name} ${state.loginReducer.last_name}`);
  const api_key = useSelector((state) => state.loginReducer.api_key);
  const client_number = useSelector((state) => state.liveBalanceReducer.client_number);

  useEffect(() => {
    getUrlRender();
  }, []);

  const getUrlRender = async () => {
    const url = `https://burdenstradetrakroofestimator.paperform.co/?email=${emailUser}&name=${fullName}&api_key=${api_key}&company=${companyName}&burdens_account=${client_number}`
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

export default EstimatorRoof;
