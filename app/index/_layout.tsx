import { Stack } from 'expo-router';

export default function BoutonsAccueilLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'menu',
          headerTitleAlign: 'center',
          headerShown: false, // Masque le header natif (optionnel)
        }}
      />
      <Stack.Screen
        name="choix-map"
        options={{
          title: 'Choix de la carte',
          presentation: 'modal', // Modal transparent glissant du bas
          headerTitleAlign: 'center',
          headerShown: false,               // Masque le header natif (optionnel)
        }}
      />
      <Stack.Screen
        name="calendrier"
        options={{
          title: 'Calendrier',
          presentation: 'modal',
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
