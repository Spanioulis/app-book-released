import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db, auth } from '../firebase/firebaseConfig';

export const useBooks = () => {
   const [userBooks, setUserBooks] = useState([]);
   const [books, setBooks] = useState([]);
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);

   const getBooks = async () => {
      try {
         setLoading(true);
         const booksRefCollection = collection(db, 'books');

         const q = query(booksRefCollection, where('uid', '==', auth.currentUser.uid));
         const data = await getDocs(q);
         const dataDB = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
         }));
         setUserBooks(dataDB);
         // All books de la base de datos (home !== landing)
         const queryAllSnapshot = await getDocs(booksRefCollection);
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

   return {
      auth,
      userBooks,
      error,
      getBooks,
      loading,
      books
   };
};
