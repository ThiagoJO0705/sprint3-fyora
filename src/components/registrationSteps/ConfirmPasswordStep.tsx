import React from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { Colors } from '../../constants/Colors';

interface ConfirmPasswordStepProps {
  initialConfirmPassword: string;
  password: string;
  onConfirmPasswordChange: (pass: string) => void;
  onRegister: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const ConfirmPasswordStep: React.FC<ConfirmPasswordStepProps> = ({
  initialConfirmPassword,
  password,
  onConfirmPasswordChange,
  onRegister,
  onBack,
  isLoading,
}) => {
  const handleRegisterPress = () => {
    if (!initialConfirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, confirme sua senha.');
      return;
    }
    if (password !== initialConfirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    onRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Confirme sua senha para finalizar.</Text>
      <AppTextInput
        label="Confirme sua Senha"
        value={initialConfirmPassword}
        onChangeText={onConfirmPasswordChange}
        placeholder="Repita a senha"
        secureTextEntry
        editable={!isLoading}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          title={isLoading ? '' : 'Finalizar Cadastro'}
          onPress={handleRegisterPress}
          disabled={isLoading}
        />
        {isLoading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            color={Colors.white}
          />
        )}
      </View>
      <AppButton title="Voltar" onPress={onBack} style={styles.backButton} 
      disabled={isLoading} />
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
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    color: Colors.textSecondary,
  },
});

export default ConfirmPasswordStep;