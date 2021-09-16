import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDzhofE6j8JeZuLoNpWLDjzwBozJaF1HXM',
  authDomain: 'react-journal-app-dc812.firebaseapp.com',
  projectId: 'react-journal-app-dc812',
  storageBucket: 'react-journal-app-dc812.appspot.com',
  messagingSenderId: '158068733809',
  appId: '1:158068733809:web:1a2192d6330cef4cb1a8d0',
};

// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
