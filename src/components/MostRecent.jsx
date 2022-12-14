import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/cards.css';
import uuid4 from 'uuid4';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';
import CardsHome from './CardsHome';

const MostRecent = () => {
    const { books, getBooks } = useBooks();
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

    useEffect(() => {
        // console.log('geBooks Home');
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
        <div className="container-home mx-auto flex">
            <i className="rotate-90 my-10">Últimas novedades</i>
            {booksCover.map((book) => {
                return (
                    <CardsHome
                        author={book.author}
                        district={book.district}
                        handleUpdate={() => handleUpdate(book.id)}
                        image={book.image}
                        key={uuid4()}
                        title={book.title}
                    />
                );
            })}
        </div>
    );
};

export default MostRecent;
