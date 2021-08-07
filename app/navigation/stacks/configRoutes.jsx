import React from 'react';
import Header from '@components/Header';

const putHeader = (navigation,scene, title, header=true)=>{
  if(header){
    const { headerTitle } = scene.route.params;
    return (
      <Header title={headerTitle || title} navigation={navigation} scene={scene} />
    );
  }
  return null;
}

export const screensRoute = (Stack, screens) => {
  return screens.map(({name, component, title, colorBackground, header, headerTransparent}, index) => (
    <Stack.Screen
      key={index}
      name={name}
      component={component}
      options={{
        [headerTransparent && 'headerTransparent']: headerTransparent,
        [header && 'header']: ({ navigation, scene }) => putHeader(navigation, scene, title, header),
        cardStyle: { backgroundColor: colorBackground }
      }}
    />
  ));
};
