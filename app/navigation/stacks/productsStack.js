function ProductsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Products" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          header: ({ navigation, scene }) => {
            const { headerTitle } = scene.route.params;
            const title = headerTitle || "Category";
            return (<Header title={title} back navigation={navigation} scene={scene}  />);
          },
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Product";
            return (<Header title={title} back navigation={navigation} scene={scene} />);
          },
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
        <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Search" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}