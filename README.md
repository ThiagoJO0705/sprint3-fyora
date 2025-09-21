# Fyora - Sua Companheira na Jornada Contra as Apostas

<p align="center">
  <img src="src/assets/images/fyora-character-care.png" alt="Fyora App Mockup" width="300"/>
</p>

> Fyora é uma solução mobile inovadora focada no tratamento, inibição e suporte a pessoas com comportamento compulsivo em relação a apostas. Diferente de abordagens tradicionais, Fyora tem um coração: uma personagem que evolui com o usuário. A ideia é criar um vínculo emocional, um elo afetivo com a Fyora para que, ao cuidar dela, o usuário esteja, na verdade, cuidando de si mesmo.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Design e Prototipagem Figma](#design-e-prototipagem-figma)
- [Começando](#começando)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Integrantes](#integrantes)

## Sobre o Projeto

O crescimento acelerado do mercado de apostas trouxe graves consequências sociais e psicológicas. Apostadores compulsivos enfrentam impactos financeiros, problemas de saúde mental e prejuízos nas relações interpessoais. É urgente oferecer uma solução eficaz, humana e acessível para combater essa crise silenciosa.

Fyora nasceu com o objetivo de ser essa solução, utilizando tecnologia e empatia para oferecer suporte contínuo através de três pilares:

- **Inibição Ativa:** Intervenções em tempo real com alertas e alternativas saudáveis.
- **Tratamento e Apoio:** Conexão com profissionais, grupos de apoio e conteúdos educativos.
- **Laço Emocional:** A Fyora como centro emocional do app, motivando e refletindo o progresso do usuário.

## Principais Funcionalidades

- **Dashboard Emocional (Tela Fyora):** A tela principal que reflete o estado do usuário através da felicidade e progresso da Fyora.
- **Acompanhamento de Progresso:** Métricas visuais e motivadoras, como dinheiro economizado, sequência de dias sem apostas e conquistas desbloqueadas.
- **Oásis de Bem-Estar:** Uma caixa de ferramentas com atividades de relaxamento, como exercícios de respiração, meditações guiadas e um "antídoto para o tédio".
- **Comunidade Anônima e Segura:** Um feed de apoio onde usuários podem compartilhar vitórias e desabafos de forma anônima, com nomes e avatares gerados pelo sistema.
- **Ferramenta de Auto-Relato:** Uma interface guiada e sem julgamentos para que o usuário possa registrar recaídas, ajudando-o a identificar gatilhos e a tomar uma ação de recuperação imediata.
- **Gerenciamento de Perfil e Segurança:** Área privada para o usuário gerenciar sua conta e acessar contatos de ajuda em um "Porto Seguro".
- **Sistema de Recompensas:** Gamificação através de moedas e itens para personalizar a Fyora, criando um ciclo de engajamento positivo.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias de ponta no ecossistema mobile:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/) para o gerenciamento de rotas e navegação.
- [Expo-SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) para o banco de dados local.
- [React Native Progress](https://github.com/oblador/react-native-progress) para os indicadores de progresso circulares.

## Design e Prototipagem Figma

Todo o design das telas, componentes e da identidade visual do Fyora foi cuidadosamente planejado e prototipado na plataforma Figma. Você pode visualizar o projeto completo no link abaixo.

**[➡️ Acessar o Projeto no Figma](https://www.figma.com/design/2v3JN6z8rvv37GhoBjCklf/Fyora?node-id=0-1&t=vQSbaVGpyxurjxeu-1)**

## Começando

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

Você vai precisar ter o Node.js, npm (ou yarn) e o Expo Go (no seu celular) instalados.

- [Node.js](https://nodejs.org/en/)
- [Expo Go (Android/iOS)](https://expo.dev/go)

### Instalação

1. Clone o repositório para a sua máquina local:
    ```sh
    git clone https://github.com/FIAP-MOBILE/challenge-fyora
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd challenge-fyora
    ```
3. Instale todas as dependências do projeto:
    ```sh
    npm install
    ```
    ou, se você usa yarn:
    ```sh
    yarn
    ```
4. Para garantir que o banco de dados seja criado corretamente, desinstale o app `Fyora` do seu emulador/dispositivo se já houver uma versão antiga.

### Executando o Aplicativo

1. Inicie o servidor de desenvolvimento do Expo. É altamente recomendado usar a flag `--clear` na primeira vez para evitar problemas de cache.
    ```sh
    npx expo start --clear
    ```
2. Um QR code aparecerá no seu terminal. Abra o aplicativo **Expo Go** no seu celular e escaneie o QR code para abrir o projeto.

## Estrutura do Projeto

A estrutura de pastas do projeto foi organizada da seguinte forma para manter a escalabilidade e a clareza:



A estrutura de pastas do projeto foi organizada da seguinte forma para manter a escalabilidade e a clareza: <br>
```bash
fyora-app/ 
├── src/
    ├── assets/       # Fontes, imagens e outros arquivos estáticos
    ├── components/   # Componentes React reutilizáveis (Botões, Cards, etc.)
    ├── constants/    # Constantes globais (Cores, etc.)
    ├── context/      # React Context para gerenciamento de estado global (AuthContext)
    ├── navigation/   # Lógica de navegação e definição de rotas
    ├── screens/      # As telas principais do aplicativo
    ├── services/     # Serviços externos (database.ts)
    ├── types/        # Definições de tipos e interfaces do TypeScript
    └── App.tsx       # O ponto de entrada principal do aplicativo
```

## Integrantes

GUILHERME ROCHA BIANCHINI - RM97974  
NIKOLAS RODRIGUES MOURA DOS SANTOS - RM551566  
PEDRO HENRIQUE PEDROSA TAVARES - RM97877  
RODRIGO BRASILEIRO - RM98952  
THIAGO JARDIM DE OLIVEIRA - RM551624  

Projeto desenvolvido pela equipe **TechPulse Global Network** para o **Challenge de Mobile Development da FIAP**.

