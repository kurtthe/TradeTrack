import React from 'react';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { 
  View, 
  Modal, 
  StyleSheet, 
  ActivityIndicator , 
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,} from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          showModal : false
      }
  }


  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      /> 
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <DismissKeyboard>
        <Block flex middle>
          <Block flex middle>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                  </Block>
                  <Block center>
                    <Button color="info" round style={styles.createButton} onPress={() => this.setState({showModal : !this.state.showModal})} >
                      <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}
                      >
                        Burdens
                      </Text>
                    </Button>
                  </Block>
                  <Block center>
                    <Button color="info" round style={styles.createButton} onPress={() => navigation.navigate("Login")} >
                      <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}
                      >
                        Logout
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </Block>
              <Modal 
                visible={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}
              >
                <View style={styles.modal}>
                  <>
                    <View style={{ width: width*0.9 }}>
                      <TouchableWithoutFeedback
                        onPress={() => this.setState({ showModal: false })}
                      >
                        <Ionicons
                          name={'close'}
                          size={30}
                          style={{alignSelf: 'flex-end'}}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.modalContainer}>
                      <WebView 
                        style={{ flex: 1 }} 
                        source={{uri: 'https://burdensbathrooms.com.au'}}
                        renderLoading={this.ActivityIndicatorLoadingView}
                      />
                    </View>
                  </>
                </View>
              </Modal>
          </Block>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({

  imageBackground: {
    width: width,
    height: height
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  modal : {
    borderWidth: 2,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: 'white'
},
  modalContainer : {
      backgroundColor : 'white',
      width : '100%',
      height : '80%',
      top:10
  },
  ActivityIndicatorStyle: {
      flex: 1,
      justifyContent: 'center',
  },
});

export default Register;




