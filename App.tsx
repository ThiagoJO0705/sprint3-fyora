import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, Text } from "react-native"; 
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import MainNavigator from "./src/navigation/TabNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { getAllUsers, clearAllUsers, clearAllPosts } from "./src/utils/AsyncStorageUtils"; 

const AppContent = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
 
    const fetchAndLogUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log("Todos os usuários no AsyncStorage:", users);
      } catch (error) {
        console.error("Erro ao buscar usuários para o console:", error);
      }
    };

    fetchAndLogUsers();
    //clearAllUsers();  
     //clearAllPosts();
  }, []); 
 
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}