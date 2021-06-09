import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input,  } from '../components';
import ForgotButton from '../components/ForgotButton'
import SimpleButton from '../components/SimpleButton'
const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ChangePassword extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			isEnabled: false,
			email: "",
			password: "",
			hidePass: true,
		};
	}
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
                 

                  <Block flex={0.5} top middle >
                  <Image style={styles.introImageStyle}  source={require('../assets/imgs/img/logo.png')}/>
                  </Block>
                  <Block flex={0.5} top middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'left'
                      }}
                      color="#2E2F33"
                      size={20}
                    >
                     Changes Password
                    </Text>
                  </Block>
                  <Block middle top flex={0.2}  width={width * 0.9} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                            

                            Please fill in a maximum of 8-16 characters with numbers
                          </Text>
                        </Block>
                </Block>
              
                <Block flex={0.9}  space="between"  style={{backgroundColor:'transparent', marginTop:15}}>
                  <Block center flex={0.9}>
                    <Block flex space="between" middle> 
                    
                      <Block>
                      <Block flex={0.2} style={{marginTop:10, }} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{ marginLeft: 0,   fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                          New Password
                          </Text>
                        </Block>
                        <Block width={width * 0.9}>
                        <Input
                          secureTextEntry={true}
                          iconContent={<Block />}
                          placeholder="⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛"
                          secureTextEntry={this.state.hidePass ? true : false}
                        />
                         <MaterialIcons
                             style={styles.icon}
                             name={this.state.hidePass ? "visibility" : "visibility-off"}
                             size={20}
                             color={nowTheme.COLORS.ICON}
                             onPress={() =>
                               this.setState({ hidePass: !this.state.hidePass })
                             }
                           />
                        </Block>
                        <Block flex={0.2} style={{marginTop:30}} >
                          <Text
                          color={nowTheme.COLORS.PRETEXT}
                            style={{  marginLeft: 0, fontFamily: 'montserrat-regular',fontFamily: 'montserrat-regular',}}
                            row
                            muted
                            size={15}
                          >
                          Confirm Password
                          </Text>
                        </Block>
                        <Block width={width * 0.9} >
                        <Input
                          secureTextEntry={true}
                          iconContent={<Block />}
                          placeholder="⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛⊛"
                          secureTextEntry={this.state.hidePass ? true : false}
                        />
                         <MaterialIcons
                             style={styles.icon}
                             name={this.state.hidePass ? "visibility" : "visibility-off"}
                             size={20}
                             color={nowTheme.COLORS.ICON}
                             onPress={() =>
                               this.setState({ hidePass: !this.state.hidePass })
                             }
                           />
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color="info"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                          style={styles.button}
                          onPress={() => navigation.navigate("PasswordBeenChange")}
                          
                        >
                         Changes Password
                        </Button>
                      </Block>

                            <Block middle >
                            <SimpleButton onPress={() => navigation.navigate("Help")}>  <Text   style={{textDecorationLine: 'underline',}}>Need Help?</Text></SimpleButton>
                        </Block>
                        <Block style={{top:20}} row middle space="between">
                          
                          <Text
                          color={'#444857'}
                          size={15}
                          >
                         Already remember your password?
                          </Text>
                        <SimpleButton 	  onPress={() => navigation.navigate("Login")}
                  > Login</SimpleButton>
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

export default ChangePassword;
