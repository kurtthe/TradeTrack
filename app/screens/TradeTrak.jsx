import React from 'react';
import { View } from 'react-native';
import WebView from '@custom-elements/WebView';

const Register = () => (
  <View>
    <WebView url="http://app.tradetrak.com.au/" show={true} />
  </View>
);

export default Register;
