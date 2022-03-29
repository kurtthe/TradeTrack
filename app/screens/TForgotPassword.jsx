import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Button, Input, } from '@components';
import SimpleButton from '@components/SimpleButton'

import nowTheme from "@constants/Theme";
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

const { width } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      email: "",
      hidePass: true,
    };

    this.generalRequestService = GeneralRequestService.getInstance();
  }

  handleForgotPassword = async () => {
    const data = {
      username: this.state.email
    }
    const res = await this.generalRequestService.post(endPoints.resetPassword, data)
    if (res) {
      this.props.navigation.navigate("ChangePassword")
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <DismissKeyboard>
          <Block flex middle style={{ backgroundColor: '#fff' }}>

            <Block flex space="evenly">
              <Block flex middle style={styles.socialConnect}>

                <Block flex={3} top middle style={{ top: (Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 15 : 30) : (Dimensions.get('window').height < 870) ? 15 : 40 }} >
                  <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
                </Block>
                <Block flex={3} top middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      textAlign: 'left', top: 10
                    }}
                    color="#2E2F33"
                    size={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 16 : 18) : (Dimensions.get('window').height < 870) ? 18 : 20}
                  //size={20}
                  >
                    Forgot your current Password?
                  </Text>
                </Block>
              </Block>

              <Block flex={2.5} space="between" style={{ backgroundColor: 'transparent' }}>
                <Block center flex={0.9}>
                  <Block flex space="between" middle>
                    <Block>
                      <Text
                        color={nowTheme.COLORS.PRETEXT}
                        style={{ marginLeft: 0, fontFamily: 'montserrat-regular', top: 10 }}
                        row
                        muted
                        numberOfLines={2}
                        size={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 16 : 18) : (Dimensions.get('window').height < 870) ? 16 : 18}

                      >
                        Enter the form to send you an email{"\n"}for changes the password
                      </Text>

                      <Block width={width * 0.9} style={{ paddingTop: 60 }}>
                        <Text
                          color={nowTheme.COLORS.PRETEXT}
                          style={{ marginLeft: 0, fontFamily: 'montserrat-regular', }}
                          row
                          muted
                          size={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 16 : 20) : (Dimensions.get('window').height < 870) ? 16 : 20}
                        >
                          Email
                        </Text>
                        <Input
                          right
                          placeholder="Enter your email here"
                          iconContent={<Block />}
                          shadowless
                          keyboardType={"email-address"}
                          value={this.state.email}
                          onChangeText={(val) => this.setState({ email: val })}
                          autoCapitalize='none'
                        />
                      </Block>
                    </Block>
                    <Block flex={(Platform.OS === 'ios') ? ((Dimensions.get('window').height < 670) ? 0.8 : 0.45) : (Dimensions.get('window').height < 870) ? 0.8 : 0.4} center  >
                      <Button
                        color="info"
                        textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                        style={styles.button}
                        onPress={() => this.handleForgotPassword()}
                      >
                        Send Email
                      </Button>
                      <SimpleButton onPress={() => navigation.navigate("Help")} >
                        <Text style={{ textDecorationLine: 'underline', }}>
                          Need Help?
                        </Text>
                      </SimpleButton>
                      <Block style={{ top: 20 }} row middle space="between">
                        <Text
                          color={'#444857'}
                          size={15}
                        >
                          Already remember your password?
                        </Text>
                        <SimpleButton
                          onPress={() => navigation.navigate("Login")}
                        >
                          Login
                        </SimpleButton>
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


export default ForgotPassword;
