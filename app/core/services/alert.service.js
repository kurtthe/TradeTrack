import { Alert } from "react-native";

export class AlertService {
  show(title, message) {
    Alert.alert(
      `${title || 'Opps!'}`,
      `${message || 'Error, please try again'}`,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
}
