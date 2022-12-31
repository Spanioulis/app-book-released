import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { useUsers } from '../hooks/useUsers';
import useDarkTheme from './useDarkTheme';
import logo from '../assets/book-tree.png';
import sun from '../assets/sun-svgrepo-com.svg';
import moon from '../assets/moon-svgrepo-com.svg';
import chat from '../assets/chat.svg';

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState('');
    const { users, getUsers } = useUsers();
    // console.log('users', users);
    const [colorTheme, setTheme] = useDarkTheme();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate('/landing');
        } catch ({ code }) {
            console.log(code);
        }
    };

    // if (user !== null) {
    //     const userAuth = user.uid;
    //     console.log('userAuth', userAuth);
    //     const currentUserFind = users.find((user) => user.uid === userAuth);
    //     console.log('currentUser', currentUser.username);
    //     setCurrentUser(currentUserFind.username);
    //     console.log(currentUser);
    // }

    // Recuperar usuarios
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <nav className="navbar text-metal dark:text-gray-300 px-5 py-0 lg:px-16 dark:bg-stone-900 dark:bg-opacity-30  sticky top-0 z-50 backdrop-blur-sm gap-10">
                <div className="flex-1 my-3 gap-10">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-11 sm:h-14" alt="Logo Ed Mundo!" />
                        <span className="self-center text-base sm:text-2xl font-semibold whitespace-nowrap dark:text-gray-200 ">
                            Ed Mundo!
                        </span>
                    </Link>
                    <div className="tooltip tooltip-bottom" data-tip="Chat">
                        <Link to="/chat" className="flex items-center">
                            <img
                                src={chat}
                                className="mr-3 h-11 sm:h-14"
                                alt="Chat icon"
                                width="38"
                            />

                            {/* <span className="self-center sm:text-2xl font-semibold whitespace-nowrap text-main ">
                        </span> */}
                        </Link>
                    </div>
                    <h3 className="text-sm">Links centrales</h3>
                    <p className="text-sm">Qué es Edmundo?</p>
                </div>
                <div className="flex-none my-3 gap-2">
                    <div>
                        <Link to="/uppload" title="Liberar libro">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ml-3 hover:w-7 hover:h-7 hover:ml-2 hover:text-amber-600 text-zinc-800 dark:text-gray-400"
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
                        className="text-metal dark:text-gray-400 mx-2 lg:mx-5 dark:bg- w-9 h-9 cursor-pointer flex items-center justify-center"
                    >
                        {colorTheme === 'light' ? (
                            <div className="flex flex-col">
                                <img src={moon} />
                                <p className="text-xs md:text-sm text-gray-500">Dark</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <img src={sun} />
                                <p className="text-xs md:text-sm text-amber-600">Light</p>
                            </div>
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
                            className="gap-2 mt-3 p-5 shadow menu menu-compact dropdown-content rounded-box w-44 font-medium bg-gray-100 dark:bg-dark"
                        >
                            {user ? (
                                <>
                                    <li className="text-sm text-center dark:text-slate-400 text-stone-700">
                                        {/* {currentUser.username} */}
                                        {user.email}
                                    </li>
                                    <hr />
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="font-semibold text-metal dark:text-tahiti bg-transparent hover:text-white dark:hover:text-white hover:bg-tahiti hover:font-bold ease-in duration-500"
                                        >
                                            Perfil
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-700 font-bold hover:bg-red-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm text-center  dark:hover:bg-red-700 dark:focus:ring-red-800 hover:font-bold ease-in duration-500"
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
