import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "../constants/Colors";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.card,
  },
  container: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
});

export default Header;
