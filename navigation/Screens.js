import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Icon } from "../components";
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
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Trending from '../screens/Trending';
import Fashion from '../screens/Fashion';
import Category from '../screens/Category';
import Product from "../screens/Product";
import Gallery from "../screens/Gallery";
import NotificationsScreen from "../screens/Notifications";
import Agreement from "../screens/Agreement";
import About from "../screens/About";
import Privacy from "../screens/Privacy";
import Chat from "../screens/Chat";
import Cart from "../screens/Cart";
import Search from '../screens/Search';
import SettingsScreen from '../screens/Settings';

import PersonalNotifications from "../screens/PersonalNotifications";
import SystemNotifications from "../screens/SystemNotifications";

// drawer
import CustomDrawerContent from './Menu';

// header for screens
import Header from '../components/Header';
import tabs from "../constants/tabs";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const MainTab = createBottomTabNavigator();


function NotificationsStack(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Personal") {
            iconName = "single";
          } else if (route.name === "System") {
            iconName = "paper";
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              family="NowExtra"
              size={22}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: nowTheme.COLORS.PRIMARY,
        inactiveTintColor: nowTheme.COLORS.TIME,
        labelStyle: {
          fontFamily: "montserrat-regular"
        },
        style: { borderTopWidth: '0px', paddingHorizonal: 35 }
      }}
    >
      <Tab.Screen name="Personal" component={PersonalNotifications} />
      <Tab.Screen name="System" component={SystemNotifications} />
      <Tab.Screen name="Systssssem" component={SystemNotifications} />
    </Tab.Navigator>
  );
}

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
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="About" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Cart"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Cart" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
            <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
            <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Rachel Brown"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
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
        name="Trending"
        component={Trending}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Trending"
              back
              tabs={tabs.trending}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          header: ({ navigation, scene }) => {
            const { params } = scene.descriptor;
            const title = (params && params.headerTitle) || "Category";
            return (<Header title={title} back navigation={navigation} scene={scene} />);
          },
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Fashion"
        component={Fashion}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Fashion"
              back
              tabs={tabs.fashion}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Rachel Brown"
              back
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
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Shopping Cart"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Notifications"
              back
              navigation={navigation}
              scene={scene}
            />
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
              //tabBarBadge: 3,
            }}
          />
          <MainTab.Screen
            name="Cart"
            component={ArticlesStack}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart" color={color} size={size} />
              ),
            }}
          />
          <MainTab.Screen
            name="Account"
            component={ProfileStack}
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
            name="Manages Job"
            component={AccountStack}
            options={{
              tabBarLabel: 'Manages Job',
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

