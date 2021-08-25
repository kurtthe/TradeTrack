import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFReader from '@custom-elements/WebView';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';


const PdfViewer = (props) => {
  console.log("==>props pdfviewer", props)
  return (
    <View style={styles.container}>
      <PDFReader url={props.url} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('90%'),
  },
});

export default PdfViewer;
