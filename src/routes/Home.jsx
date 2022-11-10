import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Home = () => {
    const { user } = useContext(UserContext);
    console.log('user home', user);

    return (
        <>
            <h1 className="text-3xl font-bold underline">Home</h1>
        </>
    );
};

export default Home;
