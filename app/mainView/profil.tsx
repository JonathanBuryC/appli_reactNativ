import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Import Image
import { useRouter } from 'expo-router'; // Import useRouter
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db, auth } from '../../firebase'; // Import db and auth from firebase.ts
import { useEffect, useState } from 'react'; // Import useEffect and useState

// Define a type for user data to improve type safety
interface UserData {
  name?: string;
  email?: string;
  role?: string;
  profilePictureUrl?: string;
}
export default function Profil() {
  const router = useRouter(); // Initialize useRouter

  const [userData, setUserData] = useState<UserData | null>(null); // State to store user data
  const [userRole, setUserRole] = useState<string | null>(null); // State to store user's role


  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch the user document from Firestore based on UID
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.role || 'user'); // Default to 'user' if role is not set
            setUserData(userData as UserData); // Store all user data
          } else {
            console.warn("User document not found in Firestore for UID:", user.uid);
            setUserRole('user'); // Assume 'user' role if document is not found
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('user'); // Default to 'user' in case of error
        }
      } else {
        setUserRole(null); // User is not logged in
      }
    };

    fetchUserRole();
  }, [auth.currentUser]); // Refetch role if auth state changes

  const handleCreateEventButtonPress = () => {
    if (userRole === 'creator') {
      // Redirect to Create Event page if user is a creator
      router.push('/mainView/events/create');
    } else if (userRole === 'user') {
      // Redirect to Request Creator Form page if user is a regular user
      router.push('/mainView/events/request-creator-form');
    } else {
      // Handle case where user role is not loaded yet or user is not logged in
      alert('Veuillez patienter pendant le chargement des informations utilisateur.');
      // Optionally redirect to login if not logged in
      // if (!auth.currentUser) router.push('/auth/signIn');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>Ton profil</Text>
      {/* Button for Creator actions or Request */}
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={handleCreateEventButtonPress}
      >
        {/* Display different text based on user role */}
        <Text style={styles.buttonText}>
          {userRole === 'creator' ? 'Créer un événement' : 'Devenir Créateur'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  createEventButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
