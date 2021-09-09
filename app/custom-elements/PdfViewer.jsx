import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFReader from '@custom-elements/WebView';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { GeneralRequestService } from '@core/services/general-request.service';

// const generalRequest = GeneralRequestService.getInstance();


const PdfViewer = (props) => {
  console.log("==>props pdfviewer", props)

  // const resultPetition = await generalRequest.get(props.url)
  
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