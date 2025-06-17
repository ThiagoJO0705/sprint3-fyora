import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import { Post } from '../types';
import { getPosts } from '../services/database';
import PostCard from '../components/PostCard';
import FloatingActionButton from '../components/FloatingActionButton';
import CommunityRulesBanner from '../components/CommunityRulesBanner';

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CommunityScreen = () => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Não foi possível carregar os posts da comunidade.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('Tela de Comunidade focada. Carregando posts...');
      loadPosts();
    }, [loadPosts])
  );

  const handleNewPost = () => {
    navigation.navigate('NewPost');
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />;
    }
    if (error) {
      return <Text style={styles.infoText}>{error}</Text>;
    }
    if (posts.length === 0) {
      return <Text style={styles.infoText}>Ainda não há posts. Seja o primeiro a compartilhar!</Text>;
    }
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<CommunityRulesBanner />}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Um espaço seguro para compartilhar e apoiar
        </Text>
        {renderContent()}
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
  infoText: {
    marginTop: 50,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

export default CommunityScreen;