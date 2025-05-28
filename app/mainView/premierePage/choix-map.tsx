import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChoisirPosition() {
  const router = useRouter();

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Choisir votre position géographique</Text>
        <Text style={styles.text}>
          Ici, tu pourras implémenter la sélection de ta position via une carte ou la géolocalisation.
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
    backgroundColor: 'grey',
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