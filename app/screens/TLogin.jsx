import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Button, Input } from '@components';
import ForgotButton from '@components/ForgotButton';
import SimpleButton from '@components/SimpleButton';
const { height, width } = Dimensions.get('screen');

import nowTheme from '@constants/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

import { GeneralRequestService } from '@core/services/general-request.service';

import { connect } from 'react-redux';
import { sign, logout } from '@core/module/store/auth/reducers/login';
import { clearProducts } from '@core/module/store/cart/cart';
import * as SecureStore from 'expo-secure-store';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
class Login extends React.Component {
  generalRequest;

  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      email: '',
      password: '',
      hidePass: true,
      inputEmailError: true,
      inputPasswordError: true,
      loading: false,
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const tokenStorageExist = await SecureStore.getItemAsync('data_user');

    if (!tokenStorageExist) {
      return;
    }

    this.props.sign(JSON.parse(tokenStorageExist));
    this.redirectLogin();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.token_login !== prevProps.token_login) {
      this.redirectLogin();
    }
    if (!this.props.token_login) {
      const tokenStorageExist = await SecureStore.getItemAsync('data_user');
      if (!tokenStorageExist) {
        this.props.logout();
        this.props.clearProducts();
      }
    }
  }

  redirectLogin() {
    if (!!this.props.token_login) {
      this.props.navigation.navigate('AppStack');
    }
  }

  handleLogin = async () => {
    this.setState({ loading: true });

    const dataLogin = {
      username: this.state.email,
      password: this.state.password,
    };

    const resLogin = await this.generalRequest.auth(dataLogin);

    if (!!resLogin) {
      const data = {
        ...resLogin.body,
        company: resLogin.headers['tradetrak-company'],
      };
      this.setState({ email: '', password: '' });
      this.props.sign(data);
    }

    this.setState({ loading: false });
  };

  handleChangeEmail = (text) => {
    this.setState({ email: text });
  };

  handleChangePassword = (text) => {
    this.setState({ password: text });
  };

  render() {
    const { navigation } = this.props;

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
                    source={require('@assets/imgs/img/logo.png')}
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
                          onChangeText={(event) => this.handleChangeEmail(event)}
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
                          secureTextEntry={this.state.hidePass}
                          onChangeText={(event) => this.handleChangePassword(event)}
                        />
                        <MaterialIcons
                          style={styles.icon}
                          name={this.state.hidePass ? 'visibility' : 'visibility-off'}
                          size={20}
                          color={nowTheme.COLORS.ICON}
                          onPress={() => this.setState({ hidePass: !this.state.hidePass })}
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
                        onPress={() => this.handleLogin()}
                        loading={this.state.loading}
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
    marginBottom: theme.SIZES.BASE,
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
const mapStateToProps = (state) => ({
  token_login: state.loginReducer.api_key,
});

const mapDispatchToProps = { sign, logout, clearProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
