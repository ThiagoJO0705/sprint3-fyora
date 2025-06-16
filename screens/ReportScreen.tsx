import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Colors } from "../constants/Colors";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import TagSelector from "../components/TagSelector";
import OasisCard from "../components/OasisCard";
import { Ionicons } from "@expo/vector-icons";

const GATILHOS_COMUNS = [
  "Estresse",
  "Tédio",
  "Solidão",
  "Ansiedade",
  "Social",
  "Álcool",
];
const LOCAIS_COMUNS = ["Em casa", "No trabalho", "Transporte", "Bar/Festa"];

type ReportScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ReportScreen"
>;

const ReportScreen = () => {
  const navigation = useNavigation<ReportScreenNavigationProp>();
  const [valor, setValor] = useState("");
  const [tempo, setTempo] = useState("");
  const [gatilhos, setGatilhos] = useState<string[]>([]);
  const [locais, setLocais] = useState<string[]>([]);
  const [reflexao, setReflexao] = useState("");

  const handleToggleTag = (
    tag: string,
    setTags: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const report = { valor, tempo, gatilhos, locais, reflexao };
    console.log("Relato de Recaída:", report);
    Alert.alert(
      "Relato Salvo",
      "Obrigado pela sua honestidade. Cada passo, mesmo os difíceis, faz parte da jornada.",
      [{ text: "Seguir em Frente", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>
          Está tudo bem. Olhar para o que aconteceu é o primeiro passo para a
          mudança.
        </Text>

        <View style={styles.section}>
          <AppTextInput
            label="Quanto você apostou?"
            placeholder="R$ 0,00"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
          <AppTextInput
            label="Quanto tempo você passou apostando?"
            placeholder="Ex: 1 hora e 30 minutos"
            value={tempo}
            onChangeText={setTempo}
          />
        </View>

        <View style={styles.section}>
          <TagSelector
            label="Qual era o principal gatilho?"
            tags={GATILHOS_COMUNS}
            selectedTags={gatilhos}
            onToggleTag={(tag) => handleToggleTag(tag, setGatilhos)}
          />
          <TagSelector
            label="Onde você estava?"
            tags={LOCAIS_COMUNS}
            selectedTags={locais}
            onToggleTag={(tag) => handleToggleTag(tag, setLocais)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Gostaria de escrever sobre como se sentiu? (Opcional)
          </Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Descrever o momento pode ajudar a entender seus sentimentos..."
            placeholderTextColor={Colors.placeholder}
            value={reflexao}
            onChangeText={setReflexao}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.nextStepTitle}>
            Que tal um passo para cuidar de você agora?
          </Text>
          <OasisCard
            activity={{
              id: "meditate",
              title: "Meditar por 5 minutos",
              description: "Acalme a mente e o corpo.",
              iconName: "pulse-outline",
            }}
            onPress={() => console.log("Navegar para Meditação")}
          />
        </View>

        <AppButton
          title="Salvar Relato e Seguir em Frente"
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: Colors.white,
    height: 120,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  nextStepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default ReportScreen;
