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
import sort from '../assets/sort.svg';
import '../App.css';
import '../styles/loading.css';

const Search = () => {
    const { q } = useParams();

    const { books, getBooks } = useBooks();
    const [booksList, setBookList] = useState([]);
    // console.log('booksList', booksList);
    const [modalBook, setModalBook] = useState([]);
    const [showAllBooks, setShowAllBooks] = useState(true);
    // console.log('showAllBooks', showAllBooks);
    const [filter, setFilter] = useState('');

    // TODO -> Realizar un 'loading'
    // TODO -> Filtro de búsqueda (título || autor/a)
    //* Este filtro es para mis libros que no sean míos
    // const searchList = books.filter(
    //     (book) =>
    //         (book.title.toLowerCase().includes(q.toLowerCase()) ||
    //             book.author.toLowerCase().includes(q.toLowerCase())) &&
    //         book.uid !== user.uid
    // );

    useEffect(() => {
        // console.log('useEffect');
        getBooks();
    }, []);

    useEffect(() => {
        if (showAllBooks) {
            if (q !== undefined) {
                //* Este filtro es para mis TODOS los libros (check todos los libros activado)
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
        // console.log(e.target.value);
        e.target.value === 'my-books' ? setShowAllBooks(false) : setShowAllBooks(true);
    };

    const handleSort = (e) => {
        console.log('handleSort');
        console.log(e.target.value);
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
                        <p className="text-center">¡Lo sentimos, no hay coincidencias!</p>
                    </>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-base">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Título</p>
                                                <button
                                                    value="title"
                                                    className="cursor-pointer"
                                                    onClick={handleSort}
                                                >
                                                    <img src={sort} alt="sort-icon" />
                                                </button>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Autor</p>
                                                <img src={sort} alt="sort-icon" className="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Páginas</p>
                                                <img src={sort} alt="sort-icon" className="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Fecha</p>
                                                <img src={sort} alt="sort-icon" className="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Distrito</p>
                                                <img src={sort} alt="sort-icon" className="" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="flex gap-1">
                                                <p className="pt-1">Información</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
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
