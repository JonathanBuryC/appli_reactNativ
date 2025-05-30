import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native'; // Importez View et Text si nécessaire (bien qu'Ionicons suffise généralement)

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="premierePage"
        options={{
          title: 'Accueil', // Le titre reste pour le header de l'écran si header est visible
          tabBarLabel: () => null, // Masque le texte sous l'icône dans la barre d'onglets
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherche',
          tabBarLabel: () => null, // Masque le texte sous l'icône dans la barre d'onglets
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="mes-billets"
        options={{
          title: 'Mes billets',
          tabBarLabel: () => null, // Masque le texte sous l'icône dans la barre d'onglets
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarLabel: () => null, // Masque le texte sous l'icône dans la barre d'onglets
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      {/* L'onglet "events" reste caché et n'a pas de libellé dans la barre */}
      {/* Cet onglet est utilisé pour les sous-pages comme les détails d'événement ou la création */}
      <Tabs.Screen
        name="events"
        options={{
          tabBarButton: () => null, // cache le bouton dans la tab bar
          headerShown: true, // Afficher le header par défaut pour les sous-écrans comme les détails d'événement
        }}
      />
    </Tabs>
  );
}
