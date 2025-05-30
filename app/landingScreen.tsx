import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { UserDetailContext } from '../context/UserDetailContext';


export default function LandingScreen() {
  const router = useRouter();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, redirect to the main view
      if (user.email) {
        const result = await getDoc(doc(db, 'users', user.email));
        setUserDetail({result: result.data()});
        router.replace('/mainView/premierePage');
      } else {
        console.warn("User email is null");
      }
      
    } else {
      // User is not signed in, stay on the landing screen
      console.log('\x1b[35mUser n est pas de base connecté\x1b[0m');
    }
  })

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/landing.png')}
        style={styles.image}
      />
      <View style={styles.contentBox}>
        <Text style={styles.title}>hey, bienvenue sur Jnight !</Text>
        <Text style={styles.subtitle}>
          {'\n'}Jnight est une application te permettant de touver toutes les soirées juives de ta régions.
        </Text>
        <Pressable style={styles.button} onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.buttonText}>  
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  contentBox: {
    backgroundColor: 'rgba(226, 38, 226, 0.6)',
    padding: 25,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});