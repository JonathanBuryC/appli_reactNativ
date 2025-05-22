import { useRouter } from "expo-router";

// Dans ton composant
const router = useRouter();

// Pour naviguer
<TouchableOpacity onPress={() => router.push("/tabs/matches")}>
  <Text>Voir mes matchs</Text>
</TouchableOpacity>







import { Background } from "@react-navigation/elements";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MatchMaker 💘</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/45.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sophie, 26</Text>
        <Text style={styles.bio}>Fan de randonnées, cuisine asiatique & Netflix 📺</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.dislike]}>
          <Text style={styles.buttonText}>🙅 Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.like]}>
          <Text style={styles.buttonText}>💖 Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#e91e63",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    width: "100%",
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  bio: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  like: {
    backgroundColor: "#e91e63",
  },
  dislike: {
    backgroundColor: "#bbb",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
