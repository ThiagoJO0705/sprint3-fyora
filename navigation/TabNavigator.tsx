import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { AppTabParamList } from './types';
import { Colors } from '../constants/Colors';

import ProgressScreen from '../screens/ProgressScreen';
import OasisScreen from '../screens/OasisScreen';
import FyoraScreen from '../screens/FyoraScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Progresso"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MeuOasis"
        component={OasisScreen}
        options={{
          title: 'Meu Oásis',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fyora"
        component={FyoraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bird" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Comunidade"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;