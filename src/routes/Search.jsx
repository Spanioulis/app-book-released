import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import uuid4 from 'uuid4';
import SearchInput from '../components/SearchInput';

const Search = () => {
    const { q } = useParams();
    const { books, getBooks } = useBooks();
    console.log('books', books);

    const searchList = books.filter(
        (book) =>
            book.title.toLowerCase().includes(q.toLowerCase()) ||
            book.author.toLowerCase().includes(q.toLowerCase())
    );

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl my-5">Search</h1>
                <div className="flex px-10 gap-10 my-5">
                    <p className="text-slate-600"> Add filtros (distrito/categoría)</p>
                    <p className="text-yellow-500">
                        Búsqueda actual:{' '}
                        <span className="text-stone-900 dark:text-gray-400">{q}</span>
                    </p>
                </div>
                {/* AQUÍ */}

                <h1 className="text-3xl text-red-900 mb-5">Listado de libros</h1>

                {searchList.length === 0 ? (
                    <p>Lo siento, no hay coincidencias...</p>
                ) : (
                    <>
                        {searchList.map((book) => (
                            <div className="max-w-4xl mx-auto text-slate-900 mb-5 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.7)] rounded-xl backdrop-blur-sm dark:bg-opacity-10">
                                <div className="relative m-0 shadow-lg flex rounded-3xl">
                                    <div className="flex-no-shrink min-w-fit">
                                        <img
                                            alt={book.image}
                                            className="min-w-48 h-64 block mx-auto rounded-l-lg"
                                            src={book.image}
                                        />
                                    </div>
                                    <div className="card-block relative text-slate-900 dark:text-zinc-400 dark:bg-zinc-800 rounded-r-xl h-auto">
                                        <div className="p-6 w-auto h-full">
                                            <h4 className="font-medium text-2xl mb-3">
                                                {book.title}
                                            </h4>
                                            <p className="leading-normal max-h-20 text-ellipsis overflow-hidden text-sm">
                                                {book.description}
                                            </p>
                                            <p className="text-sm text-grey block mt-6">
                                                Autor: {book.author} - Páginas: {book.pages}
                                            </p>
                                            <p className="text-sm text-orange-900 dark:text-yellow-400 block mt-2">
                                                Distrito: <i>{book.district}</i>
                                            </p>
                                            <a
                                                className="-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r"
                                                href="#"
                                            >
                                                <i className="text-xl fa fa-plus" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};
{
    /* <div className="container-home mx-auto flex-wrap">
    {searchList.map((book) => {
        return (
            <div
                className="card card-home card-side shadow-xl w-96 h-64 bg-gray-300 dark:bg-stone-700"
                key={uuid4()}
            >
                <figure>
                    <img
                        src={book.image}
                        alt={book.title}
                        className="rounded-lg ml-4"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{book.title}</h2>
                    <p>{book.author}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-success mr-8">
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        );
    })}
</div> */
}

export default Search;
