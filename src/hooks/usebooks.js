import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
import { useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';

export const useBooks = () => {
    // Obtenemos todos los books
    const [userBooks, setUserBooks] = useState([]);
    console.log('userBooks', userBooks);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    // Queremos leer la base de datos
    // ! Este archivo solo será para los Books
    // TODO -> Cambiar a getBooks
    const getBooks = async () => {
        try {
            setLoading(true);
            // Books por 'usuer'
            // TODO -> Hacerlo dinámico!
            const booksRefCollection = collection(db, 'books');
            const q = query(booksRefCollection, where('uid', '==', auth.currentUser.uid));
            const data = await getDocs(q);
            const dataDB = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserBooks(dataDB);
            // All books de la base de datos (home !== landing)
            const queryAllSnapshot = await getDocs(collection(db, 'books'));
            const allDataDB = queryAllSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setBooks(allDataDB);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // AÑADIR LIBRO
    //* addDoc (para book subido) -> No le pasamos el id, y él solito lo gestiona. Lo gestionaremos en el componente "UploadBook" o similar
    const addBook = async (book) => {
        try {
            setLoading(true);
            const newDoc = {
                title,
                authors,
                pageCount,
                imgURL,
                enabled,
                // SINOPSIS
                // también...
                uid: auth.currentUser.id
            };
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        auth,
        userBooks,
        error,
        getBooks,
        loading,
        books
    };
};
