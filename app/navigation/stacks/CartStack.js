function CartStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
  {/*      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          headerLeft: () => (
            <Icon
              style={{paddingLeft: 15}}
              name={'minimal-left2x'}
              family="NowExtra"
              size={18}
              onPress={() => props.navigation.goBack()}
              color={nowTheme.COLORS.ICON}
            /> 
          )
          // header: ({ navigation, scene }) => (
          //   <Header title="Cart" navigation={navigation} scene={scene} />
          // ),
          // cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      /> */}

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Cart" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="PlaceOrders"
        component={PlaceOrders}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Place Orders" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
        <Stack.Screen
        name="DatePicker"
        component={Example}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="DatePicker" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="OrderPlaced"
        component={orderPlaced}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}