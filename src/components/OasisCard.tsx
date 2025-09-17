import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { OasisActivity } from '../types';

interface Props {
  activity: OasisActivity;
  onPress: () => void;
}

const OasisCard: React.FC<Props> = ({ activity, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name={activity.iconName} size={28} color={Colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description}>{activity.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.placeholder} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default OasisCard;