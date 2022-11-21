import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';

const Home = () => {
    const { user } = useContext(UserContext);
    /*     Si ya tenemos el error en Home, podríams hacer esto:
    const {data, error: dataError, loading} = useBooks(); */
    // TODO -> Aquí descartaremos los propios libros del usuario logeado (!== userBooks) - Eso lo diferenciará del "home"
    const { books, userBooks, error, loading, getBooks } = useBooks();

    // Solo queremos que se ejecute una vez, por eso no ponemos dependencia. Obtenemos la información del data
    useEffect(() => {
        console.log('geBooks Home');
        getBooks();
    }, []);

    if (loading) return <div className="spinner"></div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1 className="text-center font-extrabold my-5">TODOS LOS LIBROS</h1>
            <div className="flex justify-around">
                {books.map((item) => (
                    <div
                        className="max-w-sm bg-grey-200 border border-gray-200 rounded-lg shadow-md dark:bg-stone-800 dark:border-stone-700"
                        key={item.id}
                    >
                        <a href="#">
                            <img className="rounded-t-lg" src={item.imgURL} alt={item.title} />
                        </a>

                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                SINOPSIS...
                                <span>
                                    {item.authors} - {item.pages} páginas
                                </span>
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                SOLCITIAR (COMPONENTE BOTÓN)
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>

                            <img />
                        </div>
                    </div>
                ))}
            </div>

            {/* <hr />
            <h1>Todos los libros</h1>
            {allData.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.authors}</p>
                    <p>{item.pages}</p>
                    <img src={item.imgURL} alt={item.title} />
                </div>
            ))} */}
            {/* <div
                className="hero min-h-screen rounded-lg"
                style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
            >
                <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
                            id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Home;
