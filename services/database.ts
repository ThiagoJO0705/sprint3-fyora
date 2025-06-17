import * as SQLite from "expo-sqlite";
import { User, Post, CommunityTag } from "../types";

interface UserCreationData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}

interface PostCreationData {
  content: string;
  tags: CommunityTag[];
  authorId: number;
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
        password TEXT NOT NULL,
        communityUsername TEXT NOT NULL,
        fyoraAvatar TEXT
      );

      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        authorId INTEGER NOT NULL,
        FOREIGN KEY (authorId) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    await db.runAsync(
      `INSERT OR IGNORE INTO users (id, name, cpf, phone, email, password, communityUsername, fyoraAvatar) 
       VALUES (1, 'Fyora App', '00000000000', '00000000000', 'fyora@app.com', 'internal', 'Equipe Fyora', 'phoenix-avatar-1.png');`
    );

    const postsResult = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM posts"
    );

    if (postsResult && postsResult.count === 0) {
      console.log("Tabela de posts vazia. Adicionando posts iniciais...");

      const initialPosts = [
        {
          content:
            "Bem-vindo(a) à nossa comunidade! Este é um espaço seguro para compartilhar sua jornada. Lembre-se, você não está sozinho(a).",
          tags: ["motivação"],
        },
        {
          content:
            'Uma dica para hoje: quando sentir um gatilho, tente a respiração guiada na aba "Meu Oásis". Ajuda a acalmar a mente em poucos minutos.',
          tags: ["dica"],
        },
        {
          content:
            "Lembre-se de celebrar suas pequenas vitórias! Cada dia sem apostar é um grande passo. Registre no seu Diário de Vitórias e sinta orgulho do seu progresso.",
          tags: ["vitória", "motivação"],
        },
      ];

      for (const post of initialPosts) {
        await db.runAsync(
          "INSERT INTO posts (content, tags, timestamp, authorId) VALUES (?, ?, ?, 1);",
          post.content,
          JSON.stringify(post.tags),
          new Date().toISOString()
        );
      }

      console.log("Posts iniciais adicionados.");
    }

    console.log("Banco de dados e tabelas inicializados com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar e popular banco de dados:", error);
    throw error;
  }
};

export const addUser = async (user: UserCreationData): Promise<void> => {
  try {
    const communityUsernames = [
      "Fênix Corajosa",
      "Chama Guardiã",
      "Luz Resiliente",
      "Voo Sereno",
      "Guardião da Esperança",
    ];
    const randomUsername =
      communityUsernames[Math.floor(Math.random() * communityUsernames.length)];

    await db.runAsync(
      "INSERT INTO users (name, cpf, phone, email, password, communityUsername, fyoraAvatar) VALUES (?, ?, ?, ?, ?, ?, ?);",
      user.name,
      user.cpf,
      user.phone,
      user.email,
      user.password,
      randomUsername,
      "phoenix-avatar-1.png"
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
  try {
    const userFromDb = await db.getFirstAsync<any>(
      "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;",
      email,
      password
    );

    if (userFromDb) {
      return {
        ...userFromDb,
        fyoraAvatar: require("../assets/images/phoenix-avatar-1.png"),
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const allRows = await db.getAllAsync<any>(`
      SELECT 
        p.id, p.content, p.tags, p.timestamp, p.authorId,
        u.communityUsername as authorName
      FROM posts p
      JOIN users u ON p.authorId = u.id
      ORDER BY p.timestamp DESC;
    `);

    if (allRows && allRows.length > 0) {
      const posts: Post[] = allRows.map((row) => ({
        id: row.id,
        content: row.content,
        tags: JSON.parse(row.tags),
        timestamp: row.timestamp,
        authorId: row.authorId,
        authorName: row.authorName,
        authorAvatar: require("../assets/images/phoenix-avatar-1.png"),
        supportCount: 0,
        commentCount: 0,
      }));
      return posts;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};

export const addPost = async (postData: PostCreationData): Promise<void> => {
  try {
    const timestamp = new Date().toISOString();
    const tagsAsJson = JSON.stringify(postData.tags);

    await db.runAsync(
      "INSERT INTO posts (content, tags, timestamp, authorId) VALUES (?, ?, ?, ?);",
      postData.content,
      tagsAsJson,
      timestamp,
      postData.authorId
    );
    console.log("Novo post adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar post:", error);
    throw error;
  }
};
