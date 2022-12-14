import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';
import image from '../assets/book-transparent.png';
import Modal from '../components/ReserveModal';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import MostRecent from '../components/MostRecent';

const Home = () => {
    const { user } = useContext(UserContext);
    /*     Si ya tenemos el error en Home, podríams hacer esto:
    const {data, error: dataError, loading} = useBooks(); */
    // TODO -> Aquí descartaremos los propios libros del usuario logeado (!== userBooks) - Eso lo diferenciará del "home"
    const { error, loading } = useBooks();

    // Solo queremos que se ejecute una vez, por eso no ponemos dependencia. Obtenemos la información del data

    if (loading) return <div className="spinner"></div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section>
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-base font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-tahiti dark:text-gray-300">
                            Busca tu libro de proximidad
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit molestiae
                            cupiditate soluta veritatis, unde vero totam molestias non aspernatur?
                            Eum!
                        </p>
                        <SearchInput
                            text="search"
                            placeholder="Busca un libro..."
                            classInput="input input-bordered w-full text-zinc-800 dark:text-gray-300  dark:placeholder-gray-400 dark:bg-zinc-700 focus:border-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 dark:focus:ring-zinc-500"
                            classButton="btn btn-square dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600"
                        />
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img
                            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                            src={image}
                            alt="mockup"
                        />
                    </div>
                </div>
            </section>
            {/* <h1 className="text-center font-extrabold mt-20 mb-8 text-2xl text-zinc-900 dark:text-gray-400">
                Libros disponibles...
            </h1> */}
            <MostRecent />
            <div className="text-center text-blue-600">
                <h4>Los más seguidos (con likes)</h4>
                <h4>Por autor...(selección aletoria de autores)</h4>
            </div>
            <Modal />
            <Footer />
        </>
    );
};

export default Home;
