import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import * as Progress from "react-native-progress";

const FyoraScreen = () => {
  // Dados mockados por enquanto. No futuro, virão de um estado global ou API.
  const resources = {
    feathers: 7,
    streak: 25,
    coins: 50,
  };

  const fyoraLevelProgress = 0.75;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.resourcesContainer}>
          <View style={styles.resourceItem}>
            <Image
              source={require("../assets/images/feather-icon.png")}
              style={styles.resourceIconFeather}
            />
            <Text style={styles.resourceValue}>{resources.feathers}</Text>
            <Text style={styles.resourceLabel}>Penas</Text>
          </View>
          <View style={styles.resourceItem}>
            <Image
              source={require("../assets/images/streak-icon.png")}
              style={styles.streakIcon}
            />
            <Text style={[styles.resourceValue, styles.streakValue]}>
              {resources.streak}
            </Text>
            <Text style={styles.resourceLabel}>Streak</Text>
          </View>
          <View style={styles.resourceItem}>
            <Image
              source={require("../assets/images/icon-coin.png")}
              style={styles.resourceIconCoin}
            />
            <Text style={styles.resourceValueCoin}>{resources.coins}</Text>
            <Text style={styles.resourceLabel}>Moedas</Text>
          </View>
        </View>

        <View style={styles.fyoraContainer}>
          <Progress.Circle
            size={220}
            progress={fyoraLevelProgress}
            thickness={10}
            color={"green"}
            unfilledColor={Colors.card}
            borderColor="transparent"
            showsText={false}
          />
          <Image
            source={require("../assets/images/fyora-character-status.png")}
            style={styles.fyoraImage}
          />
          <View style={styles.moodIconContainer}>
            <Ionicons name="happy" size={32} color="green" />
          </View>
        </View>

        <Text style={styles.statusText}>Fyora está orgulhosa de você!</Text>

        <View style={styles.sideActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require("../assets/images/challenge-icon.png")}
              style={styles.resourceSideIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require("../assets/images/trophy-icon.png")}
              style={styles.resourceSideIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonReport}>
            <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
            <Text style={styles.reportText}>Auto Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainActionContainer}>
          <AppButton
            title="Cuidar da Fyora"
            onPress={() => console.log("Navegar para Cuidar da Fyora")}
          />
          <Text style={styles.mainActionSubtext}>
            Venha comemorar e brincar com ela!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  resourcesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  resourceItem: {
    alignItems: "center",
  },
  resourceIconCoin: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 4,
  },
  resourceIconFeather: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 4,
  },
  streakIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  resourceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: -30,
    marginLeft: 20,
  },
  resourceValueCoin: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: -20,
    marginLeft: 25,
  },
  streakValue: {
    fontSize: 24,
    color: "#FFA500",
    marginLeft: 2,
    marginTop: -20,
  },
  resourceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  fyoraContainer: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },

  fyoraImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
  },

  moodIconContainer: {
    position: "absolute",
    top: 85,
    left: -10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 0,
    zIndex: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 20,
  },
  sideActions: {
    position: "absolute",
    left: 10,
    top: "45%",
    zIndex: 10,
    transform: [{ translateY: -100 }],
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 30,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  actionButtonReport: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 30,
    elevation: 3,
    marginTop: 90,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  resourceSideIcon: {
    width: 35,
    height: 35,
  },
  reportText: {
    color: "#E53935",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
  mainActionContainer: {
    width: "80%",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  mainActionSubtext: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

export default FyoraScreen;
