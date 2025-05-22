import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon Profil</Text>
      <Text style={styles.text}>Nom: Jonathan</Text>
      <Text style={styles.text}>Âge: 27</Text>
      <Text style={styles.text}>Bio: Passionné de tech et de voyages 🌍</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff0f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e91e63",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});
