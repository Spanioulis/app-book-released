import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Profile = () => {
    const { front } = useContext(UserContext);
    console.log(front);
    return (
        <>
            <h1>Profile</h1>
            <h3>Este va a ser tu perfil, tu biblioteca</h3>
            <div>
                <li>
                    <ul>Biblioteca de libros disponibles</ul>
                    <ul>Favoritos</ul>
                    <ul>Otra información de relevancia...</ul>
                </li>
            </div>
        </>
    );
};

export default Profile;
