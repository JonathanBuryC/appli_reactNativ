import { View, Text, Image, TextInput, StyleSheet,  TouchableOpacity, Pressable  } from 'react-native'
import React, { useState }  from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore'


export default function SignUp() {
  const router = useRouter();  
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
// const{userDetail,setUserDetail}=useContext(UserDetailContext)

  const CreateNewAccount=( ) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(resp)=> {
      const user = resp.user;
      console.log('\x1b[32mUser created successfully:\x1b[0m', user);
      await SaveUser(user);
      //Save user to database

    })
    .catch(e => {
      console.log(e.message)
    })
  }

  const SaveUser= async(user) => {
    await setDoc(doc(db,'users', email), {
      name: fullName,
      email: email,
      member:false,
      uid:user?.uid
    });
    //navigate to New Screen
  }
  

  return (
    <View style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20}}>
      <Image
        source={require('./../../assets/images/logoV1.png')}
        style={{
          width: 120,
          height: 120,
          alignSelf: 'center'
        }}
      />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
            Create new account 
        </Text>
        <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={styles.textInput} /> 
        <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput} keyboardType="email-address" />  
        <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput} />

        <TouchableOpacity style={styles.touchableOpacity} onPress={CreateNewAccount}>
            <LinearGradient
                colors={['#ff5fcb', '#8f5cff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}>
            
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
            </LinearGradient>
        </TouchableOpacity>

        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#888' }}>
                Already have an account?
            </Text>
            <Pressable onPress={() => router.push ('/auth/signIn')}>
                <Text style={{ color: '#007BFF', fontWeight: 'bold', marginLeft: 5 }}>
                Sign In
                </Text>
            </Pressable>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
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
        backgroundColor: '#007BFF',
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
  }
})