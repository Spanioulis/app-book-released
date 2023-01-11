import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

import useDarkTheme from './useDarkTheme';

import logo from '../assets/keyhole-logo.png';
import IconSVG from './IconsSVG';

const Navbar = () => {
   const { user, signOutUser } = useContext(UserContext);

   const [currentUser, setCurrentUser] = useState('');
   const [colorTheme, setTheme] = useDarkTheme();

   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         await signOutUser();
         navigate('/');
      } catch ({ code }) {
         console.log(code);
      }
   };

   useEffect(() => {
      if (user) {
         let index = user.email.indexOf('@');
         const username = user.email.substring(0, index);
         const usernameUppercase = username.charAt(0).toUpperCase() + username.slice(1);
         setCurrentUser(usernameUppercase);
      }
   }, [user]);

   return (
      <nav className="navbar text-metal dark:text-gray-300 py-5 px-0 dark:bg-stone-900 dark:bg-opacity-30 sticky top-0 z-50 backdrop-blur-sm">
         {/* START */}
         <div className="navbar-start flex-1 order-1 sm:order-2 justify-center gap-2 md:gap-4 text-base ml-3 lg:ml-10">
            <div className="dropdown">
               <label tabIndex={0} className="btn btn-ghost md:hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
               </label>
               <ul
                  tabIndex={0}
                  className="gap-2 mt-3 px-3 py-3 shadow menu menu-compact dropdown-content rounded-box w-44 bg-gray-100 dark:bg-metal dark:text-gray-300 text-metal "
               >
                  <li>
                     <a href="#" rel="noopener noreferrer" className="text-sm lg:text-base dark:hover:text-white">
                        Inicio
                     </a>
                  </li>
                  <li>
                     <Link to="/edmundo" className="text-sm lg:text-base dark:hover:text-white">
                        ¿Ed Mundo?
                     </Link>
                  </li>
                  <li>
                     <a
                        href="#catalogo"
                        rel="noopener noreferrer"
                        className="text-sm lg:text-base dark:hover:text-white"
                     >
                        Catálogos
                     </a>
                  </li>
               </ul>
            </div>
            <div className="flex-1 order-2 sm:order-1">
               {user ? (
                  <Link to="/home" className="flex items-center">
                     <img src={logo} className="twist-logo mr-2 md:mr-3 h-9 lg:h-12" alt="Logo Ed Mundo!" />
                     <span className="lg:text-2xl hidden sm:block font-semibold whitespace-nowrap dark:text-gray-200 ">
                        Ed Mundo!
                     </span>
                  </Link>
               ) : (
                  <Link to="/" className="flex items-center">
                     <img src={logo} className="twist-logo mr-2 md:mr-3 h-9 lg:h-12" alt="Logo Ed Mundo!" />
                     <span className="lg:text-2xl hidden sm:block font-semibold whitespace-nowrap dark:text-gray-200 ">
                        Ed Mundo!
                     </span>
                  </Link>
               )}
            </div>
         </div>
         {/* CENTER */}
         <div className="navbar-center hidden md:flex flex-1 ml-3 lg:ml-10 order-1 sm:order-2 justify-center gap-2 md:gap-4 text-base">
            <ul className="menu menu-horizontal px-1">
               <li>
                  <a href="#" rel="noopener noreferrer" className="text-sm">
                     Inicio
                  </a>
               </li>
               <li>
                  <Link to="/edmundo" className="text-xs lg:text-sm">
                     ¿Ed Mundo?
                  </Link>
               </li>
               <li>
                  <a href="#catalogo" rel="noopener noreferrer" className="text-xs lg:text-sm">
                     Catálogos
                  </a>
               </li>
            </ul>
         </div>
         {/* END */}
         <div className="navbar-end flex-1 mr-3 lg:mr-10 justify-end order-3">
            <div className="tooltip tooltip-bottom" data-tip="Search">
               <Link to="/search">
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-2 hover:text-main hover:dark:text-tahiti"
                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
               </Link>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Upload">
               <Link to="/upload">
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-3 hover:text-main hover:dark:text-tahiti"
                     d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
               </Link>
            </div>

            <span onClick={() => setTheme(colorTheme)} className="cursor-pointer">
               {colorTheme === 'light' ? (
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-3 dark:hover:text-blue-900 "
                     d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
               ) : (
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-3 hover:text-yellow-400"
                     d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
               )}
            </span>

            {/* TODO Cambiar todo el tamaño de letra */}
            <div className="dropdown dropdown-end mt-1 ml-1 lg:ml-3">
               <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:border-slate-700">
                  <div className="w-8 lg:w-10 rounded-full">
                     {user ? (
                        <img src={'https://placeimg.com/80/80/people'} />
                     ) : (
                        <IconSVG
                           className="w-7 lg:w-8 h-7 lg:h-8 mx-auto lg:mt-1"
                           d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                     )}
                     {/* Poner foto de perfil de cada usuario...(photoURL del registro...) */}
                  </div>
               </label>
               {/* {user.email !== null && (
                            <p className="text-gray-400 text-sm">{user.email}</p>
                        )} */}
               <ul
                  tabIndex={0}
                  className="gap-2 mt-3 px-5 py-3 shadow menu menu-compact dropdown-content rounded-box w-44 bg-gray-100 dark:bg-metal "
               >
                  {user ? (
                     <>
                        <li className="text-sm lg:text-base text-center">{currentUser}</li>
                        <li className="text-xs lg:text-sm text-center dark:text-slate-400 text-stone-700">
                           {/* {currentUser.username} */}
                           {user.email}
                        </li>
                        <li>
                           <Link
                              to="/profile"
                              className="rounded-xl text-sm lg:text-base font-semibold text-metal dark:text-tahiti bg-transparent hover:text-white dark:hover:text-white hover:bg-tahiti hover:font-bold ease-in duration-500"
                           >
                              <IconSVG
                                 className="w-5 lg:w-6 h-5 lg:h-6"
                                 d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                              Perfil
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/chat"
                              className="rounded-xl text-sm lg:text-base font-semibold text-metal dark:text-tahiti bg-transparent hover:text-white dark:hover:text-white hover:bg-tahiti hover:font-bold ease-in duration-500"
                           >
                              <IconSVG
                                 className="w-5 lg:w-6 h-5 lg:h-6"
                                 d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                              />
                              Mensajes
                           </Link>
                        </li>
                        <hr className="border-gray-400 dark:border-gray-500" />
                        <li>
                           <button
                              onClick={handleLogout}
                              className="text-sm lg:text-base  text-main font-bold hover:bg-main hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center  dark:hover:bg-main dark:focus:ring-main hover:font-bold ease-in duration-500"
                           >
                              <IconSVG
                                 className="w-5 lg:w-6 h-5 lg:h-6"
                                 d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
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
                                    ? 'text-base font-semibold text-lime-600/100 hover:font-bold ease-in duration-500 hover:scale-110'
                                    : 'hover:font-bold ease-in duration-500 hover:scale-110'
                              }
                           >
                              <IconSVG
                                 className="w-5 lg:w-6 h-5 lg:h-6"
                                 d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
                              Login
                           </NavLink>
                        </li>
                        <li>
                           <NavLink
                              to="/register"
                              className={({ isActive }) =>
                                 isActive
                                    ? 'text-base font-semibold text-blue-600/100 ease-in duration-500 hover:scale-110'
                                    : 'hover:font-bold hover:scale-110 ease-in duration-500'
                              }
                           >
                              <IconSVG
                                 className="w-5 lg:w-6 h-5 lg:h-6"
                                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                              Register
                           </NavLink>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
         {/* </div> */}
      </nav>
   );
};

export default Navbar;
