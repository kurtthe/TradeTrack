import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import { nowTheme } from '@constants';
import { endPoints } from '@shared/dictionaries/end-points';
import { GeneralRequestService } from '@core/services/general-request.service';
import { FormatMoneyService } from '@core/services/format-money.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';
import moment from 'moment';
import { validateEmptyField } from '@core/utils/validate-empty-field';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('screen');

const formatMoney = FormatMoneyService.getInstance();
const generalRequestService = GeneralRequestService.getInstance();

const Statement = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [urlFilePdf, seturlFilePdf] = useState('');


  const handleDownloadFile = async () => {
    
    const urlDownloadFile = endPoints.downloadStatementDetail.replace(':id', props.statement.id);
    const result = await generalRequestService.get(urlDownloadFile)
    
    seturlFilePdf (result);
    setShowModal(true);
     
  
  };

  //const urlDownloadFile = endPoints.downloadStatementDetail.replace(':id', props.statement.id);
  const urlDownloadFile = 'http://zoada-au.com/response.pdf';


  let dateStatement = validateEmptyField(props.statement.created_date);

  if (dateStatement !== 'N/A') {
    dateStatement = moment(dateStatement).format('YYYY-MM-DD');
  }

  return (
    <>
      <Block style={styles.container}>
        <Block row>
          <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
            <TouchableOpacity  onPress={() => handleDownloadFile()}>
              <Block row space="between" style={{ height: 20, paddingTop: 0 }}>
                <Block row>
                  <Text
                    color={nowTheme.COLORS.DEFAULT}
                    style={{ fontFamily: 'montserrat-bold' }}
                    size={15.5}
                  >
                    Statement
                  </Text>
                </Block>
                <Block row>
                  <Text
                    color={nowTheme.COLORS.TIME}
                    style={{
                      fontFamily: 'montserrat-regular',
                      paddingRight: 10,
                    }}
                    size={14}
                  >
                    {dateStatement}
                  </Text>
                </Block>
              </Block>

              <Block row justifyContent="space-between">
                <Text
                  color={nowTheme.COLORS.HEADER}
                  size={15}
                  style={{ fontFamily: 'montserrat-regular', marginTop: 20 }}
                ></Text>

                <Ionicons
                  style={{ left: -10 }}
                  name="eye"
                  color={nowTheme.COLORS.LIGHTGRAY}
                  size={20}
                />
              </Block>
              <Block row style={{ marginTop: -10 }}></Block>
              <Block bottom>
                <Text
                  style={{ fontFamily: 'montserrat-bold', marginTop: 0, left: -12 }}
                  size={theme.SIZES.BASE * 1}
                  color={nowTheme.COLORS.HEADER}
                >
                  {formatMoney.format(props.statement.new)}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <BottomModal show={showModal} close={() => setShowModal(false)}>
        <View style={{ height: hp('80%') }}>
          <PdfViewer url={urlFilePdf} />
        </View>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    zIndex: 2,
    height: 'auto',
    borderRadius: 3,
    marginBottom: 5,
    width: width,
  },
});

export default Statement;
