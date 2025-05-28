import { Stack } from 'expo-router';

export default function MesBilletsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mes billets',
          headerTitleAlign: 'center',
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="passe"
        options={{
          title: 'Événements passés',
          headerTitleAlign: 'center',
          headerBackVisible: true, // Ajouté pour forcer la flèche de retour
        }}
      />
      <Stack.Screen
        name="a-venir"
        options={{
          title: 'Tes billets à venir',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="en-attente"
        options={{
          title: 'En attente',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}