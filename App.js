import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Login from './Screens/Login';
import Register from './Screens/Register';
import Home from   './Screens/Home';
import AddChannel from './Screens/AddChannel';
import ChatScreen from './Screens/ChatScreen';
import ProfileScreen from './Screens/ProfileScreen';
import EditProfileScreen from './Screens/ProfileScreen';
import Account from './Screens/Account';
const Stack = createStackNavigator();
const globalScreenOptions={
  headerStyle: { backgroundColor:"#3F51B5"},
    headerTitleStyle:{color:"white",alignItems:"center",justifyContent:"center"},
    headerTintColor:"white"
  }

export default function App() {
  return (
    < NavigationContainer >
      <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen    name="Welcome to lets talk" component={Login} />
    <Stack.Screen    name="Register" component={Register} />
    <Stack.Screen    name="Home" component={Home} />
    <Stack.Screen    name="AddChannel" component={AddChannel} />
    <Stack.Screen    name="Chat" component={ChatScreen} />
     <Stack.Screen    name="ProfileScreen" component={ProfileScreen} /> 
     {/* <Stack.Screen    name="Edit Profile" component={EditProfileScreen} />  */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
