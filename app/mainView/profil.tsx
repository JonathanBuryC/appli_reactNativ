import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

export default function Profil() {
  const router = useRouter(); // Initialize useRouter

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Ton profil</Text>
      {/* Button for Creator actions or Request */}
      <TouchableOpacity
        style={styles.createEventButton}
        // We will add the navigation logic here in a later step (4.5)
        onPress={() => alert('Logique de navigation à implémenter')}
      >
        <Text style={styles.buttonText}>Créer un événement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  createEventButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
