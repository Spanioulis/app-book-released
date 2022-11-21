import { useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useBooks } from '../hooks/useBooks';
import { useUsers } from '../hooks/useUsers';
import '../styles/loading.css';

const Profile = () => {
    const { error, getBooks, loading, userBooks } = useBooks();
    // Aquí ya no hacen falta los 'users', era una prueba
    // Pero sí irá el currentUser o similar
    const { users, getUsers } = useUsers();
    console.log('users', users);
    console.log('auth', auth.currentUser.uid);

    useEffect(() => {
        console.log('getBooks & getUsers -> Profile');
        getBooks();
        getUsers();
    }, []);

    if (loading) return <div className="spinner"></div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1 className="text-center text-stone-800 dark:text-amber-800 font-bold my-5">
                Biblioteca
            </h1>
            {/* <h1>Profile</h1>

            <h3>Este va a ser tu perfil, tu biblioteca</h3>
            <div>
                <li>
                    <ul>Biblioteca de libros disponibles</ul>
                    <ul>Favoritos</ul>
                    <ul>Otra información de relevancia...</ul>
                </li>
            </div> */}

            {userBooks.length === 0 ? (
                <p>No tiene imágenes...AÑADIR IMAGEN</p>
            ) : (
                <div className="flex justify-around gap-10">
                    {userBooks.map((item) => (
                        <div
                            className="max-w-sm bg-grey-200 border border-gray-200 rounded-lg shadow-md dark:bg-stone-800 dark:border-stone-700"
                            key={item.id}
                        >
                            <a href="#" className="flex justify-center px-5">
                                <img
                                    className="rounded-t-lg pl-5 mt-5"
                                    src={item.imgURL}
                                    alt={item.title}
                                />
                            </a>

                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    SINOPSIS...
                                    <span>
                                        {item.authors} - {item.pages} páginas
                                    </span>
                                </p>

                                <img />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Profile;
