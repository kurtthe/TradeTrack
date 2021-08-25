import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFReader from '@custom-elements/WebView';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';


const PdfViewer = (props) => {
  console.log("==>props pdfviewer", props)
  return (
    <View style={styles.container}>
      <PDFReader url={'https://pidamazonia.com/sites/all/themes/pid/viewpdf/viewer.html?file=https://pidamazonia.com/sites/default/files//Infografia%20EXPO%20VIRTUAL.pdf'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('90%'),
  },
});

export default PdfViewer;
