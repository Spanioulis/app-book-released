import { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export const UserContext = createContext();

const UseProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signOutUser = () => signOut(auth);

    // Observador
    // Nos permite ejecutar algo por cada renderizado que se haga en nuestro sitio web, o si nosotros le indicamos que esté pendiente de ciertas cosas (dependencias¿?)
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, photoURL, displayName, uid } = user;
                setUser({ email, photoURL, displayName, uid });
            } else {
                setUser(null);
            }
        });

        return () => unsuscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser }}>
            {' '}
            {children}{' '}
        </UserContext.Provider>
    );
};

export default UseProvider;
