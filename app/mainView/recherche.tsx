import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ajustez le chemin si nécessaire
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
    const lowerCaseQuery = query.toLowerCase();
    const now = new Date(); // Date actuelle pour filtrer les événements passés

    const filtered = allEvents.filter(event => {
      // 1. Exclure les événements passés
      const eventDate = typeof event.date === 'string'
        ? new Date(event.date) // Assurez-vous que les strings peuvent être parsées en Date
        : event.date && typeof event.date === 'object' && 'seconds' in event.date
          ? new Date(event.date.seconds * 1000)
          : null;

      if (eventDate && eventDate < now) {
        return false; // Exclure l'événement s'il est passé
      }

      // 2. Filtrer par nom, lieu, description, OU date formatée
      const searchableText = [
        event.name,
        event.location,
        event.description,
        formatTimestamp(event.date) // Inclure la date formatée dans le texte de recherche
      ].filter(Boolean).join(' ').toLowerCase(); // Joindre tous les champs pertiniss en une seule chaîne

      return searchableText.includes(lowerCaseQuery); // Vérifier si la requête est incluse dans le texte combiné
    });

    setFilteredEvents(filtered);
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
      style={styles.eventItem} // Utilise le nouveau style pour l'élément de liste
      onPress={() => {
        router.push(`/mainView/events/${item.id}`);
        console.log("Naviguer vers les détails de l'événement :", item.id);
      }}
    >
      
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
        ) : (
          <View style={styles.noImageIcon}>
             <Ionicons name="image-outline" size={30} color="#888" /> 
           </View>
        )}

       
        <View style={styles.eventInfo}>
          <Text style={styles.eventName} numberOfLines={1}>{item.name || 'Nom de l\'événement inconnu'}</Text> 
          <Text style={styles.eventDate} numberOfLines={1}>Quand: {formatTimestamp(item.date)}</Text>
          <Text style={styles.eventLocation} numberOfLines={1}>Où: {item.location || 'Lieu inconnu'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      

<TextInput
        style={styles.searchInput}
        // Mettez à jour le placeholder
        placeholder="Rechercher par nom, lieu, date, description..."
        value={searchQuery}
        onChangeText={handleSearch}
        // Ajoutez la couleur du placeholder
        placeholderTextColor="rgba(0,0,0,0.4)"
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
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    // Ajoutez ceci si vous voulez centrer la barre de recherche :
    // alignSelf: 'center',
    // width: '95%', // Optionnel : ajuster la largeur si centré
  },
  flatListContent: {
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    marginBottom: 10, // Espacement entre les items
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Ombre plus légère
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
    // Pas de padding direct ici, le padding est dans la View interne pour l'alignement
  },
  eventImage: {
    width: 60, // Taille de l'image réduite (petit carré)
    height: 60,
    borderRadius: 4, // Arrondir légèrement les coins de l'image
    marginRight: 10, // Espacement entre l'image et les infos
    resizeMode: 'cover',
  },
   noImageIcon: {
     width: 60, // Même taille que l'image
     height: 60,
     borderRadius: 4,
     backgroundColor: '#e9e9e9', // Couleur de fond pour l'icône
     justifyContent: 'center',
     alignItems: 'center',
     marginRight: 10,
   },
  eventInfo: {
    flex: 1, // Permet aux infos de prendre l'espace restant
    justifyContent: 'center', // Centrer verticalement le texte
  },
  eventName: {
    fontSize: 16, // Taille de police légèrement réduite
    fontWeight: 'bold',
    // marginBottom: 2, // Ajuster l'espacement si nécessaire
  },
  eventDate: {
    fontSize: 12, // Taille de police plus petite
    color: '#555',
    // marginBottom: 1, // Ajuster l'espacement
  },
   eventLocation: {
     fontSize: 12, // Taille de police plus petite
     color: '#555',
   }
});
