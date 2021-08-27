import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import { nowTheme } from '@constants';
import { endPoints } from '@shared/dictionaries/end-points';

import { FormatMoneyService } from '@core/services/format-money.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';

const formatMoney = FormatMoneyService.getInstance();

const Statement = (props) => {
  const [showModal, setShowModal] = useState(false);

  const urlDownloadFile = endPoints.downloadStatementDetail.replace(':id', props.statement.id);
  const dateStatement = `${props.statement.created_date}`.split(' ');

  return (
    <>
      <Block style={styles.container}>
        <Block row>
          <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
            <Block row space="between" style={{ height: 40, paddingTop: 10 }}>
              <Block row>
                <Text
                  color={nowTheme.COLORS.DEFAULT}
                  style={{ fontFamily: 'montserrat-bold' }}
                  size={14}
                >
                  Statement
                </Text>
                <Text
                  color={nowTheme.COLORS.INFO}
                  style={{ fontFamily: 'montserrat-bold', left: 10 }}
                  size={14}
                >
                  {props.statement.id}
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
                  {dateStatement[0]}
                </Text>
              </Block>
            </Block>

            <Block row justifyContent="space-between">
              <Text
                color={nowTheme.COLORS.HEADER}
                size={15}
                style={{ fontFamily: 'montserrat-regular', marginTop: 20 }}
              >
                Burdens Statement
              </Text>

              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Ionicons
                  style={{ left: -10, top: -5 }}
                  name="eye"
                  color={nowTheme.COLORS.LIGHTGRAY}
                  size={20}
                />
              </TouchableOpacity>
            </Block>
            <Block row style={{ marginTop: -10 }}></Block>
            <Block bottom>
              <Text
                style={{ fontFamily: 'montserrat-bold', marginTop: -9, left: -12 }}
                size={theme.SIZES.BASE * 1}
                color={nowTheme.COLORS.HEADER}
              >
                {formatMoney.format(props.statement.total)}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
      <BottomModal show={showModal} close={() => setShowModal(false)}>
        <PdfViewer url={urlDownloadFile} />
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
  },
});

export default Statement;
