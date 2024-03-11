
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCby9_958-jTz78atmBnPA4s-z7_Eixlu0",
  authDomain: "vue-3-noteballs.firebaseapp.com",
  projectId: "vue-3-noteballs",
  storageBucket: "vue-3-noteballs.appspot.com",
  messagingSenderId: "813153875158",
  appId: "1:813153875158:web:6a332ff356875ed1744577"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const auth = getAuth(app);

export {
  db,
  auth
}