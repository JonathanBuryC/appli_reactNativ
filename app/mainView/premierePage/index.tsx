import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Accueil() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Barre de boutons en haut */}
      <View style={styles.topButtonsContainer}>
        {/* Bouton Map */}
        <TouchableOpacity
          onPress={() => router.push('/mainView/premierePage/choix-map')}
          style={styles.roundButton}
        >
          <Ionicons name="location-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Bouton Calendrier */}
        <TouchableOpacity
          onPress={() => router.push('/mainView/premierePage/calendrier')}
          style={styles.roundButton}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue sur l'accueil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});
