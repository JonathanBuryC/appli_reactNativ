# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Project Development - Completed Steps

Here's a summary of the development steps completed so far:

1.  **Project Setup and Navigation:**
    *   Initialized the Expo project.
    *   Configured basic navigation using Expo Router (`app/_layout.tsx`).
    *   Set up a Tab Navigator (`app/mainView/_layout.tsx`) for the main sections: Home, Search, Events (hidden tab), Tickets, Profile.

2.  **Authentication Integration:**
    *   Integrated Firebase Authentication (Email/Password).
    *   Created Sign-Up (`app/auth/signUp.tsx`) and Sign-In (`app/auth/signIn.tsx`) pages.
    *   Implemented basic authentication logic (creating users, signing in).
    *   Added navigation logic to redirect users based on authentication state (`app/_layout.tsx`).

3.  **Firestore Database Setup and User Roles:**
    *   Connected the application to Firebase Firestore.
    *   Implemented logic to create a user document in the `users` collection upon sign-up, storing `uid`, `email`, `name`, and an initial `role` of `'user'`.
    *   Discussed the structure of user documents in Firestore.

4.  **Creator Account Request Process:**
    *   Modified the Profile page (`app/mainView/profil.tsx`) to include a button related to event creation/creator status.
    *   Implemented conditional logic on the Profile page to check the user's role from Firestore.
    *   Created a dedicated form page (`app/mainView/events/request-creator-form.tsx`) for users requesting creator status, including fields for "Who are you?", "Past events?", "Social media links", and "Phone number".
    *   Configured the "Create Event" button on the Profile page to navigate users to either the Creator Request Form (if role is 'user') or the Create Event page (if role is 'creator').
    *   Implemented the logic to save creator requests to a new `creatorRequests` collection in Firestore.
    *   Discussed the manual process of reviewing and approving creator requests via the Firebase console (by updating the user's role in the `users` collection).
    *   Improved the Profile page's appearance by displaying the user's name and email, and adding a placeholder for a round profile picture (using a local default image if no URL is found in Firestore). Addressed related TypeScript errors and the requirement for a local default image file.


# Structure du dossier `app/` - Application Jnight

Ce document décrit les principaux fichiers et leur rôle dans le dossier `app/` de l'application Jnight. Ce dossier contient la logique de navigation (gérée par Expo Router) et les écrans de l'application.

## Vue d'ensemble

Le dossier `app/` est structuré pour gérer les différentes sections de l'application, notamment l'authentification, la vue principale (avec onglets) et les pages d'événements spécifiques.

## Description des Fichiers et Dossiers

### `app/index.tsx`

*   **Rôle :** Point d'entrée initial de l'application.
*   **Description :** Ce fichier utilise `expo-router` pour gérer la route racine (`/`). Actuellement, il contient une redirection immédiate vers `/landingScreen`.
*   **Fonctionnalité Clé :** Redirection initiale au démarrage.

### `app/landingScreen.tsx`

*   **Rôle :** Écran d'accueil après la redirection initiale.
*   **Description :** Contient la logique pour vérifier l'état d'authentification de l'utilisateur au chargement. Redirige vers `/mainView/premierePage` si l'utilisateur est authentifié ; sinon, affiche probablement des options de connexion/inscription.
*   **Fonctionnalité Clé :** Gestion du flux utilisateur initial basé sur l'authentification.

### `app/auth/`

*   **Rôle :** Contient les écrans liés au processus d'authentification.

#### `app/auth/signUp.jsx`

*   **Rôle :** Page d'inscription de l'utilisateur.
*   **Description :** Fournit un formulaire pour créer un nouveau compte utilisateur via Firebase Authentication et enregistre les informations de base de l'utilisateur dans Firestore.
*   **Fonctionnalités Clés :** Création de compte (Auth), Sauvegarde utilisateur (Firestore), Gestion des erreurs d'inscription (email déjà utilisé, mot de passe faible) avec `ToastAndroid`.
*   **Navigation Post-Inscription :** Redirection vers `/mainView/premierePage`.

#### `app/auth/signIn.jsx`

*   **Rôle :** Page de connexion de l'utilisateur.
*   **Description :** Fournit un formulaire pour connecter un utilisateur existant via Firebase Authentication et récupère ses détails depuis Firestore.
*   **Fonctionnalités Clés :** Connexion (Auth), Récupération des détails utilisateur (Firestore), Gestion des erreurs de connexion avec `ToastAndroid`.
*   **Navigation Post-Connexion :** Redirection vers `/mainView/premierePage`.

### `app/mainView/`

*   **Rôle :** Contient la structure principale de l'application, souvent gérée par une navigation par onglets et/ou des piles (stacks).

#### `app/mainView/_layout.tsx`

*   **Rôle :** Layout de navigation principal (probablement des onglets).
*   **Description :** Configure la barre d'onglets de l'application, définissant les écrans principaux accessibles (`Accueil`, `Recherche`, `Mes billets`, `Profil`) et leurs icônes. Inclut un onglet `events` caché pour les sous-pages.
*   **Fonctionnalités Clés :** Structure de navigation par onglets, masquage des libellés d'onglets.

#### `app/mainView/premierePage/`

*   **Rôle :** Contient les fichiers de la section "Accueil".

##### `app/mainView/premierePage/index.tsx`

*   **Rôle :** Page principale de la section "Accueil".
*   **Description :** Affiche une liste des événements récupérés depuis Firestore. Inclut l'image de l'événement et des informations basiques dans la liste.
*   **Fonctionnalités Clés :** Chargement d'événements (Firestore), Affichage liste (`FlatList`), Rendu des éléments avec image/infos, Gestion affichage des dates (string/Timestamp).
*   **Navigation :** Permet de naviguer vers les détails d'un événement cliqué (`/mainView/events/[eventId]`).

##### `app/mainView/premierePage/_layout.tsx`

*   **Rôle :** Layout de navigation pour la section "Accueil" (probablement une pile).
*   **Description :** Configure la navigation entre `index.tsx` et les éventuelles sous-pages de la section (comme `choix-map`, `calendrier`) en utilisant une structure de pile.
*   **Fonctionnalités Clés :** Navigation en pile au sein de la section "Accueil".

#### `app/mainView/recherche.tsx`

*   **Rôle :** Page de recherche d'événements.
*   **Description :** Permet aux utilisateurs de rechercher des événements via une barre de recherche. Affiche les résultats filtrés.
*   **Fonctionnalités Clés :** Barre de recherche (`TextInput`), Chargement initial d'événements (Firestore), Filtrage côté client (nom, lieu, description, date), Exclusion événements passés, Rendu spécifique des résultats (image à gauche, infos à droite).
*   **Navigation :** Permet de naviguer vers les détails d'un événement depuis les résultats.

#### `app/mainView/mes-billets.tsx`

*   **Rôle :** Page affichant les billets achetés par l'utilisateur.
*   **Description :** (Actuellement basique) Contiendra la logique pour récupérer et afficher les informations des billets de l'utilisateur connecté.
*   **Fonctionnalités Clés (À développer) :** Récupération des billets utilisateur (Firestore), Affichage liste/détails des billets.

#### `app/mainView/profil.tsx`

*   **Rôle :** Page du profil utilisateur.
*   **Description :** Affiche les informations de l'utilisateur (nom, email, rôle). Contient un bouton pour les actions de créateur (créer un événement) ou de demande de statut créateur.
*   **Fonctionnalités Clés :** Affichage informations utilisateur, Gestion du rôle utilisateur, Navigation vers les pages liées au rôle.
*   **Améliorations Récentes :** Affichage conditionnel pendant le chargement des données utilisateur.

#### `app/mainView/events/`

*   **Rôle :** Contient les pages liées aux événements spécifiques, souvent utilisées pour les détails ou les actions sur un événement.

##### `app/mainView/events/[eventId].tsx`

*   **Rôle :** Page de détails d'un événement spécifique.
*   **Description :** Route dynamique gérée par Expo Router (`[eventId]`). Utilise l'ID de l'événement passé en paramètre pour charger les détails complets depuis Firestore et les affiche.
*   **Fonctionnalités Clés :** Lecture ID paramètre URL (`useLocalSearchParams`), Chargement détails événement (Firestore), Affichage détails (nom, date/heure formatée, lieu, description, image, prix, billets).
*   **Améliorations Récentes :** Gestion chargement/erreur.

##### `app/mainView/events/create.tsx`

*   **Rôle :** Page de création d'un nouvel événement.
*   **Description :** Fournit un formulaire pour que les créateurs puissent saisir toutes les informations nécessaires pour un événement et le sauvegarder dans Firestore.
*   **Fonctionnalités Clés :** Formulaire de saisie, Sauvegarde événement (Firestore), Conversion date/heure en Timestamp, Génération et stockage champ `slug`, Indicateur de chargement, Validation basique.

### `app/firebase.ts`

*   **Rôle :** Fichier central pour l'initialisation et la configuration des services Firebase.
*   **Description :** Initialise l'application Firebase avec vos clés de configuration. Exporte les instances `auth`, `db` (Firestore), et `storage`.
*   **Sections potentielles (si ajoutées pour le développement) :** Logique `if (__DEV__) { connect...Emulator(...) }` pour connecter l'application aux émulateurs Firebase en mode développement.

### `app/context/`

*   **Rôle :** Contient les Contextes React pour la gestion de l'état global ou le partage de données.

#### `app/context/UserDetailContext.js` (ou .tsx)

*   **Rôle :** Fournit un Contexte pour stocker et accéder aux détails de l'utilisateur connecté (nom, email, rôle, etc.) depuis n'importe quel composant descendant.
*   **Description :** Probablement un `createContext` et un Provider qui gère l'état des détails utilisateur.
*   **Fonctionnalités Clés :** Gestion de l'état global de l'utilisateur, Partage des informations utilisateur.

---

Cette documentation vous donne une vue d'ensemble des fichiers et de leur rôle dans votre projet `app/`. N'hésitez pas à l'ajuster ou à l'étendre si d'autres fichiers ou dossiers importants existent ! 
