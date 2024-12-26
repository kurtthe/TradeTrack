import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PdfRead from './PDFRead';

const PdfViewer = props => {
  return (
    <SafeAreaView style={styles.container}>
      <PdfRead uri={`data:application/pdf;base64,${props.url}`} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default PdfViewer;
