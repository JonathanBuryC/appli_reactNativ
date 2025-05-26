import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Calendrier() {
  const router = useRouter();

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Calendrier des événements</Text>
        <Text style={styles.text}>
          Ici, tu pourras afficher un calendrier interactif avec les dates importantes.
        </Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});