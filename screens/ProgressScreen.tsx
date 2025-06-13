import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ProgressCard from '../components/ProgressCard';
import StreakInfoCard from '../components/StreakInfoCard';

const ProgressScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Meu Progresso</Text>
        <Text style={styles.headerSubtitle}>
          Veja suas conquistas e celebre cada passo!
        </Text>

        <ProgressCard style={styles.economyCard}>
          <Text style={styles.economyLabel}>DINHEIRO ECONOMIZADO</Text>
          <Text style={styles.economyValue}>R$ 450,00</Text>
          <Text style={styles.economySubtext}>
            Você poderia comprar aquele fone de ouvido novo.
          </Text>
        </ProgressCard>

        <View style={styles.streaksContainer}>
          <StreakInfoCard
            iconName="fire"
            title="Sequência Atual"
            value="25 dias"
          />
          <View style={{ width: 16 }} />
          <StreakInfoCard
            iconName="trophy-award"
            title="Maior Sequência"
            value="43 dias"
          />
        </View>

        <ProgressCard style={styles.achievementCard}>
          <Ionicons name="ribbon" size={40} color="#FFC947" />
          <View style={styles.achievementText}>
            <Text style={styles.cardTitle}>Próxima Conquista</Text>
            <Text style={styles.achievementDescription}>
              Faltam 5 dias para conseguir "1 Mês sem Apostar"
            </Text>
          </View>
        </ProgressCard>

        <ProgressCard style={styles.achievementCard}>
          <MaterialCommunityIcons name="treasure-chest" size={40} color="#D8A778" />
          <View style={styles.achievementText}>
            <Text style={styles.cardTitle}>Histórico de Conquistas</Text>
            <Text style={styles.achievementDescription}>
              Reviva suas vitórias
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
        </ProgressCard>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  economyCard: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  economyLabel: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
    opacity: 0.8,
  },
  economyValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
    marginVertical: 4,
  },
  economySubtext: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.9,
  },
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementText: {
    flex: 1,
    marginLeft: 16,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default ProgressScreen;