import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import ProgressCard from "../components/ProgressCard";
import StreakInfoCard from "../components/StreakInfoCard";
import EconomyChart from "../components/EconomyChart";
import { UserProgress } from "../types";

const mockProgressData: UserProgress = {
  moneySaved: 450.0,
  currentStreak: 25,
  maxStreak: 43,
  economyHistory: [
    { label: "1ª sem", value: 50 },
    { label: "2ª sem", value: 80 },
    { label: "3ª sem", value: 150 },
    { label: "4ª sem", value: 170 },
  ],
  nextAchievement: {
    id: "ach_1mes",
    icon: "ribbon",
    title: "Próxima Conquista",
    description: 'Faltam 5 dias para conseguir "1 Mês sem Apostar"',
  },
  achievementsHistory: [],
};

const ProgressScreen = () => {
  const data = mockProgressData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ProgressCard style={styles.economyCard}>
          <Text style={styles.economyLabel}>DINHEIRO ECONOMIZADO</Text>
          <Text style={styles.economyValue}>
            {`R$ ${data.moneySaved.toFixed(2).replace(".", ",")}`}
          </Text>
          <Text style={styles.economySubtext}>
            Você poderia comprar aquele fone de ouvido novo.
          </Text>
        </ProgressCard>

        <View style={styles.streaksContainer}>
          <StreakInfoCard
            iconName="fire"
            title="Sequência Atual"
            value={`${data.currentStreak} dias`}
          />
          <View style={{ width: 16 }} />
          <StreakInfoCard
            iconName="trophy-award"
            title="Maior Sequência"
            value={`${data.maxStreak} dias`}
          />
        </View>

        <ProgressCard>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Sua Economia</Text>
            <Text style={styles.cardSubtitle}>Últimas 4 semanas</Text>
          </View>
          <EconomyChart data={data.economyHistory} />
        </ProgressCard>

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
          <MaterialCommunityIcons
            name="treasure-chest"
            size={40}
            color="#D8A778"
          />
          <View style={styles.achievementText}>
            <Text style={styles.cardTitle}>Histórico de Conquistas</Text>
            <Text style={styles.achievementDescription}>
              Reviva suas vitórias
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.textSecondary}
          />
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
  economyCard: {
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  economyLabel: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "600",
    opacity: 0.8,
  },
  economyValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: 4,
  },
  economySubtext: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.9,
  },
  streaksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
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
