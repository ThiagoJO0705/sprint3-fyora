import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthNavigator from './navigation/AuthNavigator';
import { Colors } from './constants/Colors';

export default function App() {
  const userIsLoggedIn = false;

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <AuthNavigator />
    </NavigationContainer>
  );
}