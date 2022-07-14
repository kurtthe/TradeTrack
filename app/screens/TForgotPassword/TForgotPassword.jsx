import React, { useState } from 'react';
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

import nowTheme from "@constants/Theme";
import Header from '@custom-sections/Header'

import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';
import { AlertService } from '@core/services/alert.service';

const { height, width } = Dimensions.get("screen");
const generalRequestService = GeneralRequestService.getInstance()
const alertService = new AlertService();

export const TForgotPassword = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [email, setEmail] = useState("")


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
        scene={scene}
      />



    </>
  );
}


