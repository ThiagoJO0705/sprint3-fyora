import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
}

const Tag: React.FC<Props> = ({ label }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>#{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#FDE4D3',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Tag;