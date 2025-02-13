import { StyleSheet, Text, View}  from 'react-native'
import React from 'react'
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';

const Stack=createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    <Stack.Screen  options={{headerShown:false}} name="Welcome" component={Welcome}/>
    <Stack.Screen  options={{headerShown:false}} name="Home" component={Home}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})