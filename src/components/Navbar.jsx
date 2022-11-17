import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import useDarkTheme from './useDarkTheme';
// import { icon } from '../assets/user_icon.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const [colorTheme, setTheme] = useDarkTheme();

    const handleLogout = async () => {
        try {
            await signOutUser();
        } catch ({ code }) {
            console.log(code);
        }
    };

    return (
        <>
            <nav className="navbar px-16 mb-5 dark:bg-gray-800 dark:bg-opacity-30  dark:text-gray-300 sticky top-0 z-50 backdrop-blur-sm">
                <div className="flex-1 my-5">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ">
                            Ed Mundo!
                        </span>
                    </Link>
                </div>
                <div className="flex-none my-5 gap-2">
                    <div className="form-control">
                        {/* Añadir onChange para realizar la búsqueda... */}
                        <input
                            type="text"
                            placeholder="Busca un libro..."
                            className="input input-bordered hover:border-cyan-600"
                        />
                    </div>

                    <span
                        onClick={() => setTheme(colorTheme)}
                        className="text-gray-200 dark:text-blue-400 mx-5 bg-gray-400 dark:bg-blue-900 w-10 h-10 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
                    >
                        {colorTheme === 'light' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                />
                            </svg>
                        )}
                    </span>

                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar hover:border-slate-700"
                        >
                            <div className="w-10 rounded-full">
                                {/* Poner foto de perfil de cada usuario...(photoURL del registro...) */}
                                <img src={'https://placeimg.com/80/80/people'} />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="gap-2 mt-3 p-5 shadow menu menu-compact dropdown-content rounded-box w-44 font-medium bg-gray-100 dark:bg-gray-700"
                        >
                            {user ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="font-semibold hover:font-bold ease-in duration-500 hover:scale-110"
                                        >
                                            Perfil
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-800 font-bold hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:font-bold hover:scale-110 ease-in duration-700"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'font-semibold text-lime-600/100 hover:font-bold ease-in duration-500 hover:scale-110'
                                                    : 'hover:font-bold ease-in duration-500 hover:scale-110'
                                            }
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'font-semibold text-blue-600/100 ease-in duration-500 hover:scale-110'
                                                    : 'hover:font-bold hover:scale-110 ease-in duration-500'
                                            }
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
