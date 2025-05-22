import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "#aaa",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#eee",
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "index") iconName = "heart";
          else if (route.name === "matches") iconName = "chatbubble";
          else iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Découvrir" }} />
      <Tabs.Screen name="matches" options={{ title: "Matchs" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
