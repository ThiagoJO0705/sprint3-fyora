import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import OasisCard from '../components/OasisCard';
import { OasisActivity } from '../types';

// Dados mockados para as atividades
const OASIS_ACTIVITIES: OasisActivity[] = [
  { id: '1', title: 'Respire e Acalme', description: 'Exercícios guiados para momentos de ansiedade.', iconName: 'pulse-outline' },
  { id: '2', title: 'Antídoto para o Tédio', description: 'Descubra uma atividade saudável para fazer agora.', iconName: 'bulb-outline' },
  { id: '3', title: 'Diário de Vitórias', description: 'Registre suas conquistas e momentos de gratidão.', iconName: 'book-outline' },
  { id: '4', title: 'Foco em 5 Minutos', description: 'Uma técnica para ancorar sua mente no presente.', iconName: 'aperture-outline' },
  { id: '5', title: 'Meditações Guiadas', description: 'Áudios para ajudar com o sono e o estresse.', iconName: 'moon-outline' },
  { id: '6', title: 'Descomplica Jogo', description: 'Entenda os gatilhos mentais por trás das apostas.', iconName: 'key-outline' },
  { id: '7', title: 'Mova o Corpo', description: 'Rotinas de exercícios leves para liberar a tensão.', iconName: 'walk-outline' },
  { id: '8', title: 'Meus Gatilhos e Estratégias', description: 'Crie seu plano de ação pessoal para momentos difíceis.', iconName: 'shield-checkmark-outline' },
  { id: '9', title: 'Paisagens Sonoras', description: 'Relaxe com sons da natureza como chuva e oceano.', iconName: 'musical-notes-outline' },
  { id: '10', title: 'Dose de Inspiração', description: 'Uma mensagem positiva para iluminar o seu dia.', iconName: 'sparkles-outline' },
];


const OasisScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerSubtitle}>Seu espaço de calma e bem-estar!</Text>
        
        <FlatList
          data={OASIS_ACTIVITIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OasisCard 
              activity={item}
              onPress={() => console.log(`Abrir atividade: ${item.title}`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      </View>
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
    paddingHorizontal: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default OasisScreen;