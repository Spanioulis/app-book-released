import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { UserContext } from '../context/UserProvider';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';

import img from '../assets/undraw_Not_found.png';
import SearchInput from '../components/SearchInput';
import CardsSearch from '../components/CardsSearch';
import SearchModal from '../components/SearchModal';
// import uuid4 from 'uuid4';
// import SearchInput from '../components/SearchInput';
import '../App.css';
import '../styles/loading.css';

// TODO-> traer aquí el SearchNavbar...

//* BREAKPOINT OK!!

const Search = () => {
    const { q } = useParams();
    const { books, getBooks } = useBooks();
    // console.log('books', books);

    // const { user } = useContext(UserContext);

    //TODO -> Enviamos la información al apretar el botón, y la guardamos (hacer el handleModal o handleInfo desde el botón de la CardSearch, que a su vez irá a la SearchModal)
    const [modalBook, setModalBook] = useState([]);
    // console.log('modalBook', modalBook);

    // TODO -> Realizar un 'loading'
    // TODO -> Filtro de búsqueda (título || autor/a)
    //* Este filtro es para mis libros que no sean míos
    // const searchList = books.filter(
    //     (book) =>
    //         (book.title.toLowerCase().includes(q.toLowerCase()) ||
    //             book.author.toLowerCase().includes(q.toLowerCase())) &&
    //         book.uid !== user.uid
    // );

    //* Este filtro es para mis TODOS los libros (check todos los libros activado)
    const searchList = books.filter(
        (book) =>
            book.title.toLowerCase().includes(q.toLowerCase()) ||
            book.author.toLowerCase().includes(q.toLowerCase())
    );

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

    const handleModal = (
        author,
        category,
        date,
        description,
        district,
        image,
        infoLink,
        pages,
        title
    ) => {
        setModalBook({
            ...modalBook,
            author,
            category,
            date,
            description,
            district,
            image,
            infoLink,
            pages,
            title
        });
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
                            <a
                                onClick={() => {
                                    console.log('Mis libros');
                                }}
                            >
                                Mis libros
                            </a>
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
                    {/* <div className="spinner"></div> */}
                    <img src={img} alt="Not found books" className="illustration mx-auto" />
                    <p>¡Lo sentimos, no hay coincidencias!</p>
                </>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-base">
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
                                        category={book.category}
                                        description={book.description}
                                        infoLink={book.infoLink}
                                        handleModal={handleModal}
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
                </>
            )}

            <SearchModal
                title={modalBook.title}
                image={modalBook.image}
                author={modalBook.author}
                district={modalBook.district}
                pages={modalBook.pages}
                date={modalBook.date}
                category={modalBook.category}
                description={modalBook.description}
                infoLink={modalBook.infoLink}
            />
        </div>
    );
};

export default Search;
