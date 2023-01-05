import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

import useDarkTheme from './useDarkTheme';
import sun from '../assets/sun-svgrepo-com.svg';
import moon from '../assets/moon-svgrepo-com.svg';
import logo from '../assets/keyhole-logo.png';
import SearchInput from './SearchInput';
import IconSVG from './IconsSVG';

const Navbar = () => {
   const { user, signOutUser } = useContext(UserContext);

   const [currentUser, setCurrentUser] = useState('');
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

   useEffect(() => {
      if (user) {
         let index = user.email.indexOf('@');
         const username = user.email.substring(0, index);
         const usernameUppercase = username.charAt(0).toUpperCase() + username.slice(1);
         setCurrentUser(usernameUppercase);
      }
   }, [user]);

   return (
      <>
         <nav className="navbar text-metal dark:text-gray-300 px-5 py-5 lg:px-16 dark:bg-stone-900 dark:bg-opacity-30 sticky top-0 z-50 backdrop-blur-sm gap-10">
            <div className="flex-1 ml-10 gap-10">
               <Link to="/" className="flex items-center">
                  {/* TODO - CAMBIAR LOGO */}
                  <img src={logo} className="mr-3 h-11 sm:h-14" alt="Logo Ed Mundo!" />
                  <span className="self-center text-base sm:text-2xl font-semibold whitespace-nowrap dark:text-gray-200 ">
                     Ed Mundo!
                  </span>
               </Link>
            </div>
            <div className="flex-1 justify-center gap-10">
               <p className="text-base">¿Qué es Edmundo?</p>
               {/* https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element */}
            </div>
            <div className="flex-1 mr-10 justify-end gap-2">
               <div className="align-middle">
                  <SearchInput
                     text="search"
                     placeholder="Busca un libro..."
                     classInput="input input-bordered w-full text-gray-700 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-400 dark:bg-gray-100 focus:border-gray*300 dark:focus:border-gray-300 focus:ring-gray-300 dark:focus:ring-tahiti dark:focus:ring-zinc-500 w-1/3"
                     classButton="btn btn-square bg-gray-300 dark:bg-gray-300 border-gray-300 dark:border-gray-300 dark:hover:border-gray-600 "
                  />
               </div>
               <div className="tooltip tooltip-bottom" data-tip="Upload">
                  <Link to="/uppload">
                     <IconSVG
                        className="w-7 h-7 mx-1 lg:mx-2"
                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                     />
                  </Link>
               </div>

               <span
                  onClick={() => setTheme(colorTheme)}
                  className="text-metal dark:text-gray-400 mx-2 lg:mx-5 w-9 h-9 cursor-pointer flex items-center justify-center"
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
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:border-slate-700">
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
                           <li className="text-xl text-center">{currentUser}</li>
                           <li className="text-xs text-center dark:text-slate-400 text-stone-700">
                              {/* {currentUser.username} */}
                              {user.email}
                           </li>
                           <hr />
                           <li>
                              <Link
                                 to="/profile"
                                 className="text-base font-semibold text-metal dark:text-tahiti bg-transparent hover:text-white dark:hover:text-white hover:bg-tahiti hover:font-bold ease-in duration-500"
                              >
                                 <IconSVG
                                    className="w-6 h-6"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                 />
                                 Perfil
                              </Link>
                           </li>
                           <li>
                              <Link
                                 to="/chat"
                                 className="text-base font-semibold text-metal dark:text-tahiti bg-transparent hover:text-white dark:hover:text-white hover:bg-tahiti hover:font-bold ease-in duration-500"
                              >
                                 <IconSVG
                                    className="w-6 h-6"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                 />
                                 Mensajes
                              </Link>
                           </li>
                           <li>
                              <button
                                 onClick={handleLogout}
                                 className="text-base text-main font-bold hover:bg-main hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center  dark:hover:bg-main dark:focus:ring-main hover:font-bold ease-in duration-500"
                              >
                                 <IconSVG
                                    className="w-6 h-6"
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
                                    className="w-6 h-6"
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
                                    className="w-6 h-6"
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
         </nav>
      </>
   );
};

export default Navbar;
