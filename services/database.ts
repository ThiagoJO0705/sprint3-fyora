import * as SQLite from "expo-sqlite";
import { User, Post, CommunityTag } from '../types';

interface UserCreationData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}

const db = SQLite.openDatabaseSync("fyora.db");

export const initDatabase = async (): Promise<void> => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      
      -- NOVA TABELA DE POSTS
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT NOT NULL, -- Salvaremos as tags como uma string JSON
        timestamp TEXT NOT NULL,
        authorId INTEGER NOT NULL,
        FOREIGN KEY (authorId) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    console.log('Banco de dados e tabelas inicializados com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar tabelas:', error);
    throw error;
  }
};

export const addUser = async (user: UserCreationData): Promise<void> => {
  try {
    await db.runAsync(
      "INSERT INTO users (name, cpf, phone, email, password) VALUES (?, ?, ?, ?, ?);",
      user.name,
      user.cpf,
      user.phone,
      user.email,
      user.password
    );
    console.log("Usuário adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    throw error;
  }
};

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  console.log("--- Tentando fazer login ---");
  console.log("Email recebido:", email);
  console.log("Senha recebida:", password);

  try {
    const userFromDb = await db.getFirstAsync<User>(
      "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;",
      email,
      password
    );

    if (userFromDb) {
      console.log(
        "Usuário encontrado no banco de dados:",
        JSON.stringify(userFromDb, null, 2)
      );
    } else {
      console.log("Nenhum usuário encontrado com essas credenciais.");
    }

    if (userFromDb) {
      const user: User = {
        ...userFromDb,
        communityUsername: "Fênix Valente",
        fyoraAvatar: require("../assets/images/phoenix-avatar-1.png"),
      };
      return user;
    }
    return null;
  } catch (error) {
    console.error("Erro na query de busca de usuário:", error);
    throw error;
  }
};

interface PostCreationData {
  content: string;
  tags: CommunityTag[];
  authorId: number;
}

export const addPost = async (postData: PostCreationData): Promise<void> => {
  try {
    const timestamp = new Date().toISOString();
    const tagsAsJson = JSON.stringify(postData.tags);

    await db.runAsync(
      'INSERT INTO posts (content, tags, timestamp, authorId) VALUES (?, ?, ?, ?);',
      postData.content,
      tagsAsJson,
      timestamp,
      postData.authorId
    );
    console.log('Novo post adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar post:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const allRows = await db.getAllAsync<any>(`
      SELECT 
        p.id, p.content, p.tags, p.timestamp, p.authorId,
        u.name as authorName,
        u.email as authorEmail -- Usado para simular o avatar
      FROM posts p
      JOIN users u ON p.authorId = u.id
      ORDER BY p.timestamp DESC; -- Ordena os posts do mais novo para o mais antigo
    `);

    if (allRows && allRows.length > 0) {
      const posts: Post[] = allRows.map(row => ({
        id: row.id,
        content: row.content,
        tags: JSON.parse(row.tags),
        timestamp: row.timestamp,
        authorId: row.authorId,
        authorName: row.authorName,
        authorAvatar: require('../assets/images/phoenix-avatar-1.png'),
        supportCount: 0,
        commentCount: 0,
      }));
      return posts;
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};