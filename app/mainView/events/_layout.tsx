import { Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Les pages à l'intérieur du dossier 'events' seront des enfants de ce Stack */}
      {/* Par exemple: create.tsx, request-creator-form.tsx */}
    </Stack>
  );
}
