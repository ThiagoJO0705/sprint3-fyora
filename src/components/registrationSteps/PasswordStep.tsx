import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { Colors } from '../../constants/Colors';

interface PasswordStepProps {
  initialPassword: string;
  onNext: (data: { password: string }) => void;
  onBack: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ initialPassword, onNext, onBack }) => {
  const [password, setPassword] = useState(initialPassword);

  const validatePassword = (pass: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(pass);
  };

  const handleNext = () => {
    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua senha.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Erro',
        'A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.'
      );
      return;
    }
    onNext({ password: password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Crie uma senha forte para sua conta.</Text>
      <AppTextInput
        label="Sua Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="Crie uma senha forte"
        secureTextEntry
      />
      <AppButton title="Próximo" onPress={handleNext} />
      <AppButton title="Voltar" onPress={onBack} style={styles.backButton} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    color: Colors.textSecondary,
  },
});

export default PasswordStep;