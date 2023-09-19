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

  const content = `<iframe src='${urlView}' allowfullscreen></iframe>`;

  return (
    <View style={styles.webViewContainer}>
      <RenderHTML
        renderers={renderers}
        WebView={WebView}
        source={{
          html: content,
        }}
        customHTMLElementModels={customHTMLElementModels}
        contentWidth={contentWidth}
        enableExperimentalMarginCollapsing={true}
        renderersProps={{
          iframe: {
            webViewProps: {
              height: '100%',
              allowsFullScreen: true,
            },
          },
        }}
        tagsStyles={{
          p: { marginTop: 15, marginBottom: 0 },
          iframe: {
            marginTop: 15,
            borderRadius: 5,
            marginHorizontal: 0,
          },
        }}
      />
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
  }
});

export default Register;
