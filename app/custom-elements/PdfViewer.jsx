import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import Loading from './Loading';
const PdfViewer = ({url}) => {

  if(!url){
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Pdf
        style={styles.pdf}
        trustAllCerts={false}
        source={{
          uri: `data:application/pdf;base64,${props.url}`,
          cache: true
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default PdfViewer;
