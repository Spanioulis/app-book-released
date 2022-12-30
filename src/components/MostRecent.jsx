import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';
import Cards from './CardsHome';
import uuid4 from 'uuid4';
import '../styles/cards.css';
import '../styles/shelf.css';

const MostRecent = () => {
    const { books, getBooks } = useBooks();
    // console.log('books', books);
    //* Elimina los NO disponibles (hecho)
    // const sort = books.sort((a, b) => {
    //     if (a.date < b.date) return -1;
    //     else if (a.date > b.date) return 1;
    //     return 0;
    // });
    // console.log(sort);
    const available = books.filter(
        (book) => book.enable === true && book.uid !== auth.currentUser.uid
    );
    // Guardar...
    // const mostRecentBooks = available.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const mostRecentBooks = available.sort((a, b) => {
        if (a.date < b.date) return 1;
        else if (a.date > b.date) return -1;
        return 0;
    });
    const booksCover = mostRecentBooks.splice(0, 3);
    /* 
    TODO -> En landing saldrán todos los libros (enable === true), a diferencia de ahora, que no se ven los del usuario.
    */

    // * Aquí está la clave para recuperar libros y/o usuarios
    useEffect(() => {
        // console.log('getBooks Home');
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
        <div className="container-home mx-auto flex" key={uuid4()}>
            <div className="my-12">
                <p className="-rotate-90 text-base">Últimas novedades</p>
            </div>
            {booksCover.map((book, index) => {
                return (
                    <Cards
                        author={book.author}
                        district={book.district}
                        handleUpdate={() => handleUpdate(book.id)}
                        image={book.image}
                        index={index}
                        title={book.title}
                    />
                );
            })}
        </div>
    );
};

export default MostRecent;
