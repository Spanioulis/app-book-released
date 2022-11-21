import { useContext } from 'react';
import CardsHome from '../components/CardsHome';
import { UserContext } from '../context/UserProvider';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';

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
            <h1 className="">HERO</h1>
            <div className="flex flex-col my-10">
                <h1 className="text-center font-extrabold my-5">TODOS LOS LIBROS</h1>
                <CardsHome />
            </div>
        </>
    );
};

export default Home;
