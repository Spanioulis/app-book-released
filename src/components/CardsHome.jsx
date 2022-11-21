import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/cards.css';

const CardsHome = () => {
    const { books, getBooks } = useBooks();

    useEffect(() => {
        console.log('geBooks Home');
        getBooks();
    }, []);

    return (
        <div className="container-home mx-auto">
            {books.map((book) => {
                return (
                    <div className="card card-side shadow-xl w-96 h-64 bg-gray-300 dark:bg-stone-700">
                        <figure>
                            <img src={book.imgURL} alt={book.title} className="rounded-lg ml-4" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{book.title}</h2>
                            <p>{book.authors}</p>
                            <p>{book.district}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-success mr-8">Reservar</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardsHome;
