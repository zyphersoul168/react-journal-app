import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDzhofE6j8JeZuLoNpWLDjzwBozJaF1HXM',
//   authDomain: 'react-journal-app-dc812.firebaseapp.com',
//   projectId: 'react-journal-app-dc812',
//   storageBucket: 'react-journal-app-dc812.appspot.com',
//   messagingSenderId: '158068733809',
//   appId: '1:158068733809:web:1a2192d6330cef4cb1a8d0',
// };

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCIZvcZTZQPySvJbg52HQlQJoPwUgO9DkQ",
//   authDomain: "learn-firebase-a1f4b.firebaseapp.com",
//   projectId: "learn-firebase-a1f4b",
//   storageBucket: "learn-firebase-a1f4b.appspot.com",
//   messagingSenderId: "453403518596",
//   appId: "1:453403518596:web:414a5c9e7d1b439a0104d1"
// };

// if(process.env.NODE_ENV === "test") {
//   //testing
//   initializeApp(firebaseConfigTesting);
// } else {
//   //dev/prod
//   initializeApp(firebaseConfig);
// }

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
