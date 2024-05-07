import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Login from '@screens/TLogin';
import SignUp from '@screens/TSignUp';
import Help from '@screens/THelp';
import ForgotPassword from '@screens/TForgotPassword';
import ChangePassword from '@screens/TChangePassword';
import PasswordBeenChange from '@screens/TPasswordBeenChange';
import {screensRoute} from './ConfigRoutes'

const Stack = createStackNavigator();

export default function OnboardingStack() {

  const screens = [
    {
      name: 'Onboarding',
      component: Login,
      title: 'Home',
      colorBackground: '#FFFFFF',
      header:true,
      headerTransparent:true
    },
    {
      name: 'Login',
      component: Login,
      title: '',
      colorBackground: '#FFFFFF',
      header:false,
    },
    {
      name: 'SignUp',
      component: SignUp,
      title: '',
      colorBackground: '#FFFFFF',
      header:false,
    },
    {
      name: 'ForgotPassword',
      component: ForgotPassword,
      title: '',
      colorBackground: '#FFFFFF',
      header: true,
    },
    {
      name: 'ChangePassword',
      component: ChangePassword,
      title: '',
      colorBackground: '#FFFFFF',
      header:false,
    },
    {
      name: 'PasswordBeenChange',
      component: PasswordBeenChange,
      title: '',
      colorBackground: '#FFFFFF',
      header:false,
    },
    {
      name: 'Help',
      component: Help,
      title: '',
      colorBackground: '#FFFFFF',
      header:false,
    },

  ];

  return (
    <Stack.Navigator mode="card" headerMode="none">
      {screensRoute(Stack, screens)}
    </Stack.Navigator>
  );
}