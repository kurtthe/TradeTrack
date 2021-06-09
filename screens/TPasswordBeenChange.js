import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Linking
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input,  } from '../components';

import SimpleButton from '../components/SimpleButton'
const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class PasswordBeenChange extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			isEnabled: false,
			email: "",
			password: "",
			hidePass: true,
		};
    }
    
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };


  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
     <DismissKeyboard>
          <Block flex middle style={{backgroundColor:'#fff'}}>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4}  style={styles.socialConnect}>
                 

                  <Block flex={0.5}  middle >
                  <Image style={styles.introImageStyle}  source={require('../assets/imgs/img/logo.png')}/>
                  </Block>
                  <Block flex={0.5}  middle>
                  <Image style={styles.introImageStyle}  source={require('../assets/imgs/img/check-badge.png')}/>
                  </Block>
                </Block>
              
                <Block flex={0.9}  space="between"  style={{backgroundColor:'transparent'}}>
                  <Block center flex={0.9}>
                    <Block flex space="between" middle> 
                      <Block>
                      <Block flex={0.2} style={{marginTop:10, }} mide >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                      
                          </Text>
                        </Block>
                      <Block flex={0.2} style={{marginTop:10, }} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                      
                          </Text>
                        </Block>
                        <Block middle width={width * 0.9}>
                        <TouchableWithoutFeedback activeOpacity={0.6} >
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                           
                          }}
                           color="#2E2F33"
                           size={20}
                         // style={{textDecorationLine: 'underline',}}
                          >
                       Your Password has been Change
                          </Text>
                          </TouchableWithoutFeedback>
                        </Block>
                        <Block flex={0.2} style={{marginTop:30}} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{  marginLeft: 0, fontFamily: 'montserrat-regular',fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                             Please login again to enter Burdens Portals. Have a nice day!
                          </Text>
                        </Block>
                      
                    
                      </Block>
                      <Block center>
                        <Button
                          color="warning"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
                          style={styles.button}
                          onPress={() => navigation.navigate("Login")}
                          
                        >
                        Login
                        </Button>
                      </Block>

                            <Block middle >
                            <SimpleButton  onPress={() => navigation.navigate("Help")} >  <Text style={{textDecorationLine: 'underline',}}>Need Help?</Text></SimpleButton>
                        </Block>
                      
                        </Block>
                  
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
      
    
          </DismissKeyboard>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: 55,
    width: width * 1,
    height: height < 812 ? height * 0.8 : height * 0.9,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
	container: {
		flex: 1,
	},
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginHorizontal:20
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
  },

  introImageStyle: {
    
    width: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? wp('37%') : wp('40%')) :  (Dimensions.get('window').height < 870) ? wp('29%') : wp('40%'),
    height: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? hp('10%') : hp('40%')) :  (Dimensions.get('window').height < 870) ? hp('29%') : hp('40%'),
    resizeMode: 'contain',
    
  },

  icon: {
		position: "absolute",
    right:10,
    top:20,
   
	},
});

export default PasswordBeenChange;



