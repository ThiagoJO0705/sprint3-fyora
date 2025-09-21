import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Image, 
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import AppButton from '../components/AppButton';
import {
  saveRegistrationData,
  loadRegistrationData,
  clearRegistrationData,
  RegistrationData,
  addUser,
} from '../utils/AsyncStorageUtils';


import NameStep from '../components/registrationSteps/NameStep';
import ContactStep from '../components/registrationSteps/ContactStep';
import EmailStep from '../components/registrationSteps/EmailStep';
import PasswordStep from '../components/registrationSteps/PasswordStep';
import ConfirmPasswordStep from '../components/registrationSteps/ConfirmPasswordStep';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await loadRegistrationData();
      if (savedData) {
        setFormData(savedData);
        if (savedData.password) setCurrentStep(4); 
        else if (savedData.email) setCurrentStep(3); 
        else if (savedData.phone) setCurrentStep(2); 
        else if (savedData.name) setCurrentStep(1);
      }
    };
    loadSavedData();
  }, []);

  const handleNext = async (data: Partial<RegistrationData>) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    await saveRegistrationData(updatedFormData);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleConfirmPassword = async (pass: string) => {
    setConfirmPassword(pass);
    const updatedFormData = { ...formData, password: formData.password };
    await saveRegistrationData(updatedFormData);
  };

  const handleRegister = async () => {
    if (formData.password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        name: formData.name.trim(),
        cpf: formData.cpf.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      await addUser(userData);

      console.log('Usuário registrado com sucesso no AsyncStorage!');
      Alert.alert('Sucesso!', 'Sua conta foi criada. Faça o login para começar.');
      await clearRegistrationData();
      navigation.navigate('Login');
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint failed')) {
        Alert.alert('Erro', 'Este e-mail ou CPF já está cadastrado.');
      } else {
        Alert.alert('Erro ao Cadastrar', 'Não foi possível criar sua conta. Tente novamente.');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <NameStep initialName={formData.name} onNext={handleNext} />;
      case 1:
        return <ContactStep initialCpf={formData.cpf} initialPhone={formData.phone} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <EmailStep initialEmail={formData.email} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PasswordStep initialPassword={formData.password} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <ConfirmPasswordStep
            initialConfirmPassword={confirmPassword}
            password={formData.password}
            onConfirmPasswordChange={handleConfirmPassword}
            onRegister={handleRegister}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      default:
        return <Text>Erro: Etapa desconhecida</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Cadastro</Text>
              <Text style={styles.subtitle}>Etapa {currentStep + 1} de 5</Text>
            </View>
            <View>
                <Image
                source={require('../assets/images/fyora-register.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.card}>
            {renderStep()}
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
    flexDirection: 'row',
    justifyContent: 'center', 
    gap: 10

  },
    headerTitle: {
      marginTop: 160,
      marginLeft: 60
  },
  logo: {
    width: 250,
    height: 250, 
    resizeMode: 'contain',
    position: "relative",
    top: 25,
    left: 10,
    zIndex: 10
    

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 5,
    position: 'absolute',
    bottom: -20,
    left: 15
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