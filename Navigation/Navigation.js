import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import TAReport from '../Screens/TAReport';
import { FontAwesome5, MaterialIcons, Entypo,Feather } from "@expo/vector-icons";
import Profile from '../Screens/Profile';
import Purchase from '../Screens/Purchase';
import NewPurchase from '../Screens/NewPurchase';
import Sale from '../Screens/Sale';
import NewSale from '../Screens/NewSale';
import EditProfile from '../Screens/EditProfile';
import ChangePassword from '../Screens/ChangePassword';
import AddPurchaseForm from '../Screens/AddPurchaseForm';
import AddSaleForm from '../Screens/AddSaleForm';
import EditPurchase from '../Screens/EditPurchase';

const Tab = createBottomTabNavigator();

function Bottom() {
    return (
        <Tab.Navigator
          initialRouteName="Dashboard"
          
          screenOptions={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { fontSize: 10, marginBottom: 5 },
            tabBarInactiveTintColor: "#cccccc",
            tabBarActiveTintColor: "#91d93f",
            tabBarStyle: {
              height: 55,
              position: "absolute",
              borderRadius:30,
              marginHorizontal:20, marginBottom:20,
            //   backgroundColor:"transparent", shadowColor:"transparent"
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Purchase"
            component={Purchase}
            options={{
              tabBarLabel: "Purchase",
              tabBarIcon: ({ color }) => (
                <Feather name="box" size={30} color={color} /> ),
            }}
          />
          <Tab.Screen
            name="Sale"
            component={Sale}
            options={{
              tabBarLabel: "Sale",
              tabBarIcon: ({ color }) => (
                <Entypo name="shopping-cart" size={30} color={color} /> ),
            }}
          />
           <Tab.Screen
            name="TAReport"
            component={TAReport}
            options={{
              tabBarLabel: "TAReport",
              tabBarIcon: ({ color }) => (
                <Entypo name="location" size={30} color={color} /> ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="user" size={28} color={color} />
              ),
            }}
          />
          
        </Tab.Navigator>
      );
}
 
const Stack = createNativeStackNavigator();
function Navigation (props){
  return (
    <NavigationContainer>
        <Stack.Navigator>
            
            <Stack.Screen options={{headerShown:false}} name="Login" component={Login}/>
            <Stack.Screen options={{headerShown:false}} name="Bottom" component={Bottom}/>
            <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard}/>
            <Stack.Screen options={{headerShown:false}} name="NewPurchase" component={NewPurchase}/>
            <Stack.Screen options={{headerShown:false}} name="AddPurchaseForm" component={AddPurchaseForm}/>
            <Stack.Screen options={{headerShown:false}} name="EditPurchase" component={EditPurchase}/>
            <Stack.Screen options={{headerShown:false}} name="NewSale" component={NewSale}/>
            <Stack.Screen options={{headerShown:false}} name="AddSaleForm" component={AddSaleForm}/>
            <Stack.Screen options={{headerShown:false}} name="EditProfile" component={EditProfile}/>
            <Stack.Screen options={{headerShown:false}} name="ChangePassword" component={ChangePassword}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation