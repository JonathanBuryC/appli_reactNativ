import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
apiKey: "AIzaSyCT1yUcI1fs4UVGVkf43goJVkCmpCJs-jQ",
  authDomain: "jnight-4c40a.firebaseapp.com",
  projectId: "jnight-4c40a",
  storageBucket: "jnight-4c40a.firebasestorage.app",
  messagingSenderId: "446375950570",
  appId: "1:446375950570:web:bc8acb98c6d238a1c4bf93",
  measurementId: "G-ZBK28RTRMH"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);