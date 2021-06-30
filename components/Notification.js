import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import PropTypes from "prop-types";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import { nowTheme } from "../constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Notification extends React.Component {
  render() {
    const {
      body,
      color,
      iconColor,
      iconFamily,
      iconName,
      iconSize,
      onPress,
      style,
      system,
      time,
      title,
      transparent,
      reference,
      done,
      price
    } = this.props;

    const iconContainer = [
      styles.iconContainer,
      { backgroundColor: color || nowTheme.COLORS.PRIMARY },
      system && { width: 34, height: 34 }
    ];

    const container = [
      styles.card,
      !transparent && { backgroundColor: nowTheme.COLORS.WHITE },
      !transparent && styles.cardShadow,
      system && { height: 150},
      style
    ];
    return (
      <Block style={container} middle>
        <TouchableWithoutFeedback onPress={onPress}>
          <Block row style={{ width: "100%" }}>
            
            <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
              {system && (
                <Block row space="between" style={{ height: 40 }}>
                  <Text color={nowTheme.COLORS.DEFAULT} style={{ fontFamily: 'montserrat-bold', paddingTop:8 }} size={14}>{title}</Text>
                  <Text color={nowTheme.COLORS.INFO} style={{ fontFamily: 'montserrat-bold', top:30, left:0, position:'absolute' }} size={14}>{reference}</Text>
                  <Block row style={{ marginTop: 3 }}>
                    
                    <Text
                      color={nowTheme.COLORS.TIME}
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: -85,
                        paddingTop:8
                      }}
                      size={14}
                    >
                      {time}
                    </Text>
                  </Block>
                </Block>
              )}
              <Text
                color={nowTheme.COLORS.HEADER}
                size={system ? 13 : 14}
                style={{ fontFamily: "montserrat-regular", marginTop:25 }}
              >
                {body}
              </Text>
              <Block row style={{ marginTop: -5 }}>

                <View style={styles.bg_green}>
          
                <Text
                    style={{ fontFamily: 'montserrat-regular', paddingTop:2.5 }}
                    size={theme.SIZES.BASE * 0.80}
                    color={nowTheme.COLORS.SUCCESS}
                  >
                    {done}
                  </Text>       
                </View>
                  
                </Block>
                <Block bottom>
                  <Text
                    style={{ fontFamily: 'montserrat-bold', marginTop:-15 ,  left: -15,}}
                    size={theme.SIZES.BASE * 1}
                    color={nowTheme.COLORS.HEADER}
                  >
                    ${price}
                  </Text>
                </Block>
            </Block>
        
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Notification.propTypes = {
  body: PropTypes.string,
  color: PropTypes.string,
  iconColor: PropTypes.string,
  iconFamily: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.object,
  system: PropTypes.bool,
  time: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
};

const styles = StyleSheet.create({

  card: {
    zIndex: 2,
    height: 127,
    borderRadius: 3
  },
  cardShadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: .1,
    elevation: 2
  },

  bg_green : {
      width:wp('20%'),
      height:25,
      backgroundColor:'#ecf8ee',
      borderRadius:30,
      marginTop:20,
      paddingLeft:10
  }
});
