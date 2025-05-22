import { View, Text, StyleSheet } from "react-native";

export default function Matches() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 Tes Matchs</Text>
      <Text style={styles.text}>(Fonctionnalité en cours...)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
  },
});
