import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PdfViewer = (props) => {
  return (
    <View style={styles.container}>
      <PDFReader
        source={{
          base64: `data:application/pdf;base64,${props.url}`
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('80%'),
  },
});

export default PdfViewer;
