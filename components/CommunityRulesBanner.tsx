import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const CommunityRulesBanner = () => {
  return (
    <TouchableOpacity style={styles.banner} activeOpacity={0.8}>
      <Ionicons name="document-text-outline" size={20} color={Colors.white} />
      <Text style={styles.bannerText}>Lembre-se das nossas Regras de Convivência</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
  },
});

export default CommunityRulesBanner;