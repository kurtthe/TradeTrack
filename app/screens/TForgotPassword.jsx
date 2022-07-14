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

import { Button, Icon, Input, } from '@components';
import ForgotButton from '@components/ForgotButton'
import SimpleButton from '@components/SimpleButton'
const { height, width } = Dimensions.get("screen");

import nowTheme from "@constants/Theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from "@expo/vector-icons";
import Header from '@custom-sections/Header'

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
  handleChangeEmail = (text) => {
    this.setState({ email: text });
  };
  render() {
    const { navigation, scene } = this.props;

    return (
      <>
        <Header
          back={true}
          navigation={navigation}
          scene={scene}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <DismissKeyboard>
            <Block flex middle style={{ backgroundColor: '#fff' }}>


              <Block flex space="evenly">
                <Block flex middle style={styles.socialConnect}>


                  <Block flex={3} top middle style={{ top: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 30 : 0) : (Dimensions.get('window').height < 870) ? 30 : 40 }} >
                    <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
                  </Block>
                  <Block flex={3} top middle style={{ top: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 15 : 10) : (Dimensions.get('window').height < 870) ? 15 : 15 }}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'left'
                      }}
                      color="#2E2F33"
                      size={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 20 : 22) : (Dimensions.get('window').height < 870) ? 20 : 26}
                    //size={20}
                    >
                    Forgot your current Password?
                    </Text>
                  </Block>
                  <Block middle top flex={8} style={{ top: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 10 : -20) : (Dimensions.get('window').height < 870) ? 10 : -20 }} width={width * 0.9} >
                    <Text
                      color={nowTheme.COLORS.PRETEXT}
                      style={{ fontFamily: 'montserrat-regular', }}
                      row
                      muted
                      numberOfLines={2}
                      size={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 18 : 20) : (Dimensions.get('window').height < 870) ? 18 : 20}

                    >
                      Enter the form to send you an email for changes the password
                    </Text>
                  </Block>
                </Block>

                <Block flex={2.3} space="between" style={{ backgroundColor: 'transparent', marginTop: 15 }}>
                  <Block center flex={0.9}>
                    <Block flex space="between" middle>

                      <Block>

                        <Block flex={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 0.3 : 0.5) : (Dimensions.get('window').height < 870) ? 0.255 : 0.15} style={{
                          marginTop:
                            (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 45 : 0) : (Dimensions.get('window').height < 870) ? 42 : 0
                        }} >
                           <Text
                          color={nowTheme.COLORS.PRETEXT}
                          style={{ marginLeft: 0, fontFamily: 'montserrat-regular' }}
                          row
                          muted
                          size={
                            Platform.OS === 'ios'
                              ? Dimensions.get('window').height < 670
                                ? 16
                                : 20
                              : Dimensions.get('window').height < 870
                                ? 16
                                : 20
                          }
                        >
                          Email
                        </Text>
                        <Input
                          right
                          placeholder="Enter your email here"
                          iconContent={<Block />}
                          shadowless
                          keyboardType={'email-address'}
                          onChangeText={(event) => this.handleChangeEmail(event)}
                          autoCapitalize="none"
                        />
                        </Block>
                       
                        
                        <Block width={width * 0.9} >
                         
                        </Block>
                      </Block>
                      <Block flex={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 0.8 : 0.45) : (Dimensions.get('window').height < 870) ? 1 : 0.4} center style={{ bottom: 20 }} >
                        <Button
                          color="info"
                          textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                          style={styles.button}
                          onPress={() => navigation.navigate("PasswordBeenChange")}

                        >
                         Send Email
                        </Button>

                        <SimpleButton onPress={() => navigation.navigate("Help")}>  <Text style={{ textDecorationLine: 'underline', }}>Need Help?</Text></SimpleButton>

                        <Block style={{ top: 20 }} row middle space="between">

                          <Text
                            color={'#444857'}
                            size={15}
                          >
                            Already remember your password?
                          </Text>
                          <SimpleButton onPress={() => navigation.navigate("Login")}
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
      </>
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
    marginHorizontal: 2.5,
    top: 30
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 3,
    bottom: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 10 : 20) : (Dimensions.get('window').height < 870) ? 1 : 20
  },

  introImageStyle: {

    width: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? wp('37%') : wp('40%')) : (Dimensions.get('window').height < 870) ? wp('29%') : wp('40%'),
    height: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? hp('10%') : hp('40%')) : (Dimensions.get('window').height < 870) ? hp('29%') : hp('40%'),
    resizeMode: 'contain',

  },

  icon: {
    position: "absolute",
    right: 10,
    top: 20,

  },
});

export default ChangePassword;