function AppStack(props) {
  return (
    <MainTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#0E3A90',
    }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-stacked" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
          tabBarBadge: 7,
        }}
      />
      <MainTab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="request-quote" color={color} size={size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Job Management"
        component={TradeTrakStack}
        options={{
          tabBarLabel: 'Trade Trak',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="business-center" color={color} size={size}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}