import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';
import '../styles/cards.css';
import { db } from '../firebase/firebaseConfig';
import { collection, deleteDoc, doc } from 'firebase/firestore/lite';

// TODO -> Idea para la biblioteca o para la búsqueda:
// https://codepen.io/Snowing/pen/JZRxOK

const Profile = () => {
    const { error, getBooks, loading, userBooks } = useBooks();
    // console.log('userBooks', userBooks);

    useEffect(() => {
        console.log('getBooks & getUsers -> Profile');
        getBooks();
    }, []);

    if (loading) return <div className="spinner"></div>;
    if (error) return <p>{error}</p>;

    const handleDelete = async (id) => {
        const bookRef = doc(db, 'books', id);
        await deleteDoc(bookRef);
        //TODO -> Substituir por 'onSnapshot'
        await getBooks();
    };

    return (
        <>
            <h1 className="text-center text-3xl text-stone-800 dark:text-amber-700 font-bold my-5">
                # Mi biblioteca #
            </h1>

            <div>
                <ul>
                    <li>Favoritos</li>
                    <li>Otra información de relevancia...</li>
                </ul>
            </div>

            {userBooks.length === 0 ? (
                <p>No tiene imágenes...AÑADIR IMAGEN</p>
            ) : (
                <div className="flex justify-around gap-10 flex-wrap mt-5 mx-5">
                    {userBooks.map((book) => (
                        <div
                            className="w-72 min-h-full bg-grey-200 rounded-lg dark:bg-zinc-800 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-sm dark:bg-opacity-10 flex flex-col justify-around"
                            key={book.id}
                        >
                            <div className="flex justify-between">
                                <img
                                    className="rounded-t-lg pl-5 mt-5"
                                    src={book.image}
                                    alt={book.title}
                                />
                                {book.enable ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mx-5 mt-5 hover:text-red-700 hover:cursor-pointer"
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <p className="text-lg text-green-500 mt-4 mr-4">Reservado</p>
                                )}
                            </div>

                            <div className="p-5 h-fu">
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {book.title}
                                    </h5>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex flex-col">
                                    <span>{book.author}</span>
                                    <span>{book.pages} páginas</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Profile;
