import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View , Dimensions} from "react-native";
import PropTypes from "prop-types";
import { Block, Text, theme } from "galio-framework";
import Icon from "./Icon";
import {  MaterialIcons, Ionicons } from "@expo/vector-icons";
import { nowTheme } from "@constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Notification extends React.Component {
  render() {
    const {
      body,
      color,
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
      system && { height: 95},
      style
    ];
    return (
      <Block style={container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <Block row>
            <Block flex style={{ paddingRight: 3, paddingLeft: 15 }}>
              {system && (
                <Block row space="between" style={{ height: 40, paddingTop:10 }}>

                   <Block row> 
                  <Text color={nowTheme.COLORS.DEFAULT} style={{ fontFamily: 'montserrat-bold', }} size={14}>{title}</Text>
                  <Text color={nowTheme.COLORS.INFO} style={{fontFamily: 'montserrat-bold',  left:10   }} size={14}>{reference}</Text>
                  </Block>
                  <Block row >
                    
                    <Text
                      color={nowTheme.COLORS.TIME}
                      style={{
                        fontFamily: "montserrat-regular",
                        paddingRight:10
                      }}
                      size={14}
                    >
                      {time}
                    </Text>
                  </Block>
                </Block>
              )}
              <Block row justifyContent='space-between'>
                <Text
                  color={nowTheme.COLORS.HEADER}
                  size={system ? 15 : 16}
                  style={{ fontFamily: "montserrat-regular", marginTop:20 }}
                >
                  {body}
                </Text>
               
 
              <Ionicons  style={{left:-10, top:-5}} name="eye" color={nowTheme.COLORS.LIGHTGRAY}  size={20} />
              </Block>
              <Block row style={{ marginTop: -10 }}>

                
                  
                </Block>
                <Block bottom>
                  <Text
                    style={{ fontFamily: 'montserrat-bold', marginTop:-9 ,  left: -12,}}
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
    height: 'auto',
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
      justifyContent:'center',
      alignContent:'center',
  }
});
