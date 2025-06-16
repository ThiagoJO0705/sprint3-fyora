import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Progresso: undefined;
  MeuOasis: undefined;
  Fyora: undefined;
  Comunidade: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList>; 
  ReportScreen: undefined;
  NewPost: undefined;
};