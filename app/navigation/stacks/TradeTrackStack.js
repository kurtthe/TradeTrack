function TradeTrakStack(props) {
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