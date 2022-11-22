import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [error, setError] = useState();
    // const [loading, setLoading] = useState(false);
    const usersCollectionRef = collection(db, 'users');

    const getUsers = async () => {
        try {
            //
            const q = query(usersCollectionRef, where('uid', '==', auth.currentUser.uid));
            const data = await getDocs(q);
            const dataDB = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCurrentUser(dataDB);
            // setLoading(true);
            const allData = await getDocs(usersCollectionRef);
            const allDataDB = allData.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(allDataDB);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    };

    return {
        error,
        currentUser,
        getUsers,
        // loading,
        users
    };
};
