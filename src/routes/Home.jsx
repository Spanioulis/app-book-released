import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CardsHome from '../components/CardsHome';
import { UserContext } from '../context/UserProvider';
import { useBooks } from '../hooks/useBooks';
import '../styles/loading.css';
import image from '../assets/leather-bound-book-open-on-table.jpg';
import Modal from '../components/ReserveModal';

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
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${image})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Bienvenido a Ed Mundo!</h1>
                        <p className="mb-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
                            soluta hic! Nam minus consequatur ex, non veritatis sunt ad perspiciatis
                            dicta magnam eos unde eius distinctio qui dignissimos illum voluptates
                            voluptatum incidunt tempore libero, provident veniam exercitationem
                            dolores laudantium. Vitae.
                        </p>
                        <Link to="/uppload" style={{ color: 'goldenrod' }} className="btn glass">
                            Liberar LIBRO
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col my-10">
                <h1 className="text-center font-extrabold my-5">TODOS LOS LIBROS</h1>
                <CardsHome />
                <Modal />
            </div>
        </div>
    );
};

export default Home;
