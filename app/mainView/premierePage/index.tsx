import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase'; // Assurez-vous que le chemin d'accès à firebase.ts est correct

export default function Accueil() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, 'events');
        const q = query(eventsCollectionRef, orderBy('date', 'asc')); // Tri par date ascendante
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage du composant

  const renderEventItem = ({ item }) => {
    // Formater la date pour l'affichage
    const eventDate = item.date instanceof Timestamp ? item.date.toDate().toLocaleDateString() : item.date;

    return (
      <View style={styles.eventItem}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{eventDate}</Text>
        {/* Vous pouvez ajouter d'autres informations de l'événement ici */}
      </View>
    );
  };

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
         {/* TODO: Add a button here to navigate to the Create Event page for creators */}
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Événements à venir</Text>
        {loading ? (
          <Text>Chargement des événements...</Text>
        ) : events.length > 0 ? (
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            // Vous pouvez ajouter des séparateurs de date ici si nécessaire
          />
        ) : (
          <Text>Aucun événement trouvé.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Ajouté pour s'assurer que le fond est blanc
  },
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
    marginTop: 20, // Ajouté un peu de marge en haut
    // Removed justifyContent and alignItems so the list can take full width
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', // Ajouté pour mettre en évidence le titre
    marginBottom: 15, // Ajouté un peu de marge en bas
  },
  eventItem: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
