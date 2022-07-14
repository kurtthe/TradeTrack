import React, { useState } from 'react';
import {
  Image,
  Dimensions,
  View,
  Text
} from 'react-native';

import { Button, Icon, Input, } from '@components';
import ForgotButton from '@components/ForgotButton'
import SimpleButton from '@components/SimpleButton'

import nowTheme from "@constants/Theme";
import Header from '@custom-sections/Header'

import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';
import { AlertService } from '@core/services/alert.service';
import { makeStyles } from './TForgotPassword.styles'

const { height, width } = Dimensions.get("screen");
const generalRequestService = GeneralRequestService.getInstance()
const alertService = new AlertService();

export const TForgotPassword = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [email, setEmail] = useState("")
  const styles = makeStyles()

  const handleChangeEmail = (text) => {
    this.setState({ email: text });
  };

  const handleRecoverPassword = async () => {
    if (!this.state.email) {
      this.alertService.show('Alert!', 'The email is required.');
      return
    }

    await this.generalRequestService.post(endPoints.forgotPassword, { username: this.state.email })
    navigation.navigate("PasswordBeenChange")
  }
  return (
    <>
      <Header
        back={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <View style={styles.contentLogo}>
          <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
        </View>

        <View >
          <Text style={styles.textTitle} >
            Forgot your current Password?
          </Text>
          <Text style={styles.subTitle} >
          Enter the form to send you an email for changes the password
          </Text>
        </View>
      </View>
    </>
  );
}


