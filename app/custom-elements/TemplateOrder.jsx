import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Block, Text} from 'galio-framework';
import {nowTheme} from '@constants';
import Icon from '@components/Icon';
import {useNavigation} from '@react-navigation/native';

const TemplateOrder = ({item}) => {
  const {navigate} = useNavigation();

  const handleShowDetails = () => {
    navigate('OrderBought', {
      products: item.structure?.sections[0] || [],
    });
  };

  return (
    <Block style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleShowDetails()}>
        <Block row>
          <Block flex style={{paddingRight: 3, paddingLeft: 15}}>
            <Block row space="between" style={{height: 20}}>
              <Block row>
                <Text
                  color={nowTheme.COLORS.DEFAULT}
                  style={{fontFamily: nowTheme.FONT.primaryBold}}
                  size={14}>
                  Template
                </Text>
                <Text
                  color={nowTheme.COLORS.INFO}
                  style={{fontFamily: nowTheme.FONT.primaryBold, left: 5}}
                  size={14}>
                  {item.order_name}
                </Text>
              </Block>
            </Block>
            <Block row justifyContent="space-between" style={{top: 8}}>
              <Text
                color={nowTheme.COLORS.HEADER}
                size={13}
                style={{fontFamily: nowTheme.FONT.primaryRegular}}>
                {item.notes}
              </Text>
              <Icon
                style={{left: -20}}
                size={14}
                color={nowTheme.COLORS.LIGHTGRAY}
                name="right"
                family="AntDesign"
              />
            </Block>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: nowTheme.COLORS.WHITE,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 3,
    marginBottom: 2,
  },
});
export default TemplateOrder;
