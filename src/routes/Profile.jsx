import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';
import '../styles/cards.css';

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
                    {userBooks.map((item) => (
                        <div
                            className="w-72 min-h-full bg-grey-200 rounded-lg dark:bg-zinc-800 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-sm dark:bg-opacity-10"
                            key={item.id}
                        >
                            <a href="#" className="flex justify-center px-5">
                                <img
                                    className="rounded-t-lg pl-5 mt-5"
                                    src={item.image}
                                    alt={item.title}
                                />
                            </a>

                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex flex-col">
                                    <span>{item.author}</span>
                                    <span>{item.pages} páginas</span>
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
