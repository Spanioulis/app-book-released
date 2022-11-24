import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import SearchInput from './SearchInput';
import useDarkTheme from './useDarkTheme';
// import { icon } from '../assets/user_icon.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    // console.log('user', user);
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
            <nav className="navbar px-5 py-0 lg:px-16 dark:bg-stone-900 dark:bg-opacity-30  dark:text-gray-300 sticky top-0 z-50 backdrop-blur-sm">
                <div className="flex-1 my-3">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-base sm:text-2xl font-semibold whitespace-nowrap dark:text-gray-200 ">
                            Ed Mundo!
                        </span>
                    </Link>
                </div>
                <div className="flex-none my-3 gap-2">
                    <SearchInput
                        text="text"
                        placeholder="Busca un libro..."
                        className="input input-ghost hover:border-sky-900 dark:focus:bg-stone-800 dark:text-gray-400 text-sm lg:text-base"
                    />
                    <div>
                        <Link to="/uppload" title="Liberar libro">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ml-3 hover:w-7 hover:h-7 hover:ml-2 hover:text-amber-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                />
                            </svg>
                        </Link>
                    </div>

                    <span
                        onClick={() => setTheme(colorTheme)}
                        className="text-gray-200 dark:text-zinc-800 mx-2 lg:mx-5 bg-gray-400 dark:bg-blue-900 w-10 h-10 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
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

                    <div className="dropdown dropdown-end mt-1">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar hover:border-slate-700"
                        >
                            <div className="w-10 rounded-full">
                                {/* Poner foto de perfil de cada usuario...(photoURL del registro...) */}
                                <img src={'https://placeimg.com/80/80/people'} />
                            </div>
                        </label>
                        {/* {user.email !== null && (
                            <p className="text-gray-400 text-sm">{user.email}</p>
                        )} */}
                        <ul
                            tabIndex={0}
                            className="gap-2 mt-3 p-5 shadow menu menu-compact dropdown-content rounded-box w-44 font-medium bg-gray-100 dark:bg-zinc-800"
                        >
                            {user ? (
                                <>
                                    <li className="text-sm text-center dark:text-slate-400 text-stone-700">
                                        {user.email}
                                    </li>
                                    <hr />
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
                                            className="text-red-700 font-bold hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm text-center  dark:hover:bg-red-700 dark:focus:ring-red-800 hover:font-bold hover:scale-110 ease-in duration-700"
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
