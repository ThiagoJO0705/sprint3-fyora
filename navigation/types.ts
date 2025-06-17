import { NavigatorScreenParams } from '@react-navigation/native';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

 type AppTabParamList = {
  Progresso: undefined;
  MeuOasis: undefined;
  Fyora: undefined;
  Comunidade: undefined;
  Perfil: undefined;
};

 type RootStackParamList = {
  AppTabs: NavigatorScreenParams<AppTabParamList>; 
  ReportScreen: undefined;
  CareFyoraScreen: undefined;
  NewPost: undefined;
};

export {AppTabParamList, AuthStackParamList, RootStackParamList}