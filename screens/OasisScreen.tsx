import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OasisScreen = () => (
  <View style={styles.container}>
    <Text>Tela de Meu Oasis</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OasisScreen;