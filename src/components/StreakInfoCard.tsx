import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import ProgressCard from './ProgressCard';

interface Props {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  value: string;
}

const StreakInfoCard: React.FC<Props> = ({ iconName, title, value }) => {
  return (
    <ProgressCard style={styles.container}>
      <MaterialCommunityIcons name={iconName} size={32} color={Colors.primary} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </ProgressCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
});

export default StreakInfoCard;