import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Home = () => {
    const { user } = useContext(UserContext);
    console.log('User', user);
    console.log('Register List: ', JSON.parse(localStorage.getItem('Register')));

    return (
        <>
            <div
                className="hero min-h-screen rounded-lg"
                style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
            >
                <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
                            id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
