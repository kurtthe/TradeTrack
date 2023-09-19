// Libraries
import React from "react";
import {
  View,
  StyleSheet,
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
  const contentWidth = Dimensions.get("screen").width * 1;

  let content = `<div><iframe src='https://ttrak.co/OP4sc2qV'></iframe></div>`;
  return (
  
      <View style={styles.item}>
            <RenderHTML
              renderers={renderers}
              WebView={WebView}
              source={{
                html: content,
              }}
              customHTMLElementModels={customHTMLElementModels}
              tagsStyles={{
              
                iframe: {
                  marginTop: -15,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  height:Platform.OS === "android" ? 690 : 690,
                  width:contentWidth
                },
               
              }}
            />
      </View>
   
  );
}
const styles = StyleSheet.create({
  item: {
    borderColor: 'blue',
    borderBottomWidth: 1,
    backgroundColor: "red",
    height:Platform.OS === "android" ? 650 : 650
    
  },
 
});

export default App;