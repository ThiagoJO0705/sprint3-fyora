import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { addPost } from "../utils/AsyncStorageUtils";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../constants/Colors";

const avatarMap: Record<string, any> = {
  "phoenix-avatar-1": require("../assets/images/phoenix-avatar-1.png"),
  "phoenix-avatar-2": require("../assets/images/phoenix-avatar-2.png"),
  "phoenix-avatar-3": require("../assets/images/phoenix-avatar-3.png"),
};

const availableTags = ["desabafo", "vitória", "gatilhos", "motivação", "dúvida"];

export default function NewPostScreen({ navigation }: any) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

const handlePublish = async () => {
  if (!content.trim() || !user) return;

  await addPost({
    content,
    tags: selectedTags,
    authorId: user.id,
    authorName: user.communityUsername,
    authorAvatar: user.fyoraAvatar,
  });

  setContent("");
  setSelectedTags([]);
  navigation.goBack();
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={
              user?.fyoraAvatar && avatarMap[user.fyoraAvatar]
                ? avatarMap[user.fyoraAvatar]
                : avatarMap["phoenix-avatar-3"]
            }
            style={styles.avatar}
          />
          <Text style={styles.username}>{user?.communityUsername}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escreva o que vem à mente..."
          placeholderTextColor={Colors.placeholder}
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={1000}
        />
        <Text style={styles.charCount}>{content.length}/1000</Text>

        <Text style={styles.label}>Tags</Text>
        <View style={styles.tagsContainer}>
          {availableTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagSelected,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePublish}>
          <Text style={styles.buttonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: "top",
    minHeight: 100,
  },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: Colors.primary,
  },
  tagText: {
    fontSize: 13,
    color: Colors.primary,
  },
  tagTextSelected: {
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
