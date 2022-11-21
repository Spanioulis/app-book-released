import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID
    // apiKey: 'AIzaSyC-IJlwTLfWqOSzW4efdsITdpAjOWdLHAQ',
    // authDomain: 'auth-released-book.firebaseapp.com',
    // projectId: 'auth-released-book',
    // storageBucket: 'auth-released-book.appspot.com',
    // messagingSenderId: '530532333366',
    // appId: '1:530532333366:web:b2456ca8dfa79ab179a597'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
