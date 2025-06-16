import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Alert,
  Text,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import FloatingActionButton from "../components/FloatingActionButton";
import CommunityRulesBanner from "../components/CommunityRulesBanner";

const mockCommunityPosts: Post[] = [
  {
    id: "1",
    authorName: "Fênix Acolhedora",
    authorAvatar: require("../assets/images/phoenix-avatar-1.png"),
    timestamp: "há 2 horas",
    content:
      "Hoje foi um dia difícil, mas consegui resistir à vontade de apostar. Usei o exercício de respiração do app e ajudou muito.",
    tags: ["desabafo", "vitória"],
    supportCount: 12,
    commentCount: 3,
  },
  {
    id: "2",
    authorName: "Fênix Determinada",
    authorAvatar: require("../assets/images/phoenix-avatar-2.png"),
    timestamp: "há 11 horas",
    content:
      "Tive uma briga feia no trabalho hoje e a primeira coisa que minha mente gritou foi ‘preciso apostar pra esquecer’. É assustador como o cérebro volta pro padrão antigo. Vim aqui pro Oásis em vez de ceder.",
    tags: ["desabafo", "gatilhos"],
    supportCount: 25,
    commentCount: 5,
  },
  {
    id: "3",
    authorName: "Chama Guardiã",
    authorAvatar: require("../assets/images/phoenix-avatar-3.png"),
    timestamp: "há 7 horas",
    content:
      "Completei 30 dias hoje! Olhando pra trás, nunca achei que conseguiria. Se eu estou conseguindo, todo mundo aqui consegue também. Força pra nós!",
    tags: ["motivação", "vitória"],
    supportCount: 58,
    commentCount: 12,
  },
];

const CommunityScreen = () => {
  const handleNewPost = () => {
    Alert.alert("tela para criar uma nova publicação");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Um espaço seguro para compartilhar e apoiar
        </Text>
        <FlatList
          data={mockCommunityPosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<CommunityRulesBanner />}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
        />
        <FloatingActionButton onPress={handleNewPost} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  subtitle: {
    color: Colors.textPrimary,
    paddingBottom: 20,
    fontSize: 16,
  },
});

export default CommunityScreen;
