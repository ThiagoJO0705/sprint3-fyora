import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { Colors } from '../../constants/Colors';

interface ContactStepProps {
  initialCpf: string;
  initialPhone: string;
  onNext: (data: { cpf: string; phone: string }) => void;
  onBack: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ initialCpf, initialPhone, onNext, onBack }) => {
  const [cpf, setCpf] = useState(initialCpf);
  const [phone, setPhone] = useState(initialPhone);

  const validateCpf = (cpfValue: string) => {
    const cleanedCpf = cpfValue.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false; 

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(cleanedCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(cleanedCpf.substring(10, 11))) return false;

    return true;
  };

  const validatePhone = (phoneValue: string) => {
    const cleanedPhone = phoneValue.replace(/\D/g, '');
    return cleanedPhone.length >= 10 && cleanedPhone.length <= 11; 
  };

  const handleNext = () => {
    if (!cpf.trim() || !phone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!validateCpf(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Verifique o número digitado.');
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert('Erro', 'Telefone inválido. Use o formato (DD) 9XXXX-XXXX ou (DD) XXXX-XXXX.');
      return;
    }
    onNext({ cpf: cpf.trim(), phone: phone.trim() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Agora, precisamos do seu CPF e Telefone.</Text>
      <AppTextInput
        label="Seu CPF"
        value={cpf}
        onChangeText={setCpf}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        maxLength={14} 
      />
      <AppTextInput
        label="Seu Telefone"
        value={phone}
        onChangeText={setPhone}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        maxLength={15} 
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

export default ContactStep;