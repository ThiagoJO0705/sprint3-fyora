import React, { useState } from 'react';
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !cpf || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    console.log('Registering with:', { name, cpf, phone, email });

    Alert.alert('Sucesso!', 'Sua conta foi criada. Faça o login para começar.');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Fyora</Text>
            <Image
              source={require('../assets/images/fyora-register.png')}
              style={styles.logo}
            />
          </View>

          <View style={styles.card}>
            <AppTextInput label="Seu Nome" value={name} onChangeText={setName} placeholder="Digite seu nome completo" />
            <AppTextInput label="Seu CPF" value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" keyboardType="numeric" />
            <AppTextInput label="Seu Telefone" value={phone} onChangeText={setPhone} placeholder="(00) 00000-0000" keyboardType="phone-pad" />
            <AppTextInput label="Seu E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" />
            <AppTextInput label="Sua Senha" value={password} onChangeText={setPassword} placeholder="Crie uma senha forte" secureTextEntry />
            <AppTextInput label="Confirme sua Senha" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Repita a senha" secureTextEntry />

            <View style={{ marginTop: 16 }}>
              <AppButton title="Cadastrar-se" onPress={handleRegister} />
            </View>
          </View>

          <TouchableOpacity style={styles.footer} onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Já tem uma conta? Faça o login</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: "row"
  },
  logo: {
    width: 230,
    height: 230,
    resizeMode: 'contain',
    position: "relative",
    top: 40,
    left: 40,
    zIndex: 10
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    paddingTop: 120
  },
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RegisterScreen;