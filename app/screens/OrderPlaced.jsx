import React from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Linking
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button } from '@components';

import SimpleButton from '@components/SimpleButton'
const { height, width } = Dimensions.get("screen");

import nowTheme from "@constants/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class orderPlaced extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { navigation } = this.props;

    return (
        <Block flex middle style={{backgroundColor:'#fff'}}>
            <Block flex space="evenly">
                <Block flex={0.4}  style={styles.socialConnect}>
                    <Block flex={0.5}  middle >
                        <Image style={styles.introImageStyle}  source={require('@assets/imgs/img/logo.png')}/>
                    </Block>
                </Block>
                <Block flex={0.9} space="between"  style={{backgroundColor:'transparent'}}>
                    <Block center flex={0.9}>
                        <Block flex space="between" middle> 
                            <Block flex={0.5}  middle>
                                <Image style={styles.introImageStyle}  source={require('@assets/imgs/delivery-truck-clock.png')}/>
                            </Block>
                            <Block middle width={width * 0.9}>
                                <Text
                                    style={{
                                        fontFamily: 'montserrat-bold',
                                    }}
                                    color="#2E2F33"
                                    size={20}
                                    // style={{textDecorationLine: 'underline',}}
                                >
                                    Order submitted
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'montserrat-bold',
                                        textDecorationLine: 'underline'
                                    }}
                                    color="#2E2F33"
                                    size={20}
                                    // style={{textDecorationLine: 'underline',}}
                                >
                                    MO1223123
                                </Text>
                            </Block>
                            <Block flex={0.2} width={width * 0.7} style={{marginTop:10}} >
                                <Text
                                    color={nowTheme.COLORS.PRETEXT}
                                    style={{ textAlign: 'center', marginLeft: 0, fontFamily: 'montserrat-regular',fontFamily: 'montserrat-regular',}}
                                    row
                                    muted
                                    size={15}
                                >
                                    Thank you for your ordering, please wait for a minute
                                </Text>
                            </Block>
                            <Block center>
                                    <Button
                                        color="warning"
                                        textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
                                        style={styles.button}
                                        onPress={() => navigation.navigate("Cart")}
                                    >
                                        Back to Home
                                    </Button>
                            </Block>
                        </Block>
                  </Block>
                </Block>
              </Block>
          </Block>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },

  introImageStyle: {
    
    width: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? wp('37%') : wp('40%')) :  (Dimensions.get('window').height < 870) ? wp('29%') : wp('40%'),
    height: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? hp('10%') : hp('40%')) :  (Dimensions.get('window').height < 870) ? hp('29%') : hp('40%'),
    resizeMode: 'contain',
    
  }
});

export default orderPlaced;


