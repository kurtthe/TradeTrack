import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { nowTheme } from "../constants";

// screens
import Home from '../screens/THome';
import Login from '../screens/TLogin';
import SignUp from '../screens/TSignUp';
import Help from '../screens/THelp';
import ForgotPassword from '../screens/TForgotPassword';
import ChangePassword from '../screens/TChangePassword';
import PasswordBeenChange from '../screens/TPasswordBeenChange';


import Products from '../screens/TProduts';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Articles from '../screens/Articles';
import Category from '../screens/Category';
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import Search from '../screens/Search';
import PlaceOrders from '../screens/PlaceOrders';
import orderPlaced from '../screens/OrderPlaced';
import Example from '../screens/DatePicker';
// header for screens
import Header from '../components/Header';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const MainTab = createBottomTabNavigator();

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
    </Stack.Navigator>
  );
}



function CartStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
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

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      
    </Stack.Navigator>
  );
}

function TradeTrakStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Register} options={{
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

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
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

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Login}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PasswordBeenChange" component={PasswordBeenChange} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
}

