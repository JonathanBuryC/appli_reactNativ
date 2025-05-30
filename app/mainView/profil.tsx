import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useEffect, useState } from 'react';

interface UserData {
  name?: string;
  email?: string;
  role?: string;
  profilePictureUrl?: string;
}

export default function Profil() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.role || 'user');
            setUserData(userData as UserData);
            console.log("Données utilisateur récupérées :", userData);
          } else {
            console.warn("User document not found in Firestore for UID:", user.uid);
            setUserRole('user');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('user');
        }
      } else {
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, [auth.currentUser]);

  const handleCreateEventButtonPress = () => {
    if (userRole === 'creator') {
      router.push('/mainView/events/create');
    } else if (userRole === 'user') {
      router.push('/mainView/events/request-creator-form');
    } else {
      // Affiche une alerte si l'utilisateur n'est pas connecté ou si le rôle n'est pas chargé
      alert('Veuillez patienter pendant le chargement des informations utilisateur.');
      // Optionnel : rediriger vers la connexion
      // if (!auth.currentUser) router.push('/auth/signIn');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ton profil</Text>

      {userData ? (
        <>
          <View style={styles.profileImageContainer}>
            <Image
              source={userData.profilePictureUrl ? { uri: userData.profilePictureUrl } : require('../../assets/images/default-profile.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{userData.name || 'Nom inconnu'}</Text>
            <Text style={styles.userEmail}>{userData.email || 'Email inconnu'}</Text>
          </View>
        </>
      ) : (
        <Text>Chargement des informations utilisateur...</Text>
      )}

      <TouchableOpacity
        style={styles.createEventButton}
        onPress={handleCreateEventButtonPress}
      >
        <Text style={styles.buttonText}>
          {userRole === 'creator' ? 'Créer un événement' : 'Devenir Créateur'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  userInfoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
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