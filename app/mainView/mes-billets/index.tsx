import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MesBillets() {
  const router = useRouter();

  const tabs = [
    { label: 'À venir', path: 'mainView/mes-billets/a-venir' },
    { label: 'En attente', path: 'mainView/mes-billets/en-attente' },
    { label: 'Passés', path: 'mainView/mes-billets/passe' },
  ];

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.path} onPress={() => router.push(tab.path as any)}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text>Sélectionne un onglet pour voir tes billets.</Text>
      </View>
    </View>
  );
}
