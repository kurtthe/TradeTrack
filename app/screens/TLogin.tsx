import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Button, DismissKeyboard, Input } from '@components';
import ForgotButton from '@components/ForgotButton';
import SimpleButton from '@components/SimpleButton';
import nowTheme from '@constants/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from '@expo/vector-icons/MaterialIcons';
import { GeneralRequestService } from '@core/services/general-request.service';
import { connect } from 'react-redux';
import { sign, logout } from '@core/module/store/auth/reducers/login';
import { clearProducts } from '@core/module/store/cart/cart';
import { images } from '../../assets/imgs/img';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');
const generalRequest = GeneralRequestService.getInstance();

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [hidePass, setHidePass] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const dataLogin = {
      username: email,
      password: password,
    };

    const resLogin = await generalRequest.auth(dataLogin);

    if (!!resLogin) {
      const data = {
        ...resLogin.body,
        company: resLogin.headers['tradetrak-company'],
      };
      setEmail('')
      setPassword('')
      sign(data);
    }
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <DismissKeyboard>
        <Block flex middle style={{ backgroundColor: '#fff' }}>
          <Block flex space="evenly">
            <Block flex middle style={styles.socialConnect}>
              <Block
                flex={3}
                top
                middle
                style={{
                  top:
                    Platform.OS === 'ios'
                      ? Dimensions.get('window').height < 670
                        ? 15
                        : 30
                      : Dimensions.get('window').height < 870
                        ? 15
                        : 40,
                }}
              >
                <Image
                  style={styles.introImageStyle}
                  source={images.logo}
                />
              </Block>
              <Block flex={2} top>
                <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    textAlign: 'left',
                    top: 15,
                  }}
                  color="#2E2F33"
                  size={
                    Platform.OS === 'ios'
                      ? Dimensions.get('window').height < 670
                        ? 16
                        : 18
                      : Dimensions.get('window').height < 870
                        ? 18
                        : 20
                  }
                >
                  Welcome Back,{'\n'}
                  Please sign in with your account
                </Text>
              </Block>
            </Block>

            <Block flex={2.5} space="between" style={{ backgroundColor: 'transparent' }}>
              <Block center flex={1}>
                <Block flex space="between" middle>
                  <Block>
                    <Block width={width * 0.9} style={{ paddingTop: 20 }}>
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
                        onChangeText={(event: string) => setEmail(event)}
                        autoCapitalize="none"
                      />
                      <Text
                        color={nowTheme.COLORS.PRETEXT}
                        style={{
                          marginLeft: 0,
                          fontFamily: 'montserrat-regular',
                          top: 10,
                        }}
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
                        Password
                      </Text>
                    </Block>

                    <Block width={width * 0.9} style={{ paddingTop: 10 }}>
                      <Input
                        iconContent={<Block />}
                        placeholder="Enter your correct password"
                        secureTextEntry={hidePass}
                        onChangeText={(event: string) => setPassword(event)}
                      />
                      <Icon
                        style={styles.icon}
                        name={hidePass ? 'visibility' : 'visibility-off'}
                        size={20}
                        color={nowTheme.COLORS.ICON}
                        onPress={() => setHidePass(!hidePass)}
                      />
                    </Block>
                    <Block middle right>
                      <ForgotButton onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                      </ForgotButton>
                    </Block>
                  </Block>
                  <Block
                    flex={
                      Platform.OS === 'ios'
                        ? Dimensions.get('window').height < 670
                          ? 0.8
                          : 0.55
                        : Dimensions.get('window').height < 870
                          ? 0.8
                          : 0.4
                    }
                    center
                  >
                    <Button
                      color="info"
                      textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                      style={styles.button}
                      onPress={handleLogin}
                      loading={loading}
                    >
                      Login
                    </Button>

                    <SimpleButton onPress={() => navigation.navigate('Help')}>
                      {' '}
                      <Text style={{ textDecorationLine: 'underline' }}>Need Help?</Text>
                    </SimpleButton>

                    <Block style={{ top: 20 }} row middle space="between">
                      <Text color={'#444857'} size={15}>
                        Don't have an account yet?
                      </Text>
                    </Block>

                    <Block style={{ top: 20 }} row middle space="between">
                      <SimpleButton onPress={() => navigation.navigate('SignUp')}>
                        {' '}
                        Learn how to open a new account
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

const styles = StyleSheet.create({
  body: {
    width: '100%',
    flex: 1,
    paddingBottom: 200,
  },

  scrollChild: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },

  registerContainer: {
    marginTop: 55,
    width: width,
    height: height < 812 ? height * 0.8 : height * 0.9,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
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
    justifyContent: 'space-around',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginHorizontal: 5,
  },

  button: {
// @ts-ignore
    marginBottom: theme.SIZES.BASE,
// @ts-ignore
    width: width - theme.SIZES.BASE * 3,
    bottom: 20,
  },

  introImageStyle: {
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? wp('37%')
          : wp('40%')
        : Dimensions.get('window').height < 870
        ? wp('29%')
        : wp('40%'),
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height < 670
          ? hp('10%')
          : hp('40%')
        : Dimensions.get('window').height < 870
        ? hp('29%')
        : hp('40%'),
    resizeMode: 'contain',
  },

  icon: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
});

const mapStateToProps = (state: any) => ({
  token_login: state.loginReducer.api_key,
});

const mapDispatchToProps = { sign, logout, clearProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
