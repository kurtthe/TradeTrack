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

import { Button, Icon, Input,  } from '@components';

import SimpleButton from '@components/SimpleButton'
const { height, width } = Dimensions.get("screen");

import nowTheme from "@constants/Theme";
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
           
              <Block flex space="evenly">
                <Block flex={0.4}  style={styles.socialConnect}>
                 

                <Block flex={3}  middle style={{top:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 15 :30) :  (Dimensions.get('window').height < 870) ? 15: 40}} >
                  <Image style={styles.introImageStyle}  source={require('@assets/imgs/img/logo.png')}/>
                  </Block>
                  
                </Block>
              
                <Block flex={1.5}  space="between"  style={{backgroundColor:'transparent'}}>
                  <Block center flex={0.9}>
                    <Block flex space="between" middle> 
                      <Block>
                      <Block  middle>
                  <Image style={styles.introImageStyle}  source={require('@assets/imgs/img/sentEmail.png')}/>
                  </Block>
                  <Block width={width * 0.9} >
                     
                        <Block middle >
                      
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                           
                          }}
                           color="#2E2F33"
                           size={20}
                         // style={{textDecorationLine: 'underline',}}
                          >
                     Password Reset Sent
                          </Text>
                          
                        </Block>
                        <Block  middle style={{marginTop:30, }} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0, fontFamily: 'montserrat-regular',fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                            Please check your email to reset your password.
                          </Text>
                        </Block>

                       
                      
                        </Block>
                      </Block>
                      <Block flex={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0.2 :0.45) :  (Dimensions.get('window').height < 870) ? 0.3: 0.4} center  >
                        <Button
                          color="warning"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16, color:'#0E3A90' }}
                          style={styles.button}
                          onPress={() => navigation.navigate("Login")}
                          
                        >
                        Login
                        </Button>
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
    
    width: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? wp('35%') : wp('40%')) :  (Dimensions.get('window').height < 870) ? wp('35%') : wp('40%'),
    height: (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? hp('35%') : hp('40%')) :  (Dimensions.get('window').height < 870) ? hp('35%') : hp('40%'),
    resizeMode: 'contain',
    
  },

  icon: {
		position: "absolute",
    right:10,
    top:20,
   
   
	},
});

export default PasswordBeenChange;


