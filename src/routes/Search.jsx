import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { UserContext } from '../context/UserProvider';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import uuid4 from 'uuid4';
import Modal from '../components/ReserveModal';
import img from '../assets/undraw_Not_found.png';
import '../App.css';
// import uuid4 from 'uuid4';
// import SearchInput from '../components/SearchInput';

//* BREAKPOINT OK!!

const Search = () => {
    const { q } = useParams();
    const { books, getBooks } = useBooks();
    const { user } = useContext(UserContext);
    // console.log('user', user.uid);

    // TODO -> Realizar un 'loading'
    // Filtro de búsqueda (título || autor/a)
    const searchList = books.filter(
        (book) =>
            (book.title.toLowerCase().includes(q.toLowerCase()) ||
                book.author.toLowerCase().includes(q.toLowerCase())) &&
            book.uid !== user.uid
    );
    // console.log('searchList', searchList);

    useEffect(() => {
        console.log('useEffect');
        getBooks();
    }, []);

    const handleUpdate = async (id) => {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, {
            enable: false
        });
        await getBooks();
    };

    return (
        <div className="text-center">
            <h1 className="text-3xl my-5"># Búsqueda #</h1>
            <div className="flex px-10 gap-10 my-5">
                <p className="text-slate-600"> Add filtros (distrito/categoría)</p>
                <p className="text-yellow-500">
                    Búsqueda actual:{' '}
                    <span className="text-stone-900 dark:text-gray-400 italic">{q}</span>
                </p>
            </div>

            <Modal />

            {searchList.length === 0 ? (
                <>
                    <img src={img} alt="Not found books" className="illustration mx-auto" />
                    <p>¡Lo sentimos, no hay coincidencias!</p>
                </>
            ) : (
                <>
                    {searchList.map((book) => (
                        <div
                            key={uuid4()}
                            className={
                                book.enable
                                    ? 'max-w-4xl mx-5 lg:mx-auto text-slate-900 mb-5 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)] rounded-xl backdrop-blur-2xl dark:bg-opacity-10'
                                    : 'max-w-4xl mx-5 lg:mx-auto text-slate-900 mb-5 rounded-xl blur-sm'
                            }
                        >
                            <div className="relative m-0 shadow-lg flex rounded-3xl">
                                <div className="flex-no-shrink min-w-fit">
                                    <img
                                        alt={book.image}
                                        className="min-w-48 h-64 block mx-auto rounded-l-lg"
                                        src={book.image}
                                    />
                                </div>
                                <div className="card-block relative text-slate-900 dark:text-zinc-400 dark:bg-zinc-800 rounded-r-xl h-auto">
                                    <div className="p-6 w-auto h-full">
                                        <h4 className="font-medium text-2xl mb-3">{book.title}</h4>
                                        <p className="leading-normal max-h-20 text-ellipsis overflow-hidden text-sm">
                                            {book.description}
                                        </p>
                                        <p className="text-sm text-grey block mt-6">
                                            Autor: {book.author} - Páginas: {book.pages}
                                        </p>

                                        <div className="flex justify-center align-middle gap-5 mt-3">
                                            <p className="text-sm text-orange-900 dark:text-yellow-400 my-auto">
                                                Distrito: <i>{book.district}</i>
                                            </p>
                                            {book.enable ? (
                                                <label
                                                    htmlFor="my-modal-6"
                                                    className="font-bold text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                                    onClick={() => handleUpdate(book.id)}
                                                >
                                                    Reservar
                                                </label>
                                            ) : (
                                                <button
                                                    className="font-bold text-red-700 dark:text-red-700"
                                                    disabled
                                                >
                                                    Reservar
                                                </button>
                                            )}

                                            <a
                                                href={book.infoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-sm my-auto text-emerald-700"
                                            >
                                                Link Info
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Search;
