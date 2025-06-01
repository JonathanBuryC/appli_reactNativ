import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native'; // Import Image
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import { doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc
import { db } from '../../../firebase'; 

// Définir un type pour les données d'événement
interface EventDetails {
  id: string;
  name: string;
  date: any; // Sera un Timestamp, mais utilisez 'any' pour simplifier ici ou Timestamp type
  location: string;
  description: string;
  imageUrl?: string;
  price: number;
  totalTickets: number;
  availableTickets: number;
  creatorId: string;
  attendees: string[];
  createdAt: any; // Sera un Timestamp
  slug: string;
  // Ajoutez d'autres champs si nécessaire
}

export default function EventDetailsPage() {
  const { eventId } = useLocalSearchParams(); // Lire l'ID de l'événement depuis les paramètres de l'URL

  console.log("ID de l'événement reçu via les paramètres de l'URL :", eventId);

  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setError("Aucun ID d'événement fourni.");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        // Récupérer le document de l'événement depuis Firestore en utilisant l'ID
        const eventDocRef = doc(db, 'events', eventId as string); // eventId est un string, on le caste
        const eventDocSnap = await getDoc(eventDocRef);

        if (eventDocSnap.exists()) {
          setEventDetails({ id: eventDocSnap.id, ...eventDocSnap.data() as EventDetails });
          console.log("Détails de l'événement récupérés :", eventDocSnap.data());
        } else {
          setError("Événement non trouvé.");
          console.log("Aucun document trouvé pour l'ID :", eventId);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des détails de l'événement :", err);
        setError("Erreur lors du chargement des détails de l'événement.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]); // Re-déclencher si l'ID de l'événement change (bien que peu probable dans ce cas)

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de l'événement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!eventDetails) {
     return (
       <View style={styles.centered}>
         <Text>Aucun détail d'événement à afficher.</Text>
       </View>
     );
   }


  // Helper function to format Firestore Timestamp
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


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {eventDetails.imageUrl && (
        <Image source={{ uri: eventDetails.imageUrl }} style={styles.eventImage} />
      )}

      <Text style={styles.eventName}>{eventDetails.name}</Text>
      
      <Text style={styles.eventDate}>Quand: {formatTimestamp(eventDetails.date)}</Text>
      <Text style={styles.eventLocation}>Où: {eventDetails.location}</Text>
      <Text style={styles.eventDescription}>{eventDetails.description}</Text>
      <Text style={styles.eventPrice}>Prix: {eventDetails.price} €</Text> 
      <Text style={styles.eventTickets}>Billets disponibles: {eventDetails.availableTickets} / {eventDetails.totalTickets}</Text>

      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  eventImage: {
    width: '100%',
    height: 250, // Hauteur de l'image plus grande pour les détails
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
   eventLocation: {
     fontSize: 16,
     color: '#555',
     marginBottom: 5,
   },
   eventDescription: {
     fontSize: 16,
     marginTop: 10,
     marginBottom: 15,
     lineHeight: 24, // Espacement des lignes pour la description
   },
   eventPrice: {
     fontSize: 18,
     fontWeight: 'bold',
     color: '#007BFF',
     marginBottom: 5,
   },
   eventTickets: {
     fontSize: 16,
     color: '#555',
   }
});
