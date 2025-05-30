import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useRouter } from 'expo-router';

// Définir un type pour les données d'événement
interface Event {
  id: string;
  name: string;
  date: string; // Ajustez le type si la date est un objet Date ou autre
  description: string; // Assurez-vous que ces champs correspondent à Firestore
  // Ajoutez d'autres champs d'événement si nécessaire (image, lieu, etc.)
}

export default function PremierePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, 'events'); 
        const querySnapshot = await getDocs(eventsCollectionRef);
        const eventsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        } as Event));
        setEvents(eventsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); 

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => {

        console.log("Naviguer vers les détails de l'événement :", item.id);

      }}
    >
      
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{item.name || 'Nom de l\'événement inconnu'}</Text>
          <Text style={styles.eventDate}>{item.date || 'Date inconnue'}</Text> 
          
        </View>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent} 
        />
      ) : (
        <Text>Aucun événement trouvé.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', 
  },
  flatListContent: {
    paddingBottom: 20, 
  },
  eventItem: {
    backgroundColor: '#fff', 
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  eventInfo: {
    
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
  },
});
