import { collection, getDocs } from 'firebase/firestore/lite';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    // const [loading, setLoading] = useState(false);
    const usersCollectionRef = collection(db, 'users');

    const getUsers = async () => {
        try {
            // setLoading(true);
            const data = await getDocs(usersCollectionRef);
            const dataDB = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(dataDB);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    };

    return {
        error,
        getUsers,
        // loading,
        users
    };
};
