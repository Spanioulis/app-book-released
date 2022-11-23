import { useEffect } from 'react';
import uuid4 from 'uuid4';
import { useBooks } from '../hooks/useBooks';
import '../styles/cards.css';

const CardsHome = () => {
    const { books, getBooks } = useBooks();
    const random = books.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const booksCover = random.splice(0, 3);

    useEffect(() => {
        // console.log('geBooks Home');
        getBooks();
    }, []);

    return (
        <div className="container-home mx-auto">
            {booksCover.map((book) => {
                return (
                    <div
                        className="card card-home card-side w-96 h-64 rounded-xl shadow-[0_35px_60px_-10px_rgba(0,0,0,0.8)] bg-gray-300 dark:bg-stone-800"
                        key={uuid4()}
                    >
                        <figure>
                            <img src={book.image} alt={book.title} className="rounded-lg ml-4" />
                        </figure>
                        <div className="card-body py-10">
                            <h2 className="card-title">{book.title}</h2>
                            <p>{book.author}</p>
                            {/* <p>{book.district}</p> */}
                            <div className="card-actions justify-start">
                                <button className="btn btn-primary">Reservar</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardsHome;
