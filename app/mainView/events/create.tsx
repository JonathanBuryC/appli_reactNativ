import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native'; // Import Alert
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Timestamp
import { db, auth } from '../../../firebase'; // Assurez-vous que le chemin d'accès à firebase.ts est correct

export default function CreateEvent() {
  const router = useRouter();

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(''); // TODO: Remplacer par un DatePicker
  const [eventTime, setEventTime] = useState(''); // Nouveau state pour l'heure - TODO: Remplacer par un TimePicker
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // TODO: Remplacer par une fonctionnalité de téléchargement d'image vers Storage
  const [price, setPrice] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [loading, setLoading] = useState(false); // State pour indiquer le chargement

  // Fonction utilitaire pour générer un slug simple
  const generateSlug = (name: string, date: string): string => {
    const formattedName = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    const formattedDate = date.replace(/[^0-9]/g, ''); // Garder seulement les chiffres pour la date
    return `${formattedName}-${formattedDate}`;
  };

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventTime || !eventLocation || !price || !totalTickets || !imageUrl) {
      Alert.alert("Champs manquants", "Veuillez remplir tous les champs pour créer un événement.");
      return;
    }

    setLoading(true); // Activer l'indicateur de chargement

    try {
      // Tenter de créer un objet Date valide
      const dateString = `${eventDate} ${eventTime}`; // Combiner date et heure
      const eventDateTime = new Date(dateString);

      if (isNaN(eventDateTime.getTime())) {
        Alert.alert("Format date/heure invalide", "Veuillez entrer une date et une heure valides (ex: YYYY-MM-DD HH:mm).");
        setLoading(false);
        return;
      }

      // Générer le slug
      const eventSlug = generateSlug(eventName, eventDate);

      const eventData = {
        name: eventName,
        // Stocker la date et l'heure combinées en Timestamp Firestore
        date: Timestamp.fromDate(eventDateTime),
        location: eventLocation,
        description: eventDescription,
        imageUrl: imageUrl, // L'URL de l'image
        price: parseFloat(price),
        totalTickets: parseInt(totalTickets, 10),
        availableTickets: parseInt(totalTickets, 10),
        creatorId: auth.currentUser?.uid,
        attendees: [],
        createdAt: Timestamp.now(), // Timestamp de création du document
        slug: eventSlug, // Ajouter le champ slug
      };

      // Utiliser addDoc pour laisser Firestore générer un ID aléatoire unique
      const docRef = await addDoc(collection(db, 'events'), eventData);

      console.log("Document événement créé avec l'ID :", docRef.id);
      Alert.alert("Succès", "L'événement a été créé avec succès !");

      // Réinitialiser les champs après succès
      setEventName('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      setEventDescription('');
      setImageUrl('');
      setPrice('');
      setTotalTickets('');

      // Optionnel : naviguer vers une autre page après succès (par exemple, la liste des événements)
      // router.push('/mainView/premierePage');

    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la création de l'événement.");
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un nouvel événement</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de l'événement"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date de l'événement (ex: YYYY-MM-DD)" // Indiquer le format attendu
        value={eventDate}
        onChangeText={setEventDate}
        keyboardType="numbers-and-punctuation" // Aide à la saisie de la date
      />

       <TextInput
        style={styles.input}
        placeholder="Heure de l'événement (ex: HH:mm)" // Nouveau champ pour l'heure
        value={eventTime}
        onChangeText={setEventTime}
        keyboardType="numbers-and-punctuation" // Aide à la saisie de l'heure
      />

      <TextInput
        style={styles.input}
        placeholder="Lieu de l'événement"
        value={eventLocation}
        onChangeText={setEventLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Description de l'événement"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline // Permettre plusieurs lignes pour la description
      />

      <TextInput
        style={styles.input}
        placeholder="URL de l'image de l'événement"
        value={imageUrl}
        onChangeText={setImageUrl}
        keyboardType="url" // Clavier optimisé pour URL
      />

      <TextInput
        style={styles.input}
        placeholder="Prix (ex: 10.00)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric" // Clavier numérique
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre total de billets"
        value={totalTickets}
        onChangeText={setTotalTickets}
        keyboardType="number-pad" // Clavier numérique sans décimales
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateEvent}
        disabled={loading} // Désactiver le bouton pendant le chargement
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> // Afficher un indicateur de chargement dans le bouton
        ) : (
          <Text style={styles.buttonText}>Créer l'événement</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permet au ScrollView de s'agrandir
    padding: 20,
    backgroundColor: '#f8f8f8', // Couleur de fond
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
