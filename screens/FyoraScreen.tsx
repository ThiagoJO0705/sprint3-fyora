import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FyoraScreen = () => (
  <View style={styles.container}>
    <Text>Tela da Fyora</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FyoraScreen;