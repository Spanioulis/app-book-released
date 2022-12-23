import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { UserContext } from '../context/UserProvider';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';
import uuid4 from 'uuid4';
import Modal from '../components/SearchModal';
import img from '../assets/undraw_Not_found.png';
import '../App.css';
import SearchInput from '../components/SearchInput';
import CardsSearch from '../components/CardsSearch';
import '../styles/loading.css';
// import uuid4 from 'uuid4';
// import SearchInput from '../components/SearchInput';

// TODO-> traer aquí el SearchNavbar...

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
        // console.log('useEffect');
        getBooks();
    }, []);

    // Reservar Libro -> Activar de nuevo en el Modal, solo cuando no esté en Mis libros
    const handleUpdate = async (id) => {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, {
            enable: false
        });
        await getBooks();
    };

    return (
        <div className="text-center">
            <div className="flex justify-between px-10 gap-10 my-10">
                <div className="dropdown dropdown-right text-sm">
                    <label tabIndex={0} className="btn m-1">
                        Galería
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Mis libros</a>
                        </li>
                        <li>
                            <a>Resto de usuarios</a>
                        </li>
                    </ul>
                </div>
                <p className="text-tahiti flex-none ">
                    Búsqueda actual:{' '}
                    <span className="text-stone-900  dark:text-gray-400 italic">{q}</span>
                </p>
                <SearchInput
                    text="search"
                    placeholder="Busca un libro..."
                    classInput="input input-bordered dark:bg-zinc-700"
                    classButton="btn btn-square dark:bg-zinc-800 hover:bg-zinc-900"
                />
            </div>

            {searchList.length === 0 ? (
                <>
                    {/* TODO -> Poner todas las búsuqedas cuando cambiemos la ficha a un listado... */}
                    <div className="spinner"></div>
                    {/* <img src={img} alt="Not found books" className="illustration mx-auto" />
                    <p>¡Lo sentimos, no hay coincidencias!</p> */}
                </>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Páginas</th>
                                    <th>Fecha</th>
                                    <th>Distrito</th>
                                    <th>Información</th>
                                </tr>
                            </thead>
                            {searchList.map((book, index) => (
                                <>
                                    <CardsSearch
                                        author={book.author}
                                        date={book.date}
                                        district={book.district}
                                        image={book.image}
                                        index={index}
                                        pages={book.pages}
                                        title={book.title}
                                    />
                                    <Modal
                                        author={book.author}
                                        date={book.date}
                                        district={book.district}
                                        image={book.image}
                                        index={index}
                                        pages={book.pages}
                                        title={book.title}
                                    />
                                </>
                            ))}
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Páginas</th>
                                    <th>Fecha</th>
                                    <th>Distrito</th>
                                    <th>Información</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    {/* {searchList.map((book) => (
                        <div
                            key={uuid4()}
                            className="max-w-4xl mx-5 lg:mx-auto mb-5 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)] rounded-xl"
                        >
                            <div className="relative m-0 shadow-lg flex rounded-3xl">
                                <div className="flex-no-shrink min-w-fit">
                                    <img
                                        alt={book.image}
                                        className="min-w-48 h-64 block mx-auto rounded-l-lg"
                                        src={book.image}
                                    />
                                </div>
                                <div
                                    className={
                                        book.enable
                                            ? 'card-block relative text-slate-900 dark:text-zinc-400 dark:bg-zinc-800 rounded-r-xl h-auto'
                                            : 'card-block relative text-slate-900 dark:text-zinc-400 dark:bg-zinc-800 rounded-r-xl h-auto opacity-40'
                                    }
                                >
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
                                                    Reservado
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
                    ))} */}
                </>
            )}
        </div>
    );
};

export default Search;
