import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import PdfReader from 'rn-pdf-reader-js'; // Import the new library

const PdfViewerNew = ({uri}) => {
  return (
    <View style={styles.container}>
      <PdfReader
        source={{uri}}
        onError={error => {
          console.log('Error loading PDF:', error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewerNew;
