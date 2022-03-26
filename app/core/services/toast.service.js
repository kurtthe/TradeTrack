import { ToastAndroid, Platform, Alert } from "react-native"

class ToastService {
  static instance;

  static getInstance() {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  show(message) {
    if (Platform.OS === 'ios') {
      this.alert(message);
      return
    }
    this.toast(message);
  }

  toast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  alert(message) {
    Alert.alert(message);
  }

}

export default ToastService.getInstance();