import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { FyoraStatus, PlayerResources } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface StatusMeterProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  value: number;
  color: string;
}

// --- Simulação de Dados ---
const MOCKED_FYORA_STATUS: FyoraStatus = {
  level: 8,
  xp: 750,
  xpToNextLevel: 1000,
  happiness: 90,
  hunger: 60,
  entertainment: 50,
  energy: 80,
};

const MOCKED_RESOURCES: PlayerResources = {
  feathers: 7,
  coins: 50,
  streak: 25, 
};

const StatusMeter: React.FC<StatusMeterProps> = ({ iconName, value, color }) => (
  <View style={styles.meterContainer}>
    <Progress.Circle
      size={60}
      progress={value / 100}
      thickness={5}
      color={color}
      unfilledColor="#00000020"
      borderColor="transparent"
      showsText={false}
    />
    <View style={styles.meterIcon}>
      <Ionicons name={iconName} size={30} color={Colors.white} />
    </View>
  </View>
);

const CareFyoraScreen = () => {
  const navigation = useNavigation(); 
  const xpProgress = MOCKED_FYORA_STATUS.xp / MOCKED_FYORA_STATUS.xpToNextLevel;

  return (
    <View style={styles.fullScreenContainer}>
      <Image 
        source={require('../assets/images/fyora-care-background.png')}
        style={styles.backgroundImage} 
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topPanel}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.rightTopContainer}>
                <View style={styles.levelWrapper}>
                    <Progress.Circle
                        size={80}
                        progress={xpProgress}
                        thickness={7}
                        color={Colors.primary}
                        unfilledColor="#FFFFFF40"
                        borderColor="transparent"
                        showsText={false}
                    />
                    <View style={styles.levelContainer}>
                        <Text style={styles.levelText}>Nível</Text>
                        <Text style={styles.levelNumber}>{MOCKED_FYORA_STATUS.level}</Text>
                    </View>
                </View>

                <View style={styles.resourcesContainer}>
                    <View style={styles.resourceItem}>
                        <Image source={require('../assets/images/feather-icon.png')} style={styles.resourceIcon} />
                        <Text style={styles.resourceText}>{MOCKED_RESOURCES.feathers}</Text>
                    </View>
                    <View style={styles.resourceItem}>
                        <Image source={require('../assets/images/icon-coin.png')} style={styles.resourceIcon} />
                        <Text style={styles.resourceText}>{MOCKED_RESOURCES.coins}</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={styles.fyoraContainer}>
            <Image 
              source={require('../assets/images/fyora-character-care.png')}
              style={styles.fyoraImage}
            />
        </View>

        <View style={styles.bottomPanel}>
            <StatusMeter iconName="heart" value={MOCKED_FYORA_STATUS.happiness} color="#FF6B6B" />
            <StatusMeter iconName="fast-food" value={MOCKED_FYORA_STATUS.hunger} color="#F0A500" />
            <StatusMeter iconName="game-controller" value={MOCKED_FYORA_STATUS.entertainment} color="#54A0FF" />
            <StatusMeter iconName="flash" value={MOCKED_FYORA_STATUS.energy} color="#5DE2A5" />
        </View>

        <TouchableOpacity style={styles.mainActionButton}>
            <Ionicons name="bag-handle" size={32} color={Colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topPanel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#00000040',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position:"relative",
    bottom: 40
  },
  rightTopContainer: {
    paddingTop:20,
    alignItems:"flex-end",
    gap: 40
  },
  levelWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelContainer: {
    width: 80,
    height: 80,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  levelNumber: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  resourcesContainer: {
    flexDirection: 'row',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000040',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
  },
  resourceIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  resourceText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fyoraContainer: {
    position: "absolute",
    top: "70%"
  },
  fyoraImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bottomPanel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
    padding: 10,
    borderRadius: 25,
  },
  meterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  meterIcon: {
    position: 'absolute',
  },
  mainActionButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  }
});

export default CareFyoraScreen;