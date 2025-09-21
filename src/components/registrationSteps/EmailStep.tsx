import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AppTextInput from "../AppTextInput";
import AppButton from "../AppButton";
import { Colors } from "../../constants/Colors";

interface EmailStepProps {
  initialEmail: string;
  onNext: (data: { email: string }) => void;
  onBack: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({
  initialEmail,
  onNext,
  onBack,
}) => {
  const [email, setEmail] = useState(initialEmail);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(emailValue.toLowerCase());
  };

  const handleNext = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu e-mail.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Erro", "E-mail inválido. Verifique o formato.");
      return;
    }
    onNext({ email: email.trim().toLowerCase() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Qual é o seu melhor e-mail?</Text>
      <AppTextInput
        label="Seu E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AppButton title="Próximo" onPress={handleNext} />
      <AppButton
        title="Voltar"
        onPress={onBack}
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    color: Colors.textSecondary,
  },
});

export default EmailStep;
