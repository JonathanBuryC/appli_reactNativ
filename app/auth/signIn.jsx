import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { UserDetailContext } from '../../context/UserDetailContext'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    if (!email || !password) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.BOTTOM);
      setLoading(false);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        await getUserDetails();
        setLoading(false);
        router.replace('/mainView/premierePage');
      }).catch(e => {
        setLoading(false);
        ToastAndroid.show('Email ou Password incorrect', ToastAndroid.BOTTOM);
      })
  }

  const getUserDetails = async () => {
    const result = await getDoc(doc(db, 'users', email));
    setUserDetail(result.data());
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/logoV1.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Welcome Back
      </Text>
      <View style={styles.form}>
        <TextInput
          placeholder='Email'
          onChangeText={text => setEmail(text.trim())} 
          style={styles.textInput}
          keyboardType="email-address"
          placeholderTextColor="rgba(0,0,0,0.4)"
        />
        <TextInput
          placeholder='Password'
          onChangeText={text => setPassword(text.trim())}
          secureTextEntry={true}
          style={styles.textInput}
          placeholderTextColor="rgba(0,0,0,0.4)"
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={onSignInClick} disabled={loading}>
          <LinearGradient
            colors={['#ff5fcb', '#8f5cff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}>
            {!loading ?
              <Text style={styles.buttonText}>Sign In</Text>
              :
              <ActivityIndicator size="large" />
            }
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={{ color: '#888' }}>
          Don't have an account?
        </Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.linkText}>
            Create New Here
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10
  },
  touchableOpacity: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15
  },
  gradientButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5
  }
});