import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Button, Input, } from '@components';
import SimpleButton from '@components/SimpleButton'

import { GeneralRequestService } from '@core/services/general-request.service'
import { endPoints } from '@shared/dictionaries/end-points';
import { AlertService } from '@core/services/alert.service';
import { makeStyles } from './TForgotPassword.styles'
import { regex } from '@shared/dictionaries/regex'

const generalRequestService = GeneralRequestService.getInstance()
const alertService = new AlertService();

export const TForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const styles = makeStyles()


  const handleRecoverPassword = async () => {
    if (!email) {
      alertService.show('Alert!', 'The email is required.');
      return
    }

    if (!regex.email.test(email)) {
      alertService.show('Alert!', 'Email is not valid');
      return
    }

    const res = await generalRequestService.post(endPoints.forgotPassword, { username: email })

    if (res) {
      navigation.navigate("PasswordBeenChange")
      setEmail("")
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentBody} >
          <View style={styles.content}>
            <Image style={styles.introImageStyle} source={require('@assets/imgs/img/logo.png')} />
          </View>

          <View style={styles.content}>
            <Text style={styles.textTitle} >
              Forgot Password?
            </Text>
            <Text style={styles.subTitle} >
            Enter your email below to reset your password. 
            </Text>
          </View>

          <View style={styles.contentInput}>
            <Text style={styles.labelEmail}>Email</Text>
            <Input
              right
              placeholder="Enter your email here"
              iconContent={<View />}
              shadowless
              keyboardType={'email-address'}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              value={email}
            />
          </View>
        </View>

        <View style={styles.contentFooter}>
          <Button
            style={styles.button}
            onPress={handleRecoverPassword}
          >
           Reset Password
          </Button>

          <TouchableOpacity style={styles.contentHelp} onPress={() => navigation.navigate("Help")}>
            <Text style={styles.textHelp}>Need Help?</Text>
          </TouchableOpacity>

          <View style={styles.contentBackLogin}>
            <Text style={styles.textToLogin}>Remembered your password?
            </Text>
            <SimpleButton onPress={() => navigation.navigate("Login")}
            > Login</SimpleButton>

          </View>
        </View>
      </View>
    </>
  );
}


