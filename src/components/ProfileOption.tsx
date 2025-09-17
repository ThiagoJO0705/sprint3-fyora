import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface Props {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  isDestructive?: boolean;
  onPress: () => void;
}

const ProfileOption: React.FC<Props> = ({ iconName, title, isDestructive, onPress }) => {
  const textColor = isDestructive ? ' #E53935' : Colors.textPrimary;
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={24} color={textColor} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {!isDestructive && <Ionicons name="chevron-forward" size={22} color={Colors.placeholder} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ProfileOption;