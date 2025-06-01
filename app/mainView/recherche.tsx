import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Ajustez le chemin si nécessaire
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Définir un type pour les données d'événement (doit correspondre à votre structure Firestore)
interface Event {
  id: string;
  name: string;
  date: string | { seconds: number }; // Peut être une string ou un objet Firestore Timestamp
  location: string; // Assurez-vous d'inclure tous les champs pertinents pour la recherche/affichage
  description: string;
  imageUrl?: string;
  // Ajoutez d'autres champs si nécessaire (price, totalTickets, etc.)
}

export default function Recherche() {
  const [allEvents, setAllEvents] = useState<Event[]>([]); // Liste complète de tous les événements
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); // Liste des événements affichés (filtrés)
  const [searchQuery, setSearchQuery] = useState(''); // État pour le terme de recherche
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, 'events'); // Nom de votre collection
        const querySnapshot = await getDocs(eventsCollectionRef);
        const eventsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Event, 'id'>;
          return {
            id: doc.id,
            ...data,
          };
        });
        setAllEvents(eventsData); // Stocker tous les événements
        setFilteredEvents(eventsData); // Afficher tous les événements initialement
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        // Optionnel : afficher un message d'erreur à l'utilisateur
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois au montage

  // Fonction pour gérer les changements dans le champ de recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredEvents(allEvents); // Si la recherche est vide, afficher tous les événements
    } else {
      // TODO: Implémenter la logique de filtrage basée sur la requête
      // Cette partie sera développée à l'étape suivante
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allEvents.filter(event => {
        // Exemple de filtrage par nom ou lieu (vous pouvez ajouter d'autres champs)
        return (
          (event.name && event.name.toLowerCase().includes(lowerCaseQuery)) ||
          (event.location && event.location.toLowerCase().includes(lowerCaseQuery)) ||
          (event.description && event.description.toLowerCase().includes(lowerCaseQuery)) // Filtrer aussi par description
          // Ajoutez d'autres champs pertinents pour la recherche ici
        );
      });
      setFilteredEvents(filtered);
    }
  };


  // Helper function to format Firestore Timestamp (copié depuis EventDetailsPage)
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'Date/Heure inconnue';
    try {
      const date = timestamp.toDate();
      return date.toLocaleString(); // Formate la date et l'heure selon les paramètres régionaux
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return 'Date/Heure invalide';
    }
  };


  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => {
        // Naviguer vers la page de détails de l'événement filtré
        router.push(`/mainView/events/${item.id}`);
        console.log("Naviguer vers les détails de l'événement :", item.id);
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
         {/* Utiliser la fonction de formatage pour la date */}
        <Text style={styles.eventDate}>Quand: {formatTimestamp(item.date)}</Text>
         <Text style={styles.eventLocation}>Où: {item.location || 'Lieu inconnu'}</Text> {/* Afficher aussi le lieu */}
         {/* Optionnel: Afficher un court extrait de la description si pertinent */}
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher des événements (nom, lieu, description...)"
        value={searchQuery}
        onChangeText={handleSearch} // Appeler handleSearch lors de la saisie
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents} // Utiliser les événements filtrés pour l'affichage
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
    paddingTop: 10, // Ajuster le padding pour laisser de la place à la barre de recherche
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10, // Espacement sous la barre de recherche
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 0,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 180, // Hauteur légèrement ajustée pour s'intégrer avec la barre de recherche
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
   noImageIcon: {
     width: '100%',
     height: 180,
     backgroundColor: '#e0e0e0',
     justifyContent: 'center',
     alignItems: 'center',
     borderTopLeftRadius: 8,
     borderTopRightRadius: 8,
   },
  eventInfo: {
    padding: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2, // Espacement réduit
  },
   eventLocation: { // Style pour le lieu
     fontSize: 14,
     color: '#555',
     marginBottom: 5,
   }
});
