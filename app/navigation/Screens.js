import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// screens
import Home from '../screens/THome';
import Login from '../screens/TLogin';
import SignUp from '../screens/TSignUp';
import Help from '../screens/THelp';
import ForgotPassword from '../screens/TForgotPassword';
import ChangePassword from '../screens/TChangePassword';
import PasswordBeenChange from '../screens/TPasswordBeenChange';


import Products from '../screens/TProduts';
import TAccount from '../screens/TAccounts';

import TradeTrak from '../screens/TradeTrak';
import Articles from '../screens/Articles';
import Category from '../screens/Category';
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import Search from '../screens/Search';
import PlaceOrders from '../screens/PlaceOrders';
import orderPlaced from '../screens/OrderPlaced';
import Example from '../screens/DatePicker';
import InvoiceDetails from '../screens/InvoiceDetail';
// header for screens
import Header from '@components/Header';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const MainTab = createBottomTabNavigator();
