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

class Help extends React.Component {
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
              <Block flex middle style={styles.socialConnect}>
                 

              <Block flex={3} top middle style={{top:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 30 :30) :  (Dimensions.get('window').height < 870) ? 30: 40}} >
                 <Image style={styles.introImageStyle}  source={require('@assets/imgs/img/logo.png')}/>
                 </Block>
                 <Block flex={3} top middle style={{top:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? -15 :-50) :  (Dimensions.get('window').height < 870) ? -15: -45}}>
                   <Text
                     style={{
                       fontFamily: 'montserrat-bold',
                       textAlign: 'left'
                     }}
                     color="#2E2F33"
                     
                    size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 20 :22) :  (Dimensions.get('window').height < 870) ? 20: 26}
                   //size={20}
                   >
                    Help Support
                   </Text>
                 </Block>
               </Block>
              
                <Block flex={2}  space="between"  style={{backgroundColor:'transparent', marginHorizontal:20}}>
                  <Block center flex={0.9}>
                    <Block flex space="between" middle> 
                      <Block>
                    
                      <Block flex={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0.3 :0.19) :  (Dimensions.get('window').height < 870) ? 0.255: 0.15} style={{marginTop:
                      (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? -20 :-80) :  (Dimensions.get('window').height < 870) ? -20: -80
                      }} >

                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            numberOfLines={2} 
                            size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 15 :20) :  (Dimensions.get('window').height < 870) ? 15: 20}

                          >
                           This app is only for Burdens Trade Customers.
                          </Text>

                          
                        </Block>

                        <Block flex={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0.3 :0.25) :  (Dimensions.get('window').height < 870) ? 0.255: 0.15} style={{ marginTop:
                      (Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? -30 :10) :  (Dimensions.get('window').height < 870) ? 10: 0
                      }} >

                        <Text
                        color={nowTheme.COLORS.PRETEXT}
                          style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                          row
                          muted
                          numberOfLines={4} 
                          size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 15 :20) :  (Dimensions.get('window').height < 870) ? 15: 20}

                        >
                        If you need help to get access to your trade account or to open one, please contact us on:
                        </Text>


                        </Block>
                      <Block flex={0.1099} style={{marginTop:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0 :20) :  (Dimensions.get('window').height < 870) ? 40: 40, }} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 16 :20) :  (Dimensions.get('window').height < 870) ? 16: 20}
                          >
                          Email
                          </Text>
                        </Block>
                        <Block width={width * 0.9}>
                        <TouchableWithoutFeedback activeOpacity={0.6}  onPress={() => Linking.openURL('mailto:ar@burdens.com.au?subject=Access to the Burdens portal&body=Hi There') }
      title="ar@burdens.com.au" >
                        <Text
                          color={'#444857'}
                          size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 18 :22) :  (Dimensions.get('window').height < 870) ? 18: 22}

                          style={{textDecorationLine: 'underline',top:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0 :0) :  (Dimensions.get('window').height < 870) ? 10: 10}}
                          >
                         ar@burdens.com.au
                          </Text>
                          </TouchableWithoutFeedback>
                        </Block>
                        <Block flex={0.1} style={{marginTop:30}} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{  marginLeft: 0, fontFamily: 'montserrat-regular',fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 16 :20) :  (Dimensions.get('window').height < 870) ? 16: 20}

                          >
                          Phone Number
                          </Text>
                        </Block>
                        <Block width={width * 0.9} >
                        <TouchableWithoutFeedback activeOpacity={0.6}  onPress={()=>{this.dialCall('03 9703 8400')}}>
                        <Text
                          color={'#444857'}
                          size={(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 18 :22) :  (Dimensions.get('window').height < 870) ? 18: 22}

                          style={{textDecorationLine: 'underline',top:(Platform.OS === 'ios') ? ( (Dimensions.get('window').height < 670) ? 0 :0) :  (Dimensions.get('window').height < 870) ? 10: 10}} 
                          >
                         03 9703 8400
                          </Text>
                       </TouchableWithoutFeedback>
                        </Block>
                    
                      </Block>
                      <Block center>
                        <Button
                          color="info"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                          style={styles.button}
                          onPress={() => navigation.navigate("Login")}
                          
                        >
                          Back
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

export default Help;
