import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TradeTrak from '@screens/TradeTrak';

const Stack = createStackNavigator();

function TradeTrakStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={TradeTrak} options={{
        header: ({ navigation, scene }) => null,
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }} />
    </Stack.Navigator>
  );
}

export default TradeTrakStack
