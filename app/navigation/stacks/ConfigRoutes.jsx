import React from 'react';
import Header from '@custom-sections/Header';

const putHeader = (navigation, scene, header = false) => {
  if (!header) {
    return null;
  }

  return (
    <Header
      title={header.title}
      headerType={header.title}
      back={header.back}
      search={header.search}
      options={header.options}
      navigation={navigation}
      scene={scene}
    />
  );
}

export const screensRoute = (Stack, screens) => {
  return screens.map(({ name, component, colorBackground, header, headerTransparent }, index) => (
    <Stack.Screen
      key={index}
      name={name}
      component={component}
      options={{
        headerTransparent: headerTransparent,
        header: ({ navigation, scene }) => putHeader(navigation, scene, header),
        cardStyle: { backgroundColor: colorBackground }
      }}
    />
  ));
};
