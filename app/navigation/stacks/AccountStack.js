import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import TAccount from '@screens/TAccounts';
import Search from '@screens/Search';
import Header from '@components/Header';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Account',
    component: TAccount,
    title: 'Home',
    colorBackground: '#FFFFFF'
  },
  {
    name: 'Search',
    component: Search,
    title: 'Search',
    colorBackground: '#FFFFFF'
  }
];

function AccountStack() {

  const screensRoute = () => {
    return screens.map(({name, component, title, colorBackground}, index) => (
      <Stack.Screen
        key={index}
        name={name}
        component={component}
        options={{
          header: ({ navigation, scene }) => (
            <Header title={title} navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: colorBackground }
        }}
      />
    ));
  };

  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
    >
      {screensRoute()}
    </Stack.Navigator>
  );
}

export default AccountStack;
