import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppTabParamList, RootStackParamList } from "./types";
import { Colors } from "../constants/Colors";

import Header from "../components/Header";
import ProgressScreen from "../screens/ProgressScreen";
import OasisScreen from "../screens/OasisScreen";
import FyoraScreen from "../screens/FyoraScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportScreen from "../screens/ReportScreen";

const Tab = createBottomTabNavigator<AppTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        header: ({ options }) => <Header title={options.title || route.name} />,
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
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen
        name="Progresso"
        component={ProgressScreen}
        options={{
          title: "Meu Progresso",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MeuOasis"
        component={OasisScreen}
        options={{
          title: "Meu Oásis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fyora"
        component={FyoraScreen}
        options={{
          title: "Fyora",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bird" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Comunidade"
        component={CommunityScreen}
        options={{
          title: "Comunidade",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          title: "Meu Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{ presentation: "modal", title: "Relatar Recaída" }}
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
