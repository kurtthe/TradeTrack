import React from 'react';
import { nowTheme } from '../constants';
import { 
  StyleSheet, 
  ActivityIndicator , 
  Dimensions,
  SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          showModal : false
      }
  }


  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      /> 
    );
  }

  render () {
    return(
      <SafeAreaView style={styles.webViewContainer}>
        <WebView 
          source={{uri: 'http://app.tradetrak.com.au/'}}
          renderLoading={this.ActivityIndicatorLoadingView}
        />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  webViewContainer : {
    flex: 1,
    paddingTop: height*0.12
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default Register;




