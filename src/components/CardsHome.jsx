import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/cards.css';
import uuid4 from 'uuid4';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';

const CardsHome = () => {
    const { books, getBooks } = useBooks();
    // console.log('books', books);
    //* Elimina los NO disponibles (hecho)
    const available = books.filter(
        (book) => book.enable === true && book.uid !== auth.currentUser.uid
    );
    const random = available.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const booksCover = random.splice(0, 2);
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
            {booksCover.map((book) => {
                return (
                    <div
                        className="card card-home card-side w-80 h-56 rounded-xl shadow-[0_35px_60px_-10px_rgba(0,0,0,0.4)] bg-gray-200 dark:bg-stone-800"
                        key={uuid4()}
                    >
                        <figure className="ml-4 w-1/3">
                            <img src={book.image} alt={book.title} className="rounded-md w-full" />
                        </figure>
                        <div className="card-body w-2/3 px-5 overflow-hidden align-baseline">
                            <div>
                                <h4 className="card-title text-base overflow-hidden">
                                    {book.title}
                                </h4>
                                <p className="text-sm ">{book.author}</p>
                                <p className="text-sm">Distrito: {book.district}</p>
                                {/* <p>{book.district}</p> */}
                            </div>
                            {/* <div className="card-actions justify-start"> */}
                            <label
                                htmlFor="my-modal-6"
                                className="btn btn-ghost hover:btn-primary text-blue-700 dark:text-blue-600 dark:hover:text-gray-200"
                                onClick={() => handleUpdate(book.id)}
                            >
                                Reservar
                            </label>
                            {/* </div> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardsHome;
