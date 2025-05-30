import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Assurez-vous que le chemin d'accès est correct

export default function RequestCreatorForm() {
  const router = useRouter();

  const [whoAreYou, setWhoAreYou] = useState('');
  const [pastEvents, setPastEvents] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmitRequest = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Vous devez être connecté pour soumettre une demande.');
      return;
    }

    if (!whoAreYou || !phoneNumber) {
      alert('Veuillez remplir les champs obligatoires (Qui êtes-vous, Numéro de téléphone).');
      return;
    }

    try {
      const requestData = {
        userId: user.uid, // L'UID de l'utilisateur faisant la demande
        email: user.email, // L'email de l'utilisateur
        whoAreYou: whoAreYou,
        pastEvents: pastEvents, // Information sur les événements passés
        socialMediaLinks: socialMediaLinks, // Liens vers les réseaux sociaux
        phoneNumber: phoneNumber,
        createdAt: Timestamp.now(), // Timestamp de la demande
        status: 'pending', // Statut de la demande: pending, approved, rejected
      };

      // Sauvegarder la demande dans une nouvelle collection 'creatorRequests'
      await addDoc(collection(db, 'creatorRequests'), requestData);

      alert('Votre demande pour devenir créateur a été soumise avec succès ! Nous vous contacterons bientôt.');
      // Rediriger l'utilisateur après la soumission
      router.back(); // Retour à la page précédente (profil)
    } catch (error) {
      console.error("Erreur lors de la soumission de la demande :", error);
      alert('Erreur lors de la soumission de votre demande.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Devenir Créateur - Demande</Text>
      <Text style={styles.description}>
        Veuillez fournir les informations suivantes pour soumettre votre demande de compte créateur.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Qui êtes-vous ? (Organisation, artiste, etc.)"
        value={whoAreYou}
        onChangeText={setWhoAreYou}
        multiline
      />
       <TextInput
        style={styles.input}
        placeholder="Avez-vous déjà organisé des événements ? Lesquels ? (Optionnel)"
        value={pastEvents}
        onChangeText={setPastEvents}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Liens vers vos réseaux sociaux / site web (Optionnel)"
        value={socialMediaLinks}
        onChangeText={setSocialMediaLinks}
        keyboardType="url"
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmitRequest}>
        <Text style={styles.buttonText}>Soumettre la demande</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Annuler</Text>
      </TouchableOpacity>
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
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  input: {
    minHeight: 50, // Adjusted for multiline input, allow it to grow
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10, // Add padding to the top
    borderRadius: 5,
    textAlignVertical: 'top', // Align text to the top for multiline
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', // Center button text
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center', // Center button text
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});