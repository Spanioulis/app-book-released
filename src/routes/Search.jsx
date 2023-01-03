import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';

import SearchInput from '../components/SearchInput';
import CardsSearch from '../components/CardsSearch';
import SearchModal from '../components/SearchModal';
// import uuid4 from 'uuid4';
// import SearchInput from '../components/SearchInput';
import img from '../assets/undraw_Not_found.png';
import '../App.css';
import '../styles/loading.css';
import Table from '../components/Table';

const Search = () => {
    const { q } = useParams();
    const { books, getBooks } = useBooks();

    const [booksList, setBookList] = useState([]);
    const [modalBook, setModalBook] = useState([]);
    const [showAllBooks, setShowAllBooks] = useState(true);
    const [ascendSort, setAscendSort] = useState(true);
    const [filter, setFilter] = useState('');

    // TODO -> Realizar un 'loading'
    //* Este filtro es para mis libros que no sean míos

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if (showAllBooks) {
            if (q !== undefined) {
                // Este filtro es para mis TODOS los libros (check todos los libros activado)
                const searchList = books.filter(
                    (book) =>
                        (book.title.toLowerCase().includes(q.toLowerCase()) ||
                            book.author.toLowerCase().includes(q.toLowerCase())) &&
                        book.uid !== auth.currentUser.uid
                );
                setBookList(searchList);
            } else {
                const searchList = books.filter((book) => book.uid !== auth.currentUser.uid);
                setBookList(searchList);
            }
        } else {
            if (q !== undefined) {
                //* Este filtro es para mis TODOS los libros (check todos los libros activado)
                const searchList = books.filter(
                    (book) =>
                        (book.title.toLowerCase().includes(q.toLowerCase()) ||
                            book.author.toLowerCase().includes(q.toLowerCase())) &&
                        book.uid === auth.currentUser.uid
                );
                setBookList(searchList);
            } else {
                const searchList = books.filter((book) => book.uid === auth.currentUser.uid);
                setBookList(searchList);
            }
        }
    }, [q, books, showAllBooks]);

    // Reservar Libro -> Activar de nuevo en el Modal, solo cuando no esté en Mis libros
    // const handleUpdate = async (id) => {
    //     const bookRef = doc(db, 'books', id);
    //     await updateDoc(bookRef, {
    //         enable: false
    //     });
    //     await getBooks();
    // };

    const handleClick = (e) => {
        e.target.value === 'my-books' ? setShowAllBooks(false) : setShowAllBooks(true);
    };

    const handleSort = (e) => {
        const item = e.target.value;
        setAscendSort(!ascendSort);

        if (ascendSort) {
            const searchList = [...booksList].sort((a, b) => (a[item] < b[item] ? 1 : -1));
            setBookList(searchList);
        } else {
            const searchList = [...booksList].sort((a, b) => (a[item] > b[item] ? 1 : -1));
            setBookList(searchList);
        }
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
        <div className="flex flex-col">
            <div className="flex justify-between my-10">
                {/* TODO -> Pasarlo a un componente cuando pongamos los filtros (SearchBar, por ejemplo) */}
                <div className="dropdown dropdown-right text-sm">
                    <label tabIndex={0} className="btn m-1">
                        Mostrar
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 "
                    >
                        <li>
                            <button
                                value="my-books"
                                onClick={handleClick}
                                className="active:text-main focus:text-main"
                            >
                                Mis libros
                            </button>
                        </li>
                        <li>
                            <button
                                value="all-books"
                                onClick={handleClick}
                                className="active:text-main focus:text-main"
                            >
                                Todos
                            </button>
                        </li>
                    </ul>
                </div>
                <SearchInput
                    text="search"
                    placeholder="Busca un libro..."
                    classInput="input input-bordered dark:bg-zinc-700 w-96 h-14 text-xl"
                    classButton="btn btn-square dark:bg-zinc-800 hover:bg-zinc-900 h-14"
                />
                <div className="text-xl">
                    {/* Búsqueda actual:{' '} */}
                    <span className="text-main dark:text-tahiti italic">{q}</span>
                    <p>Encontrado/s {booksList.length} libro/s</p>
                </div>
            </div>
            {/* Pasar todo esto a un componente filter o similar */}

            {/*  */}
            <div>
                {booksList.length === 0 ? (
                    <>
                        {/* TODO -> Poner todas las búsuqedas cuando cambiemos la ficha a un listado... */}
                        {/* <div className="spinner"></div> */}
                        <img src={img} alt="Not found books" className="illustration mx-auto" />
                        {/* <p className="text-center">¡Lo sentimos, no hay coincidencias!</p> */}
                    </>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-base">
                                <Table handleSort={handleSort} />
                                {booksList.map((book, index) => (
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
            </div>
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
