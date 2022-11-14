import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Home = () => {
    const { user } = useContext(UserContext);
    console.log('User', user);
    console.log('Current district: ', user.distrito);
    console.log('User home', user);

    return (
        <>
            <h1 className="text-3xl font-bold underline bg-blue-700">Home</h1>
        </>
    );
};

export default Home;
