import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GeneralRequestService } from '@core/services/general-request.service';
import Restricted from '@custom-elements/Restricted';
import Loading from '../custom-elements/Loading';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';

const generalRequestService = GeneralRequestService.getInstance();
const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};
const contentWidth = Dimensions.get("screen").width * 0.9;

const Register = () => {
  const [urlView, setUrlView] = useState(null);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    (
      async () => {
        const response = await generalRequestService.get(
          'https://api.tradetrak.com.au/burdens/dashboard',
        );

        if(response.restricted) {
          setRestricted(true)
        }
        setUrlView(response.url);
      }
    )()
  }, []);

  if(!urlView) return <Loading />


  if (restricted) {
    return (
      <View style={styles.restrictedContainer}>
        <Restricted />
      </View>
    )
  }
  const contentWidth = Dimensions.get("screen").width * 1;
  const content = `<iframe src='${urlView}' allowfullscreen></iframe>`;

  return (
    <View style={styles.item}>
    <View style={styles.webViewContainer}>
    <RenderHTML
              renderers={renderers}
              WebView={WebView}
              source={{
                html: content,
              }}
              customHTMLElementModels={customHTMLElementModels}
              tagsStyles={{
              
                iframe: {
                
                  borderRadius: 5,
                  marginHorizontal: 0,
                  height:Platform.OS === "android" ? 690 : 690,
                  width:contentWidth
                },
               
              }}
            />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
  restrictedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    marginTop: 60,
   // backgroundColor: "red",
    height:Platform.OS === "android" ? 650 : 650
    
  },
});

export default Register;
