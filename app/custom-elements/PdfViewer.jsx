import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFReader from '@custom-elements/WebView';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { GeneralRequestService } from '@core/services/general-request.service';

const generalRequest = GeneralRequestService.getInstance();


const PdfViewer = (props) => {
  console.log("==>props pdfviewer", props)

  const resultPetition = generalRequest.get(props.url)
  console.log("==>resultPetition",resultPetition)
  
  return (
    <View style={styles.container}>
      <PDFReader url={'http://zoada-au.com/123456.pdf'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('90%'),
  },
});

export default PdfViewer;