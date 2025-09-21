import AsyncStorage from '@react-native-async-storage/async-storage';

const REGISTRATION_DATA_KEY = 'registrationData';
const USERS_KEY = 'users';
const USER_STORAGE_KEY = 'loggedInUser';
const POSTS_KEY = 'posts'; 

export interface RegistrationData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}

export interface User extends RegistrationData {
  id: string;
  communityUsername: string;
  fyoraAvatar: string; 
}

export interface Post {
  id: string;
  content: string;
  tags: string[];
  timestamp: string;
  authorId: string;
  authorName: string;
  authorAvatar: string; 
  supportCount: number;
  commentCount: number;
}

// =======================
// Registro
// =======================
export const saveRegistrationData = async (data: RegistrationData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(REGISTRATION_DATA_KEY, jsonValue);
    console.log('Dados de registro salvos com sucesso no AsyncStorage.');
  } catch (e) {
    console.error('Erro ao salvar dados de registro no AsyncStorage:', e);
  }
};

export const loadRegistrationData = async (): Promise<RegistrationData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(REGISTRATION_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erro ao carregar dados de registro do AsyncStorage:', e);
    return null;
  }
};

export const clearRegistrationData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(REGISTRATION_DATA_KEY);
    console.log('Dados de registro limpos do AsyncStorage.');
  } catch (e) {
    console.error('Erro ao limpar dados de registro do AsyncStorage:', e);
  }
};

const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const communityUsernames = [
  "Fênix Corajosa",
  "Chama Guardiã",
  "Luz Resiliente",
  "Voo Sereno",
  "Guardião da Esperança",
];


const normalizeAvatarKey = (val?: string): string => {
  if (!val || typeof val !== 'string') return 'phoenix-avatar-1';
  const base = val.split('/').pop() || val;
  return base.replace('.png', '');
};

// =======================
// Usuários
// =======================
export const addUser = async (userData: RegistrationData): Promise<User> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    if (users.some(user => user.email === userData.email)) {
      throw new Error('UNIQUE constraint failed: email');
    }
    if (users.some(user => user.cpf === userData.cpf)) {
      throw new Error('UNIQUE constraint failed: cpf');
    }


    const avatarPool = ["phoenix-avatar-1", "phoenix-avatar-2", "phoenix-avatar-3"];

    const newUser: User = {
      ...userData,
      id: generateUniqueId(),
      communityUsername: communityUsernames[Math.floor(Math.random() * communityUsernames.length)],
      fyoraAvatar: avatarPool[Math.floor(Math.random() * avatarPool.length)],
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.log('Usuário adicionado com sucesso ao AsyncStorage:', newUser.email);
    return newUser;
  } catch (e: any) {
    console.error('Erro ao adicionar usuário ao AsyncStorage:', e);
    throw e;
  }
};

export const findUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      if (foundUser.fyoraAvatar) {
        foundUser.fyoraAvatar = normalizeAvatarKey(foundUser.fyoraAvatar);
      }
      console.log('Usuário encontrado no AsyncStorage:', foundUser.email);
      return foundUser;
    }

    console.log('Usuário não encontrado no AsyncStorage para o email:', email);
    return null;
  } catch (e) {
    console.error('Erro ao buscar usuário no AsyncStorage:', e);
    return null;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    const normalized = users.map(u => ({
      ...u,
      fyoraAvatar: normalizeAvatarKey(u.fyoraAvatar),
    }));

    if (JSON.stringify(normalized) !== JSON.stringify(users)) {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(normalized));
    }

    return normalized;
  } catch (e) {
    console.error('Erro ao obter todos os usuários do AsyncStorage:', e);
    return [];
  }
};

export const clearAllUsers = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USERS_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    console.log('Todos os usuários e o usuário logado foram removidos do AsyncStorage.');
  } catch (e) {
    console.error('Erro ao remover todos os usuários do AsyncStorage:', e);
  }
};

// =======================
// Posts
// =======================
export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_KEY);
    let posts: Post[] = postsJson ? JSON.parse(postsJson) : [];

    if (posts.length === 0) {
      const initialPosts: Post[] = [
        {
          id: generateUniqueId(),
          content: "Bem-vindo(a) à nossa comunidade! Este é um espaço seguro para compartilhar sua jornada.",
          tags: ["motivação"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
        {
          id: generateUniqueId(),
          content: 'Dica: quando sentir um gatilho, tente a respiração guiada na aba "Meu Oásis".',
          tags: ["dica"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
        {
          id: generateUniqueId(),
          content: "Lembre-se de celebrar suas pequenas vitórias! Cada dia sem apostar é um grande passo.",
          tags: ["vitória", "motivação"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
      ];
      await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
      return initialPosts;
    }

    return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (e) {
    console.error('Erro ao carregar posts do AsyncStorage:', e);
    return [];
  }
};

interface PostCreationData {
  content: string;
  tags: string[];
  authorId: string;
}

export const addPost = async (postData: PostCreationData): Promise<void> => {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_KEY);
    const posts: Post[] = postsJson ? JSON.parse(postsJson) : [];

    const users = await getAllUsers();
    const author = users.find(u => u.id === postData.authorId);

    if (!author) {
      console.error('Autor do post não encontrado:', postData.authorId);
      throw new Error('Autor do post não encontrado.');
    }

    const newPost: Post = {
      id: generateUniqueId(),
      content: postData.content,
      tags: postData.tags,
      timestamp: new Date().toISOString(),
      authorId: postData.authorId,
      authorName: author.communityUsername,
      authorAvatar: normalizeAvatarKey(author.fyoraAvatar),
      supportCount: 0,
      commentCount: 0,
    };

    posts.unshift(newPost);
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    console.log('Novo post adicionado com sucesso ao AsyncStorage!');
  } catch (e) {
    console.error('Erro ao adicionar post ao AsyncStorage:', e);
    throw e;
  }
};


export const clearAllPosts = (): void => {
  (async () => {
    try {
      await AsyncStorage.removeItem(POSTS_KEY);

      const initialPosts: Post[] = [
        {
          id: generateUniqueId(),
          content:
            "Bem-vindo(a) à nossa comunidade! Este é um espaço seguro para compartilhar sua jornada.",
          tags: ["motivação"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
        {
          id: generateUniqueId(),
          content:
            'Dica: quando sentir um gatilho, tente a respiração guiada na aba "Meu Oásis".',
          tags: ["dica"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
        {
          id: generateUniqueId(),
          content:
            "Lembre-se de celebrar suas pequenas vitórias! Cada dia sem apostar é um grande passo.",
          tags: ["vitória", "motivação"],
          timestamp: new Date().toISOString(),
          authorId: "fyora-app-id",
          authorName: "Equipe Fyora",
          authorAvatar: "phoenix-avatar-1",
          supportCount: 0,
          commentCount: 0,
        },
      ];

      await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
      console.log("✅ clearAllPosts: resetado com apenas os mockados da Equipe Fyora.");
    } catch (e) {
      console.error("❌ clearAllPosts: erro ao limpar/resetar posts:", e);
    }
  })();
};