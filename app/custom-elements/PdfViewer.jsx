// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import PDFReader from 'rn-pdf-reader-js';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const PdfViewer = (props) => {
//   return (
//     <View style={styles.container}>
//       <PDFReader
//         source={{
//           base64: `data:application/pdf;base64,${props.url}`
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: hp('80%'),
//   },
// });

// export default PdfViewer;

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PdfRead from './PDFRead';

const PdfViewer = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <PdfRead uri={`data:application/pdf;base64,${props.url}`} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default PdfViewer;
