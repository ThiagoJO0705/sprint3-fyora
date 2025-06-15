import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Post } from '../types';
import Tag from './Tag';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Image source={post.authorAvatar} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{post.authorName}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.tagsContainer}>
        {post.tags.map(tag => (
          <Tag key={tag} label={tag} />
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.actionText}>Apoiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.actionText}>Comentar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.comments}>{post.commentCount} Comentários</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  content: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 21,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E2CD',
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  comments: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default PostCard;