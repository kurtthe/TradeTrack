import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const putIcon = (color,size, typeIcon, icon)=>{
  if(typeIcon == 'Ionicons'){
    return <Ionicons name={icon} color={color} size={size} />
  }
  return <MaterialIcons name={icon} color={color} size={size} />
}

const getHeader = (navigation, route, options, ComponentHeader=false) => {
  if(!ComponentHeader){
    return null;
  }
  return <ComponentHeader />;
}



export const ConfigRouteMain = (MainTab, screens) => {
  return screens.map(({ name, component, typeIcon, icon, title, header }, index) => (
    <MainTab.Screen
      key={index}
      name={name}
      component={component}
      options={{
        tabBarLabel: title,
        tabBarIcon: ({ color, size }) => putIcon(color, size, typeIcon, icon),
        header: ({ navigation, route, options }) => getHeader(navigation, route, options, header)
      }}
    />
  ));
};
