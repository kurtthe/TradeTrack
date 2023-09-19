// Libraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import IframeRenderer, {iframeModel} from "@native-html/iframe-plugin";
import RenderHTML from "react-native-render-html";
import WebView from "react-native-webview";

const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};

function App() {
  const contentWidth = Dimensions.get("screen").width * 0.9;
  let content = `<iframe src='https://ttrak.co/OP4sc2qV' allowfullscreen></iframe>`;
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.informations}>
          <View>
            <Text style={styles.creator}>Trak Test</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>
            <RenderHTML
              renderers={renderers}
              WebView={WebView}
              source={{
                html: content,
              }}
              customHTMLElementModels={customHTMLElementModels}
              contentWidth={contentWidth}
              defaultWebViewProps={{}}
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                  webViewProps: {
                    allowsFullScreen: true,
                  },
                },
              }}
              baseFontStyle={styles.contentMessage}
              tagsStyles={{
                p: { marginTop: 15, marginBottom: 0 },
                iframe: {
                  marginTop: 15,
                  borderRadius: 5,
                  marginHorizontal: 0,
                },
              }}
            />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderColor: 'blue',
    borderBottomWidth: 1,
    padding: 20,
    backgroundColor: "white",
  },
  informations: {
    flexDirection: "row",
    alignItems: "center",
  },
  creator: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: 'grey',
    width: Dimensions.get("screen").width * 0.75,
  },
  content: {
    marginTop: 10,
  },
});

export default App;