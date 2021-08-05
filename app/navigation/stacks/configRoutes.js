import Header from '@components/Header';

export const screensRoute = (Stack, screens) => {
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
