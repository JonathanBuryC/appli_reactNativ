import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'; // Importez Image
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importez Ionicons pour l'icône de remplacement

// Définir un type pour les données d'événement
interface Event {
  id: string;
  name: string;
  date: string | { seconds: number }; // Peut être une string ou un objet Firestore Timestamp
  description: string; // Assurez-vous que ces champs correspondent à Firestore
  imageUrl?: string; // Ajoutez le champ imageUrl
  // Ajoutez d'autres champs d'événement si nécessaire (lieu, etc.)
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
        const eventsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Event, 'id'>; // Exclure 'id' du type
          return {
            id: doc.id,
            ...data,
          };
        });
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
        // NAVIGUER VERS LA PAGE DE DÉTAILS DE L'ÉVÉNEMENT
        // Utilisez router.push() avec le chemin dynamique et l'ID de l'événement
        router.push(`/mainView/events/${item.id}`);
        console.log("Tentative de navigation vers :", `/mainView/events/${item.id}`); // Log pour vérifier l'URL de navigation
      }}
    >
      
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      ) : (
        <View style={styles.noImageIcon}>
           <Ionicons name="image-outline" size={50} color="#ccc" />
         </View>
      )}

      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name || 'Nom de l\'événement inconnu'}</Text>
        <Text style={styles.eventDate}>
          {typeof item.date === 'string'
            ? item.date
            : item.date && typeof item.date === 'object' && 'seconds' in item.date
              ? new Date(item.date.seconds * 1000).toLocaleDateString()
              : 'Date inconnue'}
        </Text>
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
    backgroundColor: '#f0f0f0', // Couleur de fond légère
  },
  flatListContent: {
    paddingBottom: 20, // Ajouter un peu d'espace en bas de la liste
  },
  eventItem: {
    backgroundColor: '#fff', // Fond blanc pour chaque élément
    padding: 0, // Réduire le padding pour que l'image prenne le bord
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Important pour que l'image respecte le borderRadius de l'item
  },
  eventImage: {
    width: '100%', // L'image prend toute la largeur de l'élément
    height: 200, // Hauteur fixe pour l'image (ajustez si nécessaire)
    resizeMode: 'cover', // Assure que l'image couvre la zone sans déformation
    borderTopLeftRadius: 8, // Arrondir les coins supérieurs pour correspondre à l'item
    borderTopRightRadius: 8,
  },
   noImageIcon: {
     width: '100%',
     height: 200,
     backgroundColor: '#e0e0e0', // Fond gris clair
     justifyContent: 'center',
     alignItems: 'center',
     borderTopLeftRadius: 8,
     borderTopRightRadius: 8,
   },
  eventInfo: {
    padding: 15, // Ajouter du padding autour des infos textuelles
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
});
