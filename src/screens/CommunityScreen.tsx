import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getPosts, Post } from "../utils/AsyncStorageUtils";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";


const avatarMap: Record<string, any> = {
  "phoenix-avatar-1": require("../assets/images/phoenix-avatar-1.png"),
  "phoenix-avatar-2": require("../assets/images/phoenix-avatar-2.png"),
  "phoenix-avatar-3": require("../assets/images/phoenix-avatar-3.png"),
};

export default function CommunityScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const savedPosts = await getPosts();
      setPosts(savedPosts);
    };

    const interval = setInterval(loadPosts, 1500);
    loadPosts();
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }: { item: Post }) => {
    const avatarKey =
      item.authorId === "fyora-app-id" ? "phoenix-avatar-1" : item.authorAvatar;

    return (
      <View style={styles.post}>
        <View style={styles.header}>
          <Image
            source={
              avatarKey && avatarMap[avatarKey]
                ? avatarMap[avatarKey]
                : avatarMap["phoenix-avatar-1"]
            }
            style={styles.avatar}
          />
          <Text style={styles.author}>{item.authorName}</Text>
        </View>

        <Text style={styles.content}>{item.content}</Text>

        <View style={styles.footer}>
          <Text style={styles.meta}>
            ❤️ {item.supportCount}   💬 {item.commentCount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Ionicons name="add" size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 12,
  },
  post: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.textPrimary,
  },
  content: {
    fontSize: 15,
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
