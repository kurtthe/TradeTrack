import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TradeTrak from '@screens/TradeTrak';
import Header from '@components/Header';

const Stack = createStackNavigator();

function TradeTrakStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={TradeTrak} options={{
        header: ({ navigation, scene }) => (
          <Header 
            title="Manages Job"
            transparent
            iconColor={'#333'}
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }} />
    </Stack.Navigator>
  );
}

export default TradeTrakStack
