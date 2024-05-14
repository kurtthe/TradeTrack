import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

const DismissKeyboard: React.FC<Props> = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default DismissKeyboard
