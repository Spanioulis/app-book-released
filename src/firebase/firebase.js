import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC-IJlwTLfWqOSzW4efdsITdpAjOWdLHAQ',
    authDomain: 'auth-released-book.firebaseapp.com',
    projectId: 'auth-released-book',
    storageBucket: 'auth-released-book.appspot.com',
    messagingSenderId: '530532333366',
    appId: '1:530532333366:web:b2456ca8dfa79ab179a597'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
