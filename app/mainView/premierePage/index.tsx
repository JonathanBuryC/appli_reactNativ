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
        const eventsCollectionRef = collection(db, 'events'); // Assurez-vous que 'events' est le nom correct de votre collection
        const querySnapshot = await getDocs(eventsCollectionRef);
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Event, // Caster les données pour correspondre à l'interface Event
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        // Optionnel : afficher un message d'erreur à l'utilisateur
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois au montage

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => {
        // TODO: Naviguer vers la page de détails de l'événement
        console.log("Naviguer vers les détails de l'événement :", item.id);
        // Exemple de navigation (sera implémenté à l'étape 6)
        // router.push(`/mainView/events/${item.id}`);
      }}
    >
      {/* Optionnel : ajouter une image de fond pour chaque événement */}
      {/* <ImageBackground source={{ uri: item.imageUrl }} style={styles.eventImage}> */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{item.name || 'Nom de l\'événement inconnu'}</Text>
          <Text style={styles.eventDate}>{item.date || 'Date inconnue'}</Text> {/* Assurez-vous que le format est affichable */}
          {/* Afficher d'autres informations si nécessaire */}
        </View>
      {/* </ImageBackground> */}
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
          contentContainerStyle={styles.flatListContent} // Appliquer des styles au contenu de la liste
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
    backgroundColor: '#f0f0f0', // Couleur de fond légère
  },
  flatListContent: {
    paddingBottom: 20, // Ajouter un peu d'espace en bas de la liste
  },
  eventItem: {
    backgroundColor: '#fff', // Fond blanc pour chaque élément
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000', // Ombre pour un effet de profondeur
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
  },
  eventInfo: {
    // Styles pour le conteneur des infos (texte)
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
  // eventImage: {
  //   width: '100%', // Prend toute la largeur de l'item
  //   height: 150, // Hauteur fixe de l'image
  //   justifyContent: 'flex-end', // Aligne le contenu (infos) en bas de l'image
  //   borderRadius: 8,
  //   overflow: 'hidden', // Cache les bords de l'image qui dépassent du borderRadius
  // },
});
