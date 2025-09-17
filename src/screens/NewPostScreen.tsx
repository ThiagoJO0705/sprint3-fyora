import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { CommunityTag } from "../types";
import { Colors } from "../constants/Colors";
import AppButton from "../components/AppButton";
import TagSelector from "../components/TagSelector";
import { useAuth } from "../context/AuthContext";
import { addPost } from "../services/database";

const AVAILABLE_TAGS: CommunityTag[] = [
  "desabafo",
  "vitória",
  "gatilhos",
  "motivação",
  "dúvida",
];
const MAX_CHARACTERS = 1000;

type NewPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NewPostScreen = () => {
  const navigation = useNavigation<NewPostNavigationProp>();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<CommunityTag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleTag = (tag: CommunityTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para criar um post.");
      return;
    }
    if (content.trim().length === 0) {
      Alert.alert(
        "Post Vazio",
        "Por favor, escreva algo antes de compartilhar."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const newPostData = {
        content: content.trim(),
        tags: selectedTags,
        authorId: user.id,
      };

      await addPost(newPostData);

      Alert.alert(
        "Post realizado com sucesso",
        "Obrigado por contribuir com nossa comunidade!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível compartilhar seu post. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Erro: Usuário não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={user.fyoraAvatar} style={styles.avatar} />
              <Text style={styles.author}>{user.communityUsername}</Text>
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="Escreva o que vem à mente..."
              placeholderTextColor={Colors.placeholder}
              multiline
              value={content}
              onChangeText={setContent}
              maxLength={MAX_CHARACTERS}
              editable={!isSubmitting}
            />
            <Text style={styles.charCounter}>
              {content.length}/{MAX_CHARACTERS}
            </Text>

            <TagSelector
              label="Tags"
              tags={AVAILABLE_TAGS}
              selectedTags={selectedTags}
              onToggleTag={handleToggleTag}
            />

            <View style={{ marginTop: 24 }}>
              <AppButton
                title={isSubmitting ? "" : "Compartilhar"}
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  color={Colors.white}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  textArea: {
    backgroundColor: Colors.white,
    height: 150,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    color: Colors.textPrimary,
  },
  charCounter: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "right",
    marginTop: 4,
    marginBottom: 16,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    bottom: 0,
  },
});

export default NewPostScreen;
