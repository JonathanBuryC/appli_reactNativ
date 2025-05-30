import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { UserDetailContext } from '../../context/UserDetailContext'

export default function SignUp() {
  const router = useRouter();  
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const CreateNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log('\x1b[32mUser created successfully:\x1b[0m', user);
        await SaveUser(user);
      })
      .catch(e => {
        console.log(e.message)
      })
  }

  const SaveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      role: 'user', // Added role field
      uid: user?.uid
    }
    await setDoc(doc(db, 'users', email), data)
    setUserDetail(data);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/logoV1.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Create new account
      </Text>
      <View style={styles.form}>
        <TextInput placeholder='Full Name' onChangeText={setFullName} style={styles.textInput} />
        <TextInput placeholder='Email' onChangeText={setEmail} style={styles.textInput} keyboardType="email-address" />
        <TextInput placeholder='Password' onChangeText={setPassword} secureTextEntry={true} style={styles.textInput} />

        <TouchableOpacity style={styles.touchableOpacity} onPress={CreateNewAccount}>
          <LinearGradient
            colors={['#ff5fcb', '#8f5cff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={{ color: '#888' }}>
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={styles.linkText}>
            Sign In
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