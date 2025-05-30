import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Assurez-vous que le chemin d'accès à firebase.ts est correct

export default function CreateEvent() {
  const router = useRouter();

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(''); // Vous pouvez utiliser un DatePicker ici plus tard
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [totalTickets, setTotalTickets] = useState('');

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventLocation || !price || !totalTickets) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      // Convertir la date et le prix au bon format si nécessaire
      // Pour l'instant, nous allons juste enregistrer les strings,
      // mais il faudra améliorer cela pour utiliser un DatePicker et gérer les nombres correctement.
      const eventData = {
        name: eventName,
        date: eventDate, // À remplacer par un Timestamp Firebase plus tard
        location: eventLocation,
        description: eventDescription,
        imageUrl: imageUrl,
        price: parseFloat(price), // Convertir le prix en nombre
        totalTickets: parseInt(totalTickets, 10), // Convertir le nombre de billets en entier
        availableTickets: parseInt(totalTickets, 10), // Au début, tous les billets sont disponibles
        creatorId: auth.currentUser?.uid, // L'ID de l'utilisateur créateur
        attendees: [], // Liste des participants vide au début
        createdAt: Timestamp.now(), // Timestamp de création
      };

      const docRef = await addDoc(collection(db, 'events'), eventData);
      console.log("Document written with ID: ", docRef.id);
      alert('Événement créé avec succès !');
      // Rediriger l'utilisateur après la création
      router.back(); // Ou rediriger vers une autre page
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Erreur lors de la création de l\'événement.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Créer un nouvel événement</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de l'événement"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date et heure (ex: 2023-12-31 20:00)"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Lieu"
        value={eventLocation}
        onChangeText={setEventLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="URL de l'image"
        value={imageUrl}
        onChangeText={setImageUrl}
        keyboardType="url"
      />
      <TextInput
        style={styles.input}
        placeholder="Prix du billet"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre total de billets"
        value={totalTickets}
        onChangeText={setTotalTickets}
        keyboardType="numeric"
      />

      <Button title="Créer l'événement" onPress={handleCreateEvent} />
      <Button title="Annuler" onPress={() => router.back()} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});