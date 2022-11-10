import { useState } from 'react';
import { createContext } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useEffect } from 'react';

export const UserContext = createContext();

const UseProvider = (props) => {
    // TODO -> traer la llamada de la API aquí, y repartirlo...
    const [user, setUser] = useState(false);

    const registerUser = (email, password, district) =>
        createUserWithEmailAndPassword(auth, email, password, district);

    //! district también en el login??
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
            {props.children}{' '}
        </UserContext.Provider>
    );
};

export default UseProvider;
