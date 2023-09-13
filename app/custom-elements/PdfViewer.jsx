import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PdfViewer = (props) => {
  return (
    <View style={styles.container}>
      <Pdf
        style={{flex: 1}}
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
});

export default PdfViewer;
