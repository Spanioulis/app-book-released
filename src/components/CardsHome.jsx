import { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import '../styles/cards.css';

const CardsHome = () => {
    const { books, getBooks } = useBooks();
    const random = books.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const booksCover = random.splice(0, 3);

    useEffect(() => {
        console.log('geBooks Home');
        getBooks();
    }, []);

    return (
        <div className="container-home mx-auto">
            {booksCover.map((book) => {
                return (
                    <div className="card card-home card-side shadow-xl w-96 h-64 bg-gray-300 dark:bg-stone-700">
                        <figure>
                            <img src={book.image} alt={book.title} className="rounded-lg ml-4" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{book.title}</h2>
                            <p>{book.author}</p>
                            {/* <p>{book.district}</p> */}
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
