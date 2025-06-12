import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressScreen = () => (
  <View style={styles.container}>
    <Text>Tela de Progresso</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProgressScreen;