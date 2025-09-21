import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { Colors } from '../../constants/Colors';

interface NameStepProps {
  initialName: string;
  onNext: (data: { name: string }) => void;
}

const NameStep: React.FC<NameStepProps> = ({ initialName, onNext }) => {
  const [name, setName] = useState(initialName);

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu nome.');
      return;
    }
    if (name.trim().length < 3) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 3 caracteres.');
      return;
    }
    onNext({ name: name.trim() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Qual é o seu nome completo?</Text>
      <AppTextInput
        label="Seu Nome"
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome completo"
        autoCapitalize="words"
      />
      <AppButton title="Próximo" onPress={handleNext} />
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
});

export default NameStep;