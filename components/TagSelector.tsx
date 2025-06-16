import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

const TagSelector: React.FC<Props> = ({ label, tags, selectedTags, onToggleTag }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, isSelected && styles.tagSelected]}
              onPress={() => onToggleTag(tag)}
            >
              <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                #{tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  tagSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagText: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tagTextSelected: {
    color: Colors.white,
  },
});

export default TagSelector;