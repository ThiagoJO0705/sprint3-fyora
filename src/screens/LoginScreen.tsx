import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/Colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/types";
import { findUserByEmailAndPassword } from "../utils/AsyncStorageUtils"; // Importar do AsyncStorageUtils
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos vazios", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setIsLoading(true);

    try {
      const foundUser = await findUserByEmailAndPassword(email, password);

      if (foundUser) {
        await login(foundUser); // Usar a função login do AuthContext
      } else {
        Alert.alert("Login Falhou", "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer o login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image
              source={require("../assets/images/fyora-login.png")}
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Fyora</Text>
              <Text style={styles.subtitle}>Sua jornada recomeça aqui</Text>
            </View>
          </View>

          <View style={styles.card}>
            <AppTextInput
              label="Seu E-mail"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            <AppTextInput
              label="Sua Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <AppButton
                title={isLoading ? "" : "Entrar"}
                onPress={handleLogin}
                disabled={isLoading}
              />

              {isLoading && (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  color={Colors.white}
                />
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signupLink}> Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    flexDirection: "row",
  },
  titleContainer: {
    alignItems: "center",
    position: "relative",
    right: 70,
    top: 70,
  },
  logo: {
    width: 280,
    height: 280,
    resizeMode: "contain",
    position: "relative",
    top: 45,
    left: 20,
    zIndex: 10
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    paddingBottom: 32,
  },
  forgotPassword: {
    textAlign: "right",
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },

  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default LoginScreen;