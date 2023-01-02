import { useContext, useEffect, useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';
import Cards from './CardsHome';
import uuid4 from 'uuid4';
import '../styles/cards.css';
import '../styles/shelf.css';

const ShowBooks = ({ children, info }) => {
    const [showList, setShowList] = useState([]);
    // console.log('showList', showList);
    const { books, getBooks } = useBooks();

    //* Elimina los NO disponibles (hecho)
    // const sort = books.sort((a, b) => {
    //     if (a.date < b.date) return -1;
    //     else if (a.date > b.date) return 1;
    //     return 0;
    // });

    // Guardar...
    // const mostRecentBooks = available.sort(() => (Math.random() > 0.5 ? 1 : -1));
    /* 
    TODO -> En landing saldrán todos los libros (enable === true), a diferencia de ahora, que no se ven los del usuario.
    */

    // * Aquí está la clave para recuperar libros y/o usuarios
    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        // Llevar todo esto a utils, a un archivo .js (enviando la info y books)
        if (info === 'mostReleased') {
            const available = books.filter(
                (book) => book.available === true && book.uid !== auth.currentUser.uid
            );
            // console.log('available', available);
            const mostRecentBooks = available.sort((a, b) => {
                if (a.date < b.date) return 1;
                else if (a.date > b.date) return -1;
                return 0;
            });
            const booksCover = mostRecentBooks.splice(0, 3);
            setShowList(booksCover);
        } else if (info === 'author') {
            // TODO -> hacer un random de autores (hacer un array random de autores)
            //! Copiar el código de la parte inferior, añadiendo más autores al listado
            const listAuthors = ['Stephen King', 'Noah Gordon'];
            const author = books.filter(
                (book) => book.available === true && book.author === 'Stephen King'
            );
            setShowList(author);
        } else if (info === 'district') {
            // TODO -> hacer un random de autores (hacer un array random de autores)
            const districts = ['Ciutat Vella', 'Eixample', 'Gràcia'];
            const randomIndex = Math.floor(Math.random() * districts.length);
            const district = districts[randomIndex];
            // console.log('district', district);
            const author = books.filter(
                // (book) => book.available === true && book.district === district
                (book) => book.available === true && book.district === 'Ciutat Vella'
            );
            const booksCover = author.splice(0, 3);
            setShowList(booksCover);
        }
    }, [books]);

    //! Actualmente no se está usando (llevarlo a la parte del chat, cuando se haga la confirmación de reserva)
    // const handleSubmit = async (id) => {
    //     const bookRef = doc(db, 'books', id);
    //     await updateDoc(bookRef, {
    //         enable: false
    //     });
    //     await getBooks();
    // };

    return (
        <div className="container-home mx-auto flex" key={uuid4()}>
            <div className="my-auto w-10">
                <p className="-rotate-90 text-base">{children}</p>
            </div>
            {showList.map((book, index) => {
                return (
                    <Cards
                        author={book.author}
                        district={book.district}
                        // handleSubmit={() => handleSubmit(book.id)}
                        image={book.image}
                        index={index}
                        title={book.title}
                        uidBook={book.uid}
                        currentUser={auth.currentUser.uid}
                    />
                );
            })}
        </div>
    );
};

export default ShowBooks;
