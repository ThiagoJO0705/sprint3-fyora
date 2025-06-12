import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityScreen = () => (
  <View style={styles.container}>
    <Text>Tela de Comunidade</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CommunityScreen;