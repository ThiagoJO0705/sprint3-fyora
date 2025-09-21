import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../constants/Colors";
import AppButton from "../components/AppButton";
import ProfileOption from "../components/ProfileOption";


const avatarMap: Record<string, any> = {
  "phoenix-avatar-1": require("../assets/images/phoenix-avatar-1.png"),
  "phoenix-avatar-2": require("../assets/images/phoenix-avatar-2.png"),
  "phoenix-avatar-3": require("../assets/images/phoenix-avatar-3.png"),
};

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Você tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.safeArea}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.welcomeCard}>
          <Image
            source={
              user?.fyoraAvatar && avatarMap[user.fyoraAvatar]
                ? avatarMap[user.fyoraAvatar]
                : avatarMap["phoenix-avatar-3"]
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Olá, {user.name}!</Text>
            <Text style={styles.communityName}>
              Na comunidade, você é a {user.communityUsername}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recompensas Fyora</Text>
        <View style={styles.rewardsContainer}>
          <AppButton title="Loja da Fyora" onPress={() => {}} />
          <View style={{ width: 16 }} />
          <AppButton title="Personalizar Fyora" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Meu Porto Seguro</Text>
        <View style={styles.safeHavenCard}>
          <ProfileOption
            iconName="shield-checkmark-outline"
            title="Contatos de Ajuda"
            onPress={() => {}}
          />
          <ProfileOption
            iconName="call-outline"
            title="Configurar Botão de Ajuda Urgente"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Configuração</Text>
        <View style={styles.settingsCard}>
          <ProfileOption
            iconName="notifications-outline"
            title="Notificações"
            onPress={() => {}}
          />
          <ProfileOption
            iconName="key-outline"
            title="Conta e Segurança"
            onPress={() => {}}
          />
          <ProfileOption
            iconName="eye-outline"
            title="Privacidade"
            onPress={() => {}}
          />
          <ProfileOption
            iconName="information-circle-outline"
            title="Sobre a Fyora"
            onPress={() => {}}
          />
        </View>

        <View style={styles.logoutContainer}>
          <ProfileOption
            iconName="log-out-outline"
            title="Sair"
            isDestructive
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  communityName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  rewardsContainer: {
    gap: 10,
    marginBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  safeHavenCard: {
    backgroundColor: "#FFEADD",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  logoutContainer: {
    marginTop: 24,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
