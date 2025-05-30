import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
// import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore'; // Commenté
// import { db } from '../../../firebase'; // Commenté

// Define a type for event data to improve type safety
// interface EventData { /* Commenté */ }

export default function Accueil() {
  const router = useRouter();
  // const [events, setEvents] = useState<EventData[]>([]); // Commenté
  // const [loading, setLoading] = useState(true); // Commenté

  // useEffect(() => { /* Commenté */ });

  // const renderEventItem = ({ item }: { item: EventData }) => { /* Commenté */ };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil Page</Text>
    </View>
  );
}

// const styles = StyleSheet.create({ /* Commenté */ });
