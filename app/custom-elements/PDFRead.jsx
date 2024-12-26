import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import PdfReader from 'rn-pdf-reader-js'; // Import the new library

const PdfRead = ({uri}) => {
  const source = {uri: uri}; // Use the uri prop directly for the source

  return (
    <View style={styles.container}>
      <PdfReader
        source={source} // Provide the source (URI) to the PdfReader component
        onError={error => {
          console.log('Error loading PDF:', error); // Error handling
        }}
        style={styles.pdf} // Apply the styles
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

export default PdfRead;
